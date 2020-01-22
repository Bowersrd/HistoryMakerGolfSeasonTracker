<template>
    <div id="leaderboard-wrapper" class="d-flex flex-column justify-center">

        <div class="container">

            <div class="leaderboard-header d-flex align-center">
                <h1 class="headline text-uppercase font-weight-bold ml-5">FedExcup Season Standings</h1>
            </div>

            <v-data-table
                id="leaderboard"
                height="620px"
                :headers="headers"
                :items="players"
                item-key="id"
                sort-by="points"
                :items-per-page="players.length"
                :sort-desc="true"
                :fixed-header="true"
                dense
                :footer-props="{
                disablePagination: true,
                disableItemsPerPage: true,
                nextIcon: null,
                prevIcon: null
                }"
            >
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item, index) in items" :key="item.id" :class="{'grey lighten-4': index % 2 === 0}">
                            <td>{{ item.lastRank }}</td>
                            <td>{{ item.rank }}</td>
                            <td>
                                <v-icon class="mt-2" color="success" v-if="item.lastRank - item.rank > 0">fas fa-sort-up</v-icon>
                                <v-icon class="mb-3" color="error" v-else-if="item.lastRank - item.rank < 0">fas fa-sort-down</v-icon>
                                <v-icon color="warning" small v-else>fas fa-minus</v-icon>
                                <span v-if="item.lastRank">&nbsp; {{ Math.abs(item.lastRank - item.rank) }}</span>
                            </td>
                            <td><img class="mt-2" height="100%" :src="require(`@/assets/img/flags/${item.country}.png`)" alt="Country Flag" /></td>
                            <td>
                                {{ item.first }} {{ item.last }}
                                <img class="ml-1" height="25%" src="@/assets/img/injury.svg" alt="Injury Symbol" v-if="item.injury" />
                            </td>
                            <td>{{ item.events.length }}</td>
                            <td>{{ item.points.toLocaleString('en') }}</td>
                            <td>{{ item.wins }}</td>
                            <td>{{ item.top }}</td>
                            <td>{{ item.cuts }}</td>
                            <td>{{  Math.max(...players.map(player => player.points)) - item.points === 0 ? '-' : Math.max(...players.map(player => player.points)) - item.points  }}</td>
                            <td>
                                {{ 
                                    Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0
                                    }).format(item.money) 
                                }}
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-data-table>

        </div>

        <v-btn class="mt-10 mb-4 back-btn" dark large fab color="#CC0001" to="/season/home">
            <v-icon>fas fa-long-arrow-alt-left</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    data () {
      return {
        headers: [
        { text: 'Prev', value: 'lastRank', width: 20, align:'center' },
        { text: 'Rank', value: 'rank', width: 20, align:'center' },
        { text: 'Change', value: '', width: 20, align:'center' },
        { text: '', value: 'country', width: 20 },
        { text: 'Player', value: 'last', width: 225 },
        { text: 'Events', value: 'events.length' },
        { text: 'Points', value: 'points' },
        { text: 'Wins', value: 'wins' },
        { text: 'Top 10', value: 'top' },
        { text: 'Cuts', value: 'cuts' },
        { text: 'Behind', value: 'behind' },
        { text: 'Earnings', value: 'money' },
        ],
        items: this.players
      }
    },
    computed: {
        players () {
            return this.$store.state.season.players
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/main.scss';

#leaderboard-wrapper {
    background: url('~assets/img/background-play.jpg');
    width: 100%;
    height: 100vh;
}

.leaderboard-header {
    width: 100%;
    height: 60px;
    background: $blue;
    color: $white;
}

#leaderboard {
    border: 2px solid $gray;
}

.v-data-table--dense td {
    height: 30px;
}
</style>