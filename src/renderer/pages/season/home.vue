<template>
    <div class="d-flex" id="home-wrapper">
        <h1 class="font-weight-black ml-12 mt-12" v-if="!isPlayoffs">Week {{ currentWeek + 1 }}</h1>
        <h1 class="font-weight-black ml-12 mt-12" v-else>Playoffs</h1>
        <img id="season-logo" src="../../assets/img/fedexcup_logo.png" alt="FedEx Cup Logo">
        <VideoPlayer v-if="!watchedVideo && isPlayoffs"></VideoPlayer>
        <div class="season-info">
            <div class="ml-11" id="upcoming-banner">
                <v-card
                flat
                dark
                ripple
                width="100%"
                color="#083666"
                >
                    <v-img
                    class="white--text align-end"
                    height="250px"
                    :src="isPlayoffs ? require('../../assets/img/northern_trust.jpg') : ( schedule[currentWeek].picture ? schedule[currentWeek].picture : require('@/assets/img/generic_course.jpg') )"
                    v-if="isPlayoffs && currentWeek === 0 || !isPlayoffs"
                    >
                    </v-img>
                    <v-img
                    class="white--text align-end"
                    height="250px"
                    :src="currentWeek === 1 ? require('../../assets/img/bmw_championship.jpg') : require('../../assets/img/tour_championship.jpg')"
                    v-else
                    >
                    </v-img>
                    <v-card-title class="mb-n8 text-uppercase" v-if="!activeGame">
                        <span v-if="isPlayoffs && !isEndOfSeason">Upcoming Playoff Tournament</span>
                        <span v-else-if="!isEndOfSeason">Upcoming Tournament</span>
                        <span v-else>End of Season</span>
                    </v-card-title>
                    <v-card-title class="mb-n8 text-uppercase" v-else>
                        <span v-if="isPlayoffs && !isEndOfSeason">Continue Playoff Tournament</span>
                        <span v-else-if="!isEndOfSeason">Continue Tournament</span>
                    </v-card-title>
                    <v-card-title>
                        <span v-if="isPlayoffs && !isEndOfSeason"> {{ playoffs[currentWeek].name }} </span>
                        <span v-else-if="!isEndOfSeason"> {{ schedule[currentWeek].name }} </span>
                        <span v-else>Congratulations to {{ playoffs[2].winner }}</span>
                    </v-card-title>
                    <v-card-subtitle>
                        <span v-if="isPlayoffs && !isEndOfSeason"> {{ playoffs[currentWeek].course }} </span>
                        <span v-else-if="!isEndOfSeason"> {{ schedule[currentWeek].course }} </span>
                        <span v-else>PGA Tour Champion</span>
                    </v-card-subtitle>
                    <v-btn id="play" color="#CC0001" fab large dark to="/game/setup" @click.native="setLastRank" v-if="!activeGame && !isEndOfSeason">
                        <v-icon>fas fa-play</v-icon>
                    </v-btn>
                    <v-btn id="play" color="#CC0001" fab large dark to="/game" v-else-if="!isEndOfSeason">
                        <v-icon>fas fa-play</v-icon>
                    </v-btn>
                </v-card>
            </div> 
            <div class="season-options d-flex justify-space-around mt-3 ml-11">
                <v-card
                flat
                dark
                ripple
                width="32%"
                class="season-menu-option"
                color="#CC0001"
                to="/season/schedule"
                >
                    <div class="icon-box">
                        <v-icon size="100px">
                        fas fa-calendar-alt
                        </v-icon>
                    </div>
                    <v-card-title>
                        Tour Schedule
                    </v-card-title>
                    <v-card-subtitle>
                        Check out all events
                    </v-card-subtitle>
                </v-card>
                <v-card
                flat
                dark
                ripple
                width="32%"
                class="season-menu-option"
                color="#CC0001"
                to="/season/injury"
                >
                    <div class="icon-box">
                        <v-icon size="100px">
                        fas fa-notes-medical
                        </v-icon>
                    </div>
                    <v-card-title>
                        Injury Report
                    </v-card-title>
                    <v-card-subtitle>
                        Injuries on the Tour
                    </v-card-subtitle>
                </v-card>
                <v-card
                flat
                dark
                ripple
                width="32%"
                class="season-menu-option"
                color="#CC0001"
                @click="exportSeason"
                >
                    <div class="icon-box">
                        <v-icon size="100px">
                        fas fa-file-export
                        </v-icon>
                    </div>
                    <v-card-title>
                        Export Current Season
                    </v-card-title>
                    <v-card-subtitle>
                        Exports season file
                    </v-card-subtitle>
                </v-card>
            </div> 
        </div>
        <div id="fedex-leaderboard">
            <div class="leaderboard-header d-flex">
                <h1 class="headline text-uppercase font-weight-bold ml-5 mt-4 white--text">FedExcup Season Standings</h1>
                <v-spacer></v-spacer>
                <v-btn text class="white--text align-self-center" to="/season/leaderboard">View Full Leaderboard</v-btn>
            </div>
            <v-data-table
                height="580px"
                :headers="headers"
                :items="players"
                item-key="id"
                sort-by="points"
                :items-per-page="players.length"
                :sort-desc="true"
                fixed-header
                dense
                hide-default-footer
            >
                <template v-slot:item.last="{ item }">
                    {{ item.first }} {{ item.last }} 
                    <img class="ml-1" height="30%" src="@/assets/img/injury.svg" alt="Injury Symbol" v-if="item.injury" />  
                </template>
                <template v-slot:item.points="{ item }">
                    {{ item.points.toLocaleString('en') }}  
                </template>
                <template v-slot:item.country="{ item }">
                    <img class="mt-2" height="100%" :src="require(`@/assets/img/flags/${item.country}.png`)" alt="Country Flag" />
                </template>
            </v-data-table>
        </div>
        <v-card dark tile class="ticker d-flex"> 
            <v-card-subtitle>
                <p class="font-weight-bold ml-2">TOURNAMENTS</p>
            </v-card-subtitle>
            <v-card-subtitle>
                <MarqueeText :duration="schedule.length * 2.75" :repeat="schedule.length < 10 ? 10 : null" v-if="!isPlayoffs">
                    <span v-for="event in schedule.filter(event => !event.winner)" :key="event.id">
                        {{ event.name }} - {{ event.course }} &nbsp; &nbsp; | &nbsp; &nbsp;
                    </span>
                </MarqueeText>
                <MarqueeText :repeat="10" v-else>
                    <span v-for="event in playoffs.filter(event => !event.winner)" :key="event.id">
                        {{ event.name }} - {{ event.course }} &nbsp; &nbsp; | &nbsp; &nbsp;
                    </span>
                </MarqueeText>
            </v-card-subtitle>
        </v-card>
        <v-btn class="mt-10 mb-4 back-btn" dark large fab color="#CC0001" to="/season">
            <v-icon>fas fa-long-arrow-alt-left</v-icon>
        </v-btn>
        <v-btn class="mt-10 mb-4 forward-btn" dark large fab color="#CC0001" @click="lookAhead">
            <v-icon>fas fa-long-arrow-alt-right</v-icon>
        </v-btn>
    </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import VideoPlayer from '../../components/VideoPlayer'

  export default {
    components: {
        MarqueeText,
        VideoPlayer
    },
    data () {
      return {
        headers: [
        { text: '', value: 'rank', width: 20, align: 'center' },
        { text: 'Player', value: 'last' },
        { text: 'Country', value: 'country' },
        { text: 'FedEx Pts', value: 'points' },
        { text: 'Events', value: 'events.length' },
        { text: 'Wins', value: 'wins' },
        { text: 'Top 10', value: 'top' },
        ]
      }
    },
    computed: {
        players () {
            return this.$store.state.season.players
        },
        schedule () {
            return this.$store.state.season.schedule
        },
        playoffs () {
            return this.$store.state.season.playoffSchedule
        },
        isPlayoffs () {
            return this.$store.state.season.isPlayoffs
        },
        currentWeek () {
            return this.$store.state.season.currentWeek
        },
        activeGame () {
            return this.$store.state.game.activeGame
        },
        isEndOfSeason () {
            return this.$store.state.season.isEndOfSeason
        },
        watchedVideo () {
            return this.$store.state.season.watchedVideo
        }
    },
    methods: {
        lookAhead () {
            this.$store.dispatch('season/lookAhead')
        },
        setLastRank () {
            this.$store.dispatch('season/setLastRank')
        },
        exportSeason () {
        if (this.activeGame) {
            alert('Cannot Export While Tournament in Progress!')
        } else {
            const {dialog} = require('electron').remote;
            const season = JSON.stringify(this.$store.state.season)
            let path = dialog.showOpenDialog({
            properties: ['openDirectory']});
            let name = `PGA_TOUR_SEASON_FILE`
            var fs = require('fs');
            if (path !== undefined) {
            fs.writeFile(`${path}/${name}.json`, season, function(err) {
            if (err) {
                console.log(err);
            }
            })
            this.snackbar = true
            this.snackText = `Season successfully exported!`
            }
          }
        }
    },
    created () {
        this.$store.dispatch('season/rankLeaderboard')
    }
  }
