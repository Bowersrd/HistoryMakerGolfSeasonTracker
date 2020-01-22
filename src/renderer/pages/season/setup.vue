<template>
    <div id="setup-wrapper">
        <div class="container">
            <v-stepper v-model="e1">
                <v-stepper-header>
                    <v-stepper-step color="#083666" :complete="e1 > 1" step="1">Set Season Roster</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step color="#083666" :complete="e1 > 2" step="2">Set Season Schedule</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step color="#083666" step="3">Review</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-data-table
                            height="580px"
                            v-model="selected"
                            :headers="headers"
                            :items="players"
                            :items-per-page="players.length"
                            item-key="id"
                            show-select
                            dense
                            class="elevation-1"
                        >
                        <template v-slot:item.country="{ item }">
                            <img class="mt-2" height="100%" :src="require(`@/assets/img/flags/${item.country}.png`)" alt="Country Flag" />
                        </template>
                        </v-data-table>
                        <v-btn
                        color="#083666"
                        class="mt-3 white--text"
                        @click="e1 = 2; addToRoster()"
                        :disabled="selected.length === 0"
                        >
                        Continue
                        </v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <div class="event-container">
                            <h3 class="ml-5 font-weight-bold">Regular Season</h3>
                            <h4 class="ml-8 my-3" v-show="createdSchedule.length === 0">No events added yet for Regular Season!</h4>
                            <v-card
                            width="98%"
                            color="#E4E4E4"
                            flat
                            class="my-3"
                            v-for="event in createdSchedule" 
                            :key="event.id"
                            >
                                <v-row class="d-flex align-center">
                                    <v-col cols="10">
                                        <v-card-title> {{ event.name }} </v-card-title>
                                        <v-card-subtitle> {{ event.course }} • Purse: ${{ new Intl.NumberFormat('en-US').format(event.purse) }} </v-card-subtitle>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-icon
                                        class="mr-4 mt-3"
                                        @click="moveUp(event)"
                                        >
                                        fas fa-sort-up
                                        </v-icon>
                                        <v-icon
                                        class="mr-2 mb-2"
                                        @click="moveDown(event)"
                                        >
                                        fas fa-sort-down
                                        </v-icon>
                                        <v-icon
                                        small
                                        class="mx-2"
                                        @click="editItem(event)"
                                        >
                                        fas fa-edit
                                        </v-icon>
                                        <v-icon
                                        small
                                        @click="deleteItem(event)"
                                        >
                                        fas fa-trash-alt
                                        </v-icon>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <h3 class="ml-5 font-weight-bold">Playoffs</h3>
                            <v-card
                            width="98%" 
                            color="#E4E4E4"
                            flat
                            class="my-3"
                            v-for="playoff in playoffs" 
                            :key="playoff.id"
                            >
                                <v-row class="d-flex align-center">
                                    <v-col cols="10">
                                        <v-card-title> {{ playoff.name }} </v-card-title>
                                        <v-card-subtitle> {{ playoff.course }} • Purse: ${{ new Intl.NumberFormat('en-US').format(playoff.purse) }} </v-card-subtitle>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-icon
                                        small
                                        class="mx-2"
                                        @click="editItemPlayoff(playoff)"
                                        >
                                        fas fa-edit
                                        </v-icon>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </div>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <div class="d-flex" height="500px">
                                    <v-btn color="#CC0001" dark class="mt-4" v-on="on">Add Event</v-btn>
                                    <h3 class="mt-6 ml-4">Total Events: {{ eventCount }}</h3>
                                </div>
                            </template>
                            <v-card>
                            <v-card-title>
                                <span class="headline">Add Event</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="editedItem.name" label="Event Name" v-show="!editedPlayoff"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12">
                                            <v-select
                                            :items="courses"
                                            item-text="name"
                                            label="Golf Course"
                                            v-model="editedItem.course"
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.purse" label="Purse" v-show="!editedPlayoff"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select
                                            :items="pointOptions"
                                            label="Points"
                                            v-model="editedItem.points"
                                            v-show="!editedPlayoff"
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.field" label="Field Size" v-show="!editedPlayoff"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save" @keyup.enter="save">Save</v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-divider
                            class="mt-4"
                        ></v-divider>
                        <v-btn
                        color="#083666"
                        class="mt-3 white--text"
                        @click="e1 = 3"
                        :disabled="eventCount === 3"
                        >
                        Continue
                        </v-btn>
                        <v-btn
                        dark
                        color="#083666"
                        class="mt-3"
                        text
                        @click="e1 = 1"
                        >
                        Back
                        </v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <div class="review-container">
                            <div class="event-container" id="review">
                                <h3 class="ml-5 font-weight-bold">Season Roster ({{ rosters.length }})</h3>
                                <h4 class="ml-8 my-3" v-show="rosters.length === 0">No players added to the roster!</h4>
                                <v-card
                                height="80px" 
                                color="#E4E4E4"
                                flat
                                class="my-3"
                                v-for="roster in rosters" 
                                :key="roster.id"
                                >
                                    <v-card-title class="body-1"> {{ roster.first }} {{ roster.last }} </v-card-title>
                                    <v-card-subtitle> {{ roster.country }} | Tournament Grade: {{ roster.grade }} </v-card-subtitle>
                                </v-card>
                            </div>

                            <div class="event-container" id="review">
                                <h3 class="ml-5 font-weight-bold">Regular Season ({{ createdSchedule.length }})</h3>
                                <h4 class="ml-8 my-3" v-show="createdSchedule.length === 0">No events added yet for Regular Season!</h4>
                                <v-card
                                height="90px" 
                                color="#E4E4E4"
                                flat
                                class="my-3"
                                v-for="event in createdSchedule" 
                                :key="event.id"
                                >
                                    <v-card-title> {{ event.name }} </v-card-title>
                                    <v-card-subtitle> {{ event.course }} • Purse: ${{ new Intl.NumberFormat('en-US').format(event.purse) }} </v-card-subtitle>
                                </v-card>
                                <h3 class="ml-5 font-weight-bold">Playoffs ({{ playoffs.length }})</h3>
                                <v-card
                                height="90px" 
                                color="#E4E4E4"
                                flat
                                class="my-3"
                                v-for="playoff in playoffs" 
                                :key="playoff.id"
                                >
                                    <v-card-title> {{ playoff.name }} </v-card-title>
                                    <v-card-subtitle> {{ playoff.course }} • Purse: ${{ new Intl.NumberFormat('en-US').format(playoff.purse) }} </v-card-subtitle>
                                </v-card>
                            </div>
                        </div>
                        <v-btn
                        dark
                        color="#083666"
                        class="mt-3"
                        to='/season/home'
                        @click.native="seasonActive"
                        >
                        Start Season
                        </v-btn>

                        <v-btn
                        dark
                        color="#083666"
                        class="mt-3"
                        text
                        @click="e1 = 2"
                        >
                        Back
                        </v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
            <v-btn class="mt-10 back-btn" dark large fab color="#083666" to="/season">
                <v-icon>fas fa-long-arrow-alt-left</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        e1: 0,
        editedIndex: -1,
        selected: [],
        pointOptions: [300, 500, 550, 600],
        headers: [
        { text: 'First', sortable: true, value: 'first' },
        { text: 'Last', value: 'last' },
        { text: 'Country', value: 'country' },
        { text: 'Grade', value: 'grade' }
        ],
        players: [],
        dialog: false,
        editedPlayoff: false,
        editedItem: {
            name: '',
            course: '',
            purse: 0,
            points: 0,
            field: 0,
            complete: false
        },
        defaultItem: {
            name: '',
            course: '',
            purse: 0,
            points: 0,
            field: 0,
            complete: false
        }
      }
    },
    created () {
      this.initialize()
    },
    methods: {
        initialize () {
            this.players = this.$store.state.golfers.players
        },
        addToRoster () {
            this.$store.dispatch('season/addPlayers', this.selected)
        },
        editItem (item) {
            this.editedIndex = this.$store.state.season.schedule.indexOf(item)
            this.editedPlayoff = false
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        editItemPlayoff (item) {
            this.editedIndex = this.$store.state.season.playoffSchedule.indexOf(item)
            this.editedPlayoff = true
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            this.$store.dispatch('season/deleteEvent', item)
        },
        close () {
            this.dialog = false
            setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            this.editedPlayoff = false
            }, 300)
        },
        save () {
            if (this.editedIndex > -1) {
                let index = this.editedIndex
                let event = this.editedItem
                let playoff = this.editedPlayoff
                this.$store.dispatch('season/editEvent', { event, index, playoff })
                setTimeout(() => {
                    this.editedPlayoff = false
                }, 300)
            } else {
                this.$store.dispatch('season/addEvent', this.editedItem)
            }
            this.close()
        },
        seasonActive () {
            this.$store.dispatch('season/activateSeason')
            this.$store.dispatch('game/resetGame')
        },
        moveUp (event) {
            let index = this.createdSchedule.indexOf(event)
            this.$store.dispatch('season/moveEventUp', index)
        },
        moveDown (event) {
            let index = this.createdSchedule.indexOf(event)
            this.$store.dispatch('season/moveEventDown', index)
        }
    },
    computed: {
        eventCount () {
            return this.createdSchedule.length + this.playoffs.length
        },
        courses () {
            return this.$store.state.courses.courses
        },
        playoffs () {
            return this.$store.state.season.playoffSchedule
        },
        rosters () {
            return this.$store.state.season.players
        },
        createdSchedule () {
            return this.$store.state.season.schedule
        }
    }
  }
</script>

<style lang="scss" scoped>
@import '~assets/sass/main.scss';

#setup-wrapper {
    width: 100%;
    height: 100vh;
    @include flex-center;
    background: url('~assets/img/background-play.jpg');
}

.event-container {
    width: 100%;
    max-height: 500px;
    overflow-y: scroll;
}

.review-container {
    width: 100%;
    display: flex;
}

#review {
    width: 45%;
    margin: 0 auto;
}
</style>