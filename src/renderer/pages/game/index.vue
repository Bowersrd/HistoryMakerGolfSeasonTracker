<template>
    <div id="game-wrapper">
        <img class="broadcast-logo" src="~assets/img/cbs_logo.png" alt="CBS Logo">
        <div id="leaderboard">
            <v-data-table
                :headers="headers"
                :items="mappedPairs"
                dense
                dark
                :sort-by="['total', 'rank']"
                disable-pagination
                hide-default-footer
                item-key="id"
                class="elevation-1 mb-4 grey darken-4"
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr>
                        <th class="table-header" :colspan="headers.length">
                            <p class="display-1 font-weight-bold white--text ml-2 mt-2"> {{ event }} </p>
                            <p class="subtitle-1 white--text ml-2"> {{ courseName }}, {{ course.city }}, {{ course.state }} </p>
                        </th>
                    </tr>
                    </thead>
                </template>
                <template v-slot:item.rank="{ item }">
                    {{ item.rank + 1 }}
                </template>
                <template v-slot:item.country="{ item }">
                    <img class="mt-2" height="100%" :src="require(`@/assets/img/flags/${item.country}.png`)" alt="Country Flag" />    
                </template>
                <template v-slot:item.today="{ item }">
                    <p>
                        <span v-show="item.today.reduce((accumulator, currentValue) => accumulator + currentValue) > 0">+{{ item.today.reduce((accumulator, currentValue) => accumulator + currentValue) }}</span>
                        <span v-show="item.today.reduce((accumulator, currentValue) => accumulator + currentValue) < 0"> {{ item.today.reduce((accumulator, currentValue) => accumulator + currentValue) }} </span> 
                        <span v-show="item.today.reduce((accumulator, currentValue) => accumulator + currentValue) === 0">E</span>
                    </p> 
                </template>
                <template v-slot:item.total="{ item }">
                    <p>
                        <span v-show="item.total > 0">+{{ item.total }}</span>
                        <span v-show="item.total < 0"> {{ item.total }} </span> 
                        <span v-show="item.total === 0">E</span> 
                    </p> 
                </template>
                <template v-slot:item.thru="{ item }">
                    <p>
                        <span v-show="item.scorecard.filter(score => score.score === null).length !== 0">{{ 18 - item.scorecard.filter(score => score.score === null).length }}</span>
                        <span class="yellow--text text--darken-2" v-show="item.scorecard.filter(score => score.score === null).length === 0">
                            {{ item.scorecard.map(hole => hole.score).reduce((accumulator, currentValue) => accumulator + currentValue) }}
                        </span>
                    </p> 
                </template>
                <template v-slot:item.last="{ item }">
                    {{ item.first }} {{ item.last }}   
                </template>
            </v-data-table>
        </div>
        <div id="play-area">
            <div class="golfer ml-10 mt-12">
                <Scorecard
                :golfer="`${pairs[group].a.first} ${pairs[group].a.last}`"
                :country="pairs[group].a.country"
                :today="pairs[group].a.today"
                :holes="course.holes"
                :scorecard="pairs[group].a.scorecard"
                v-on:getScore="addScore($event, 'a')"
                :key="componentKeyA"
                ></Scorecard>
            </div>
            <div class="golfer ml-10 mt-10">
                <Scorecard
                :golfer="`${pairs[group].b.first} ${pairs[group].b.last}`"
                :country="pairs[group].b.country"
                :today="pairs[group].b.today"
                :holes="course.holes"
                :scorecard="pairs[group].b.scorecard"
                v-on:getScore="addScore($event, 'b')"
                :key="componentKeyB"
                ></Scorecard>
            </div>
        </div>
        <div id="hole">
            <p class="title white--text">Par {{ course.holes[currentHole - 1].par }} </p>
            <div class="box">
                <p class="font-weight-bold"> {{ currentHole }} </p>
            </div>
            <p class="title white--text">{{ course.holes[currentHole - 1].yds }} yds</p>
        </div>
        <v-btn class="mb-5 back-btn" dark large fab color="#083666" @click="prevHole">
            <v-icon>fas fa-long-arrow-alt-left</v-icon>
        </v-btn>
        <v-btn class="mb-5 forward-btn" dark large fab color="#083666" @click="nextHole">
            <v-icon>fas fa-long-arrow-alt-right</v-icon>
        </v-btn>
        <v-card dark tile class="ticker d-flex"> 
            <v-card-subtitle>
                <p class="font-weight-bold ml-2">LEADERBOARD</p>
            </v-card-subtitle>
            <v-card-subtitle>
                <MarqueeText :duration="100">
                    <div class="d-inline" v-for="player in field" :key="player.id">
                        <span v-if="player.score > 250">
                            <img class="ml-1 ml-5 mr-1" height="12px" :src="require(`@/assets/img/flags/${player.country}.png`)" alt="Country Flag" />
                        </span> 
                        <p class="d-inline" v-if="player.score === 500">{{ player.first }} {{ player.last }} &nbsp; <span class="yellow--text text--darken-2">CUT</span></p>
                        <p class="d-inline" v-else-if="player.score > 250">
                            {{ player.first }} {{ player.last }} &nbsp;
                             <span class="yellow--text text--darken-2">
                                {{ player.score - (course.par * 4) > 0 ? `+${player.score - (course.par * 4)}` : (player.score - (course.par * 4) === 0 ? 'E' : player.score - (course.par * 4)) }}
                             </span>
                        </p>
                    </div>
                </MarqueeText>
            </v-card-subtitle>
        </v-card>
        <Modal
        v-show="gameEnded"
        :headline="'Tournament has ended'"
        :button="'View Results'"
        :route="'/game/results'"
        ></Modal>
        <v-dialog
        max-width="500px"
        v-model="emergeDialog"
        >
            <v-card>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-card-title>Emerging Contenders</v-card-title>
                            <v-card-subtitle>Are there any contenders emerging this tournament?</v-card-subtitle>
                            <v-card-text>
                                If yes, next dialog will allow you to input the emerging contender(s). If not, continue the game as normal.
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text @click="emerge(0)">None</v-btn>
                                <v-btn text @click="emerge(1)">One</v-btn>
                                <v-btn text @click="emerge(2)">Two</v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
        <v-dialog
        max-width="500px"
        v-model="isEmerge"
        >
            <v-card>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-card-title>Who is Emerging?</v-card-title>
                            <v-card-subtitle>Input the golfer(s) that is/are emerging!</v-card-subtitle>
                            <v-card-text>
                                <v-autocomplete
                                :items="field.filter(player => player.score > 250 && player.score !== 500)"
                                item-text="last"
                                v-model="contenders.a"
                                return-object
                                >
                                    <template slot="selection" slot-scope="data">
                                        {{ data.item.first }} {{ data.item.last }}
                                    </template>
                                    <template slot="item" slot-scope="data">
                                            {{ data.item.first }} {{ data.item.last }}
                                        </template>
                                </v-autocomplete>
                                <v-autocomplete
                                :items="field"
                                item-text="last"
                                v-if="emerged === 2"
                                v-model="contenders.b"
                                return-object
                                >
                                    <template slot="selection" slot-scope="data">
                                        {{ data.item.first }} {{ data.item.last }}
                                    </template>
                                    <template slot="item" slot-scope="data">
                                            {{ data.item.first }} {{ data.item.last }}
                                        </template>
                                </v-autocomplete>
                                {{ contenders }}
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text @click="emergeCancel">Back</v-btn>
                                <v-btn text @click="emergeConfirm">Continue</v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Scorecard from '@/components/Scorecard'
