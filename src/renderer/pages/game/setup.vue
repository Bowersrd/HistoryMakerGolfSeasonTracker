<template>
    <div class="d-flex flex-column align-center justify-center" id="game-setup-wrapper">
        <div class="container">
            <div class="course-info" v-if="!isPlayoffs">
                <h1 class="display-2 text-uppercase font-weight-bold"> {{ schedule[currentWeek].name }} </h1>
                <h2 class="headline ml-3 mb-5"> {{ schedule[currentWeek].course }} </h2>
            </div>
            <div class="course-info" v-else>
                <h1 class="display-2 text-uppercase font-weight-bold"> {{ playoffSchedule[currentWeek].name }} </h1>
                <h2 class="headline ml-3 mb-5"> {{ playoffSchedule[currentWeek].course }} </h2>
            </div>
            <v-stepper v-model="e1">
                <v-stepper-header>
                    <v-stepper-step color="#083666" :complete="e1 > 1" step="1">Tournament Settings</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step color="#083666" :complete="e1 > 2" step="2">Set Event Field</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step color="#083666" :complete="e1 > 3" step="3">Select Contenders</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step color="#083666" step="4">Enter Field Results</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-row>
                            <v-col class="d-flex" cols="6">
                                <v-select
                                :items="scoreOptions"
                                label="Tournament Scoring"
                                @change="updateTournamentScoring($event)"
                                outlined
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-btn
                            color="#083666"
                            dark
                            class="ml-3"
                            @click="e1 = 2"
                            >
                            Continue
                            </v-btn>
                    </v-stepper-content>
                </v-stepper-items>
                <v-stepper-items>
                    <v-stepper-content step="2">
                        <v-data-table
                            height="425px"
                            v-model="selected"
                            :headers="headers"
                            :items="isPlayoffs ? topPlayers : players.filter(player => !player.injury)"
                            item-key="id"
                            show-select
                            dense
                            class="elevation-1 mb-4"
                        >
                            <template v-slot:item.country="{ item }">
                                <img class="mt-2" height="100%" :src="require(`@/assets/img/flags/${item.country}.png`)" alt="Country Flag" />
                            </template>
                        </v-data-table>
                        <h3 class="body-1 mb-4" :class="{ maxed : overMax} " v-if="!isPlayoffs"> {{ selected.length }} / {{ schedule[currentWeek].field }} - Field Size </h3>
                        <h3 class="body-1 mb-4" :class="{ maxed : overMax} " v-else> {{ selected.length }} / {{ playoffSchedule[currentWeek].field }} - Field Size </h3>
                        <v-btn
                        color="#083666"
                        dark
                        @click="e1 = 3; getField()"
                        >
                        Continue
                        </v-btn>
                        <v-btn
                            color="#083666"
                            @click="e1 = 1"
                            text
                            >Back</v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-row>
                            <v-col cols="4" v-for="(label, index) in pairLabels" :key="label.index">
                                <div class="d-flex">
                                    <v-autocomplete
                                    :items="selected"
                                    :label="label"
                                    item-text="last"
                                    outlined
                                    v-model="pairings[index].a"
                                    return-object
                                    :hide-selected="true"
                                    >
                                        <template slot="selection" slot-scope="data">
                                            {{ data.item.first }} {{ data.item.last }}
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            {{ data.item.first }} {{ data.item.last }}
                                        </template>
                                    </v-autocomplete>
                                    <v-text-field
                                        label="Score"
                                        class="ml-3"
                                        filled
                                         v-model.number="pairScores[0].a[index]"
                                    ></v-text-field> 
                                </div>
                                <div class="d-flex">
                                    <v-autocomplete
                                    :items="selected"
                                    :label="label"
                                    item-text="last"
                                    outlined
                                    v-model="pairings[index].b"
                                    return-object
                                    :hide-selected="true"
                                    >
                                        <template slot="selection" slot-scope="data">
                                            {{ data.item.first }} {{ data.item.last }}
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            {{ data.item.first }} {{ data.item.last }}
                                        </template>
                                    </v-autocomplete>
                                    <v-text-field
                                        label="Score"
                                        class="ml-3"
                                        filled
                                        v-model.number="pairScores[0].b[index]"
                                    ></v-text-field> 
                                </div>  
                            </v-col> 
                            <h3 class="ml-3 mb-4 mt-n5 caption font-weight-bold">*Pairing One will tee off first</h3>
                        </v-row>
                        <v-row>
                            <v-btn
                            color="#083666"
                            dark
                            class="ml-3"
                            @click="e1 = 4; getPairings()"
                            >
                            Continue
                            </v-btn>
                            <v-btn
                            color="#083666"
                            @click="e1 = 2"
                            text
                            >Back</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                            color="#CC0001"
                            class="mr-3"
                            dark
                            @click="clearPairings"
                            >Clear</v-btn>
                        </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="4">
                        <v-data-table
                            height="425px"
                            :headers="resultHeaders"
                            :items="nonContention"
                            item-key="id"
                            dense
                            class="elevation-1 mb-4"
                        >
                            <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title class="title">Finishes</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="250px">
                                <v-card>
                                <v-card-title>
                                    <span class="headline">Add Finish</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                        <v-text-field ref="focus" v-model="editedItem" label="Finish (B+,B, etc.)" @keyup.enter="save(editedItem)" autofocus :error="finishError"></v-text-field>
                                        <p class="caption red--text mt-n4" v-show="finishError">You must enter a valid finish!</p>
                                        </v-col>
                                    </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save(editedItem)">Save</v-btn>
                                </v-card-actions>
                                </v-card>
                            </v-dialog>
                            </v-toolbar>
                            </template>
                            <template v-slot:item.country="{ item }">
                                <img class="mt-2" height="100%" :src="require(`@/assets/img/flags/${item.country}.png`)" alt="Country Flag" />
                            </template>
                            <template v-slot:item.action="{ item }">
                                <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                                >
                                fas fa-edit
                                </v-icon>
                            </template>
                        </v-data-table>    
                        <v-btn
                        color="#083666"
                        dark
                        @click.native="startGame"
                        to="/game"
                        >
                        Start Tournament
                        </v-btn>
                        <v-btn
                        color="#083666"
                        @click="e1 = 3; clearPairings()"
                        text
                        >Back</v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            dialog: false,
            e1: 0,
            scoreOptions: ['<262', '263-264', '265-266', '267-268', '269-270', '271-272', '273-274', '275-276', '277+'],
            selected: [],
            headers: [
                { text: 'First', sortable: true, value: 'first' },
                { text: 'Last', value: 'last' },
                { text: 'Country', value: 'country' },
                { text: 'Grade', value: 'grade' },
                { text: 'Points', value: 'points' },
            ],
            resultHeaders: [
                { text: 'First', sortable: true, value: 'first' },
                { text: 'Last', value: 'last' },
                { text: 'Country', value: 'country' },
                { text: 'Grade', value: 'grade' },
                { text: 'Finish', value: 'score' },
                { text: 'Action', value: 'action' }
            ],
            pairLabels: ['Pairing One', 'Pairing Two', 'Pairing Three', 'Pairing Four', 'Pairing Five', 'Pairing Six'],
            pairings: [
                {a: [{score: null}], b: [{score: null}]},
                {a: [{score: null}], b: [{score: null}]},
                {a: [{score: null}], b: [{score: null}]},
                {a: [{score: null}], b: [{score: null}]},
                {a: [{score: null}], b: [{score: null}]},
                {a: [{score: null}], b: [{score: null}]}
            ],
            pairScores: [
                {a: [], b: []}
            ],
            clearedPairings: [
                {a: [{score: null}], b: [{score: null}]},
                {a: [{score: null}], b: [{score: null}]},
                {a: [{score: null}], b: [{score: null}]},
                {a: [{score: null}], b: [{score: null}]},
                {a: [{score: null}], b: [{score: null}]},
                {a: [{score: null}], b: [{score: null}]}
            ],
            clearedPairScores: [
                {a: [], b: []}
            ],
            editedItem: '',
            editedId: null,
            defaultItem: '',
            defaultId: null,
            finishError: false
        }
    },
    computed: {
        schedule () {
            return this.$store.state.season.schedule
        },
        playoffSchedule () {
            return this.$store.state.season.playoffSchedule
        },
        currentWeek () {
            return this.$store.state.season.currentWeek
        },
        players () {
            return this.$store.state.season.players
        },
        topPlayers () {
            return this.$store.getters['season/topPlayers']
        },
        overMax () {
            return this.isPlayoffs ? this.selected.length > this.playoffSchedule[this.currentWeek].field : this.selected.length > this.schedule[this.currentWeek].field
        },
        nonContention () {
            return this.$store.getters['game/nonContention']
        },
        isPlayoffs () {
            return this.$store.state.season.isPlayoffs
        }
    },
    watch: {
        dialog (val) {
            if (!val) return
            requestAnimationFrame(() => {
                this.$refs.focus.focus()
            })
        }
    },
    methods: {
        getField () {
            let field = this.selected
            this.$store.dispatch('game/getField', field)
        },
        getPairings () {
            let pairs = this.pairings
            let scores = this.pairScores
            this.$store.dispatch('game/getPairings', { pairs, scores })
        },
        clearPairings () {
            this.pairings = this.clearedPairings
            this.pairScores = this.clearedPairScores
        },
        editItem (item) {
            this.editedItem = item.score
            this.editedId = item.id
            this.dialog = true
        },
        close () {
            this.dialog = false
            setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedId = Object.assign({}, this.defaultId)
            }, 300)
        },
        save (choice) {
            let choices = ['A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'CUT']
            if (!choices.includes(choice)) {
                this.finishError = true
            } else {
                let score = this.editedItem.trim()
                let id = this.editedId
                this.$store.dispatch('game/updateScore', { id, score })
                this.finishError = false
                this.close()
            }
        },
        updateTournamentScoring (event) {
            switch(event) {
                case '<262':
                    event = 0
                    break;                
                case '263-264':
                    event = 1
                    break;                
                case '265-266':
                    event = 2
                    break;                
                case '267-268':
                    event = 3
                    break;                
                case '269-270':
                    event = 4
                    break;                
                case '271-272':
                    event = 5
                    break;                
                case '273-274':
                    event = 6
                    break;                
                case '275-276':
                    event = 7
                    break;                
                case '277+':
                    event = 8
                    break;
                default:
                    event = 0                
            }
            this.$store.dispatch('game/updateTournamentScoring', { score: event })
        },
        startGame () {
            let field = this.selected
            let event = this.isPlayoffs ? this.playoffSchedule[this.currentWeek].name : this.schedule[this.currentWeek].name
            let course = this.isPlayoffs ? this.playoffSchedule[this.currentWeek].course : this.schedule[this.currentWeek].course
            this.$store.dispatch('season/addEventToPlayers', { field, event })
            this.$store.dispatch('season/addCutMade', field)
            this.$store.dispatch('game/setEvent', { event, course })
            this.$store.dispatch('game/convertScores')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/main.scss';

#game-setup-wrapper {
    height: 100vh;
}

.course-info {
    color: $blue;
}

.maxed {
    color: #CC0001
}

</style>