</script>

<style lang="scss" scoped>
@import '~assets/sass/main.scss';

#home-wrapper {
    width: 100%;
    height: 100vh;
    background: url('~assets/img/background-play.jpg');
    h1 {
        font-size: 3rem;
        text-transform: uppercase;
        font-weight: bold;
        color: $blue;
        margin: 40px 0 0 25px;
        position: absolute;
    }
}

.season-info {
    width: 50%;
    height: 100vh;
}

#season-logo {
    position: absolute;
    height: 100px;
    top: 25px;
    right: 0;
}

#fedex-leaderboard {
    @include flex-center;
    flex-direction: column;
    width: 100%;
}

.leaderboard-header {
    width: 89%;
    height: 60px;
    background: $blue;
    h1 {
        color: $white;
    }
}

#play {
    position: absolute;
    right: 40px;
    bottom: 30px;
}

#upcoming-banner {
    margin-top: 130px;
}

.table-header {
    background: $blue;
    height: 50px;
    p {
        color: $white;
        font-size: 1.25rem;
        text-transform: uppercase;
    }
}

.season-menu-option {
    cursor: pointer;
}

.icon-box {
    @include flex-center;
    width: 100%;
    height: 170px;
    background: $blue;
}

.ticker {
    width: 100%;
    height: 45px;
    background: $blue;
    position: absolute;
    bottom: 0;
}

</style>