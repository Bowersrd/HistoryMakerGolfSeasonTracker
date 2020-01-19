<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="players"
        >
        <template v-slot:item.last="{ item }">
            {{ item.first }} {{ item.last }}   
        </template>
        <template v-slot:item.country="{ item }">
            <img class="mt-2" height="100%" :src="require(`@/assets/img/flags/${item.country}.png`)" alt="Country Flag" />
        </template>
        <template v-slot:header="{ props: { headers } }">
            <thead>
            <tr>
                <th class="table-header" :colspan="headers.length">
                    <v-row>
                        <v-col cols="8">
                            <p>FedEx Points Leaderboard</p>
                        </v-col>
                        <v-col cols="4">
                            <v-btn class="subtitle-2" text dark to="/season/leaderboard">View Full Leaderboard</v-btn>
                        </v-col>
                    </v-row>
                </th>
            </tr>
            </thead>
        </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>

</style>