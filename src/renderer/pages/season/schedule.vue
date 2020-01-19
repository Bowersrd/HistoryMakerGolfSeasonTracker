<template>
    <div id="schedule-wrapper">
        <h1 class="display-2 font-weight-bold text-uppercase mb-8">Tournament Schedule</h1>
        <div class="schedule-box d-flex flex-column pa-5">
            <h2 class="title text-uppercase ml-3 mb-3 font-weight-bold">Regular Season</h2>
            <v-card flat tile width="1200px" v-for="event in schedule" :key="event.id">
                <v-row>
                    <v-col cols="5">
                        <v-card-title class="text-uppercase"> {{ event.name }} </v-card-title>
                        <v-card-subtitle class="text-uppercase">
                            {{ event.course }} • Purse: 
                            {{ 
                                Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0
                                }).format(event.purse) 
                            }}
                        </v-card-subtitle>
                    </v-col>
                    <v-col cols="3">
                        <v-card-title>WINNER</v-card-title>
                        <v-card-subtitle class="text-uppercase"> {{ event.winner || 'TBD' }} </v-card-subtitle>
                    </v-col>
                    <v-col cols="3">
                        <v-card-title>FEDEX CUP POINTS</v-card-title>
                        <v-card-subtitle> {{ event.points }} </v-card-subtitle>
                    </v-col>
                    <v-col class="d-flex" cols="1" v-if="!event.winner">
                        <v-icon
                        small
                        class="mr-4"
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
            <h2 class="title text-uppercase ml-3 my-5 font-weight-bold">Playoffs</h2>
            <v-card flat tile width="1200px" v-for="event in playoffs" :key="event.id">
                <v-row>
                    <v-col cols="5">
                        <v-card-title class="text-uppercase"> {{ event.name }} </v-card-title>
                        <v-card-subtitle class="text-uppercase">
                            {{ event.course }} • Purse:
                            {{ 
                                Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0
                                }).format(event.purse) 
                            }}
                        </v-card-subtitle>
                    </v-col>
                    <v-col cols="3">
                        <v-card-title>WINNER</v-card-title>
                        <v-card-subtitle class="text-uppercase"> {{ event.winner || 'TBD' }} </v-card-subtitle>
                    </v-col>
                    <v-col cols="3">
                        <v-card-title>FEDEX CUP POINTS</v-card-title>
                        <v-card-subtitle> {{ event.points }} </v-card-subtitle>
                    </v-col>
                    <v-col class="d-flex" cols="1" v-if="!event.winner">
                        <v-icon
                        small
                        class="mr-4"
                        @click="editItemPlayoff(event)"
                        >
                        fas fa-edit
                        </v-icon>
                    </v-col>
                </v-row>
            </v-card>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                <v-card-title>
                    <span class="headline">Edit Event</span>
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
                            <v-col cols="12" v-show="editedPlayoff">
                                <h2 class="subtitle-2 mt-n6">*Only the course can be changed for the playoffs</h2>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.purse" label="Purse" v-show="!editedPlayoff"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" v-show="!editedPlayoff">
                                <v-select
                                :items="pointOptions"
                                label="Points"
                                v-model="editedItem.points"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" v-show="!editedPlayoff">
                                <v-text-field v-model="editedItem.field" label="Field Size"></v-text-field>
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
            pointOptions: [300, 500, 550, 600],
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
    computed: {
        schedule () {
            return this.$store.state.season.schedule
        },
        playoffs () {
            return this.$store.state.season.playoffSchedule
        },
        courses () {
            return this.$store.state.courses.courses
        }
    },
    methods: {
        editItem (item) {
            this.editedIndex = this.$store.state.season.schedule.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.editedPlayoff = false
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
            }, 300)
        },
        save () {
            if (this.editedIndex > -1) {
                let index = this.editedIndex
                let event = this.editedItem
                let playoff = this.editedPlayoff
                this.$store.dispatch('season/editEvent', { event, index, playoff })
            } else {
                this.$store.dispatch('season/addEvent', this.editedItem)
            }
            this.close()
        },
    }    
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/main.scss';

#schedule-wrapper {
    @include flex-center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: url('~assets/img/background-play.jpg');
    h1, h2 {
        color: $blue;
    }
}

.schedule-box {
    background: #ddd;
    height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
    border: 3px solid #ccc;
    .v-card {
        color: $blue;
        &:nth-child(odd) {
            background: #eee;
        }
    }
}

</style>