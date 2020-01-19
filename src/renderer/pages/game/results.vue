<template>
    <div class="d-flex align-center justify-center" id="results-wrapper">
        <div class="container">
            <v-data-table
                height="650px"
                :headers="headers"
                :items="field"
                :items-per-page="field.length"
                dense
                dark
                :sort-by="['score']"
                item-key="last"
                class="elevation-1 mb-4 grey darken-4"
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr>
                        <th class="table-header" :colspan="headers.length">
                            <p class="display-1 font-weight-bold white--text ml-2 mt-2"> {{ event }} </p>
                            <p class="subtitle-1 white--text ml-2"> {{ courseName }} </p>
                        </th>
                    </tr>
                    </thead>
                </template>
                <template v-slot:item.rank="{ item }">
                    <p> {{ item.rank }} </p>   
                </template>
                <template v-slot:item.country="{ item }">
                    <img class="mt-2" height="100%" :src="require(`@/assets/img/flags/${item.country}.png`)" alt="Country Flag" />    
                </template>
                <template v-slot:item.total="{ item }">
                    <p>
                        <span v-show="item.total > 0">+{{ item.total }}</span>
                        <span v-show="item.total < 0"> {{ item.total }} </span> 
                        <span v-show="item.total === 0">E</span> 
                    </p> 
                </template>
                <template v-slot:item.thru="{ item }">
                    <p>F</p> 
                </template>
                <template v-slot:item.last="{ item }">
                    {{ item.first }} {{ item.last }}   
                </template>
            </v-data-table>
        </div>
        <v-btn class="forward-btn" dark large fab color="#083666" to="/season/home" @click.native="finalizeTournament">
            <v-icon>fas fa-long-arrow-alt-right</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            headers: [
                { text: '', value: 'rank', width: 20 },
                { text: '', value: 'country', width: 20, align: 'right' },
                { text: 'PLAYER', value: 'last', width: 300 },
                { text: 'TOTAL', value: 'total', align: 'center' },
                { text: 'THRU', value: 'thru', align: 'center' },
                { text: 'STROKES', value: 'score', align: 'center' },
            ],
        }
    },
    computed: {
        field () {
            return this.$store.state.game.field
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
        tournamentScoring () {
            return this.$store.state.game.tournamentScore
        },
        currentWeek () {
            return this.$store.state.season.currentWeek
        },
        isPlayoffs () {
            return this.$store.state.season.isPlayoffs
        },
        eventPointValue () {
            return this.isPlayoffs ? this.$store.state.season.playoffSchedule[this.currentWeek].points : this.$store.state.season.schedule[this.currentWeek].points
        }
    },
    methods: {
        finalizeTournament () {
            let field = this.field
            let pointValue = this.eventPointValue

            this.$store.dispatch('season/getEventArray', field)
            this.$store.dispatch('season/getFedexPoints', { field, pointValue })
            this.$store.dispatch('game/resetGame')
            this.$store.dispatch('season/advanceWeek') 
        }
    },
    created () {
        this.$store.dispatch('game/sortField')
    },
    mounted () {
        this.$store.dispatch('game/rankField')
        this.$store.dispatch('game/addFinish')
        this.$store.dispatch('game/addTies')
        this.$store.dispatch('game/setTotalStrokes')  
    }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/main.scss';

#results-wrapper {
    background: url('~assets/img/background-play.jpg');
    height: 100vh;
}

.table-header {
    background: $blue;
    height: 100px;
    text-transform: uppercase;
}
</style>