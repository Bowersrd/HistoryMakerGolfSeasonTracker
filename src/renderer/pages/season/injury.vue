<template>
    <div id="injury-wrapper">
        <div class="container d-flex flex-column align-center">
            <div class="d-flex align-center mb-10">
                <img height="60px" src="@/assets/img/injury.svg" alt="Injury Icon">
                <h1 class="display-2 text-uppercase font-weight-bold ml-5">Injury Report</h1>
                <v-btn class="ml-5" @click="dialog = !dialog">Add Injury</v-btn>
            </div>
            <h2 class="headline" v-if="injuredPlayers.length === 0"> There are no injured players on tour.</h2>
            <v-card
            flat
            tile
            width="900px" 
            v-for="(player, index) in injuredPlayers"
            :key="player.id"
            :class="{'grey lighten-4': index % 2 === 0}"
            >
                <v-row>
                    <v-col cols="6">
                        <v-card-title>PLAYER</v-card-title>
                        <v-card-subtitle> {{ player.first }} {{ player.last }} </v-card-subtitle>
                    </v-col>
                    <v-col cols="5">
                        <v-card-title>INJURY</v-card-title>
                        <v-card-subtitle> {{ player.injuryType }} </v-card-subtitle>
                    </v-col>
                    <v-col 
                    cols="1" 
                    class="d-flex align-center"
                    >
                        <v-icon
                        small
                        @click="deleteItem(player)"
                        >
                        fas fa-trash-alt
                        </v-icon>
                    </v-col>
                </v-row>
            </v-card>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title>Add Injury</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-autocomplete
                                    :items="players.filter(player => !player.injury)"
                                    item-text="last"
                                    item-value="id"
                                    hint="Player"
                                    persistent-hint
                                    clearable
                                    v-model="editedItem.id"
                                    >
                                        <template slot="selection" slot-scope="data">
                                            {{ data.item.first }} {{ data.item.last }}
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            {{ data.item.first }} {{ data.item.last }}
                                        </template>
                                    </v-autocomplete>
                                    <v-text-field
                                    hint="Injury"
                                    persistent-hint
                                    v-model="editedItem.injury"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="close">Cancel</v-btn>
                        <v-btn text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <v-btn class="mt-10 mb-4 back-btn" dark large fab color="#CC0001" to="/season/home">
            <v-icon>fas fa-long-arrow-alt-left</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            dialog: false,
            editedIndex: -1,
            editedItem: {
                id: '',
                injury: ''
            },
            defaultItem: {
                id: '',
                injury: ''
            }
        }
    },
    computed: {
        injuredPlayers () {
            return this.$store.getters['season/injuredPlayers']
        },
        players () {
            return this.$store.state.season.players
        }
    },
    methods: {
        deleteItem (player) {
            this.$store.dispatch('season/removeInjury', player.id)
        },
        close () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },
        save () {
            this.$store.dispatch('season/addInjury', this.editedItem)
            this.close()
        }
    }    
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/main.scss';

#injury-wrapper {
    @include flex-center;
    width: 100%;
    height: 100vh;
    background: url('~assets/img/background-play.jpg');
    h1 {
        color: $blue;
    }
}

</style>