import MarqueeText from 'vue-marquee-text-component'
import Modal from '@/components/Modal'

export default {
    components: {
        Scorecard,
        MarqueeText,
        Modal
    },
    data: () => {
        return {
            headers: [
                { text: 'FINAL ROUND', value: 'last' },
                { text: '', value: 'country', width: 170 },
                { text: 'TOTAL', value: 'total', align: 'center' },
                { text: 'THRU', value: 'thru', align: 'center' },
                { text: 'TODAY', value: 'today', align: 'center' },
            ],
            componentKeyA: 0,
            componentKeyB: 0,
            emergeDialog: false,
            isEmerge: false,
            emerged: 0,
            contenders: {a: [{score: null}], b: [{score: null}]}
        }
    },
    computed: {
        pairs () {
            return this.$store.state.game.pairings
        },
        mappedPairs () {
            let newPairA = this.pairs.map(pair => pair.a)
            let newPairB = this.pairs.map(pair => pair.b)
            let newPairs = newPairA.concat(newPairB)
            return newPairs
        },
        event () {
            return this.$store.state.game.event
        },
        courseName () {
            return this.$store.state.game.course
        },
        course () {
            let courses = this.$store.state.courses.courses
           return courses.find(course => course.name === this.courseName)
        },
        currentHole () {
            return this.$store.state.game.currentHole
        },
        group () {
            return this.$store.state.game.group
        },
        field () {
            return this.$store.state.game.field
        },
        gameEnded () {
            return this.$store.state.game.gameEnded
        }
    },
    methods: {
        addScore (value, letter) {
            let score = value
            let today = 0
            let coursePar = (this.course.par * 3)
            let par = this.course.holes[this.currentHole - 1].par
            let pairs = this.mappedPairs

            switch (score) {
                case 'Ace':
                    score = 1
                    break;
                case 'Eagle':
                    score = par - 2
                    break;
                case 'Birdie':
                    score = par - 1
                    break;
                case 'Par':
                    score = par
                    break;
                case 'Bogey':
                    score = par + 1
                    break;
                case 'Dbl Bogey':
                    score = par + 2
                    break;
                case 'Tpl Bogey':
                    score = par + 3
                    break;
                case '+4 Over':
                    score = par + 4
            }

            today = score - par

            if (letter === 'a') {
                this.componentKeyA += 1
            } else {
                this.componentKeyB += 1
            }

            this.$store.dispatch('game/addScore', { score, letter, today, coursePar, pairs })
        },
        nextHole () {
            this.$store.dispatch('game/nextHole')
        },
        prevHole () {
            this.$store.dispatch('game/prevHole')
        },
        emerge (val) {
            if (val === 0) {
                this.emergeDialog = false 
            } else {
                val === 1 ? this.emerged = 1 : this.emerged = 2
                this.emergeDialog = false
                this.isEmerge = true
            }
        },
        emergeCancel () {
            this.isEmerge = false
            this.emerged = 0
            this.emergeDialog = true
        },
        emergeConfirm () {
            let parTotal = this.course.holes[15].par + this.course.holes[16].par + this.course.holes[17].par

            this.$store.dispatch('game/setEmergingContenders', { contenders: this.contenders, parTotal })
        }
    },
    created () {
        let par = (this.course.par * 3)
        let pairs = this.mappedPairs
        this.$store.dispatch('game/setupLeaderboard', { par, pairs })
        this.isEmerge = false
    }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/main.scss';

#game-wrapper {
    @include flex-center;
    width: 100%;
    height: 100vh;
    background: url('~assets/img/background-play.jpg');
}

.broadcast-logo {
    position: absolute;
    height: 50px;
    top: 60px;
    left: 30px;
}

.table-header {
    background: $blue;
    height: 100px;
    text-transform: uppercase;
}

#leaderboard {
    width: 40%;
}

#play-area {
    @include flex-center;
    flex-direction: column;
    margin-bottom: 70px;
    width: 50%;
    height: 100%;
}

#hole {
    display: flex;
    width: 325px;
    height: 50px;
    background: $blue;
    position: absolute;
    top: 60px;
    right: 30px;
    text-transform: uppercase;
    align-items: center;
    justify-content: space-around;
    padding: 0 40px;
    & .box {
        @include flex-center;
        width: 80px;
        height: 80px;
        background: $white;
        border-radius: 50%;
        border: 2px solid $gray;
        p {
            font-size: 2.3rem;
            color: $blue;
        }
    }
}

.ticker {
    width: 100%;
    height: 45px;
    background: $blue;
    position: absolute;
    bottom: 0;
}

</style>