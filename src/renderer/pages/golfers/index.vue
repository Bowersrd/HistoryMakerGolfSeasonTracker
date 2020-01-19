<template>
  <div id="content-wrapper">
    <h1 class="mb-8 display-3">Golfer Manager</h1>
    <v-data-table
      height="490px"
      :headers="headers"
      :items="players"
      :items-per-page="12"
      sort-by="last"
      dense
      class="elevation-1"
    >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title class="title">Roster</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="#CC0001" dark class="mb-2 ml-2" v-on="on">Add Golfer</v-btn>
              <v-btn color="#083666" dark class="mb-2" @click.native="resetGolfers">Reset Golfers</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.first" label="First"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.last" label="Last"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.country" label="Country"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.points" label="FedEx Points"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.wins" label="Wins"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.top" label="Top 10"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.cuts" label="Cuts"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.grade" label="Grade"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-checkbox
                        v-model="editedItem.injured"
                        label="Injured"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.country="{ item }">
        <img class="mt-2" width="50%" height="100%" :src="require(`@/assets/img/flags/${item.country}.png`)" alt="Country Flag" />
      </template>
      <template v-slot:item.money="{ item }">
        $ {{ item.money }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          fas fa-edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          fas fa-trash-alt
        </v-icon>
      </template>
      <template v-slot:no-data>
        <h3 class="font-weight-bold my-3">You have no golfers in the database!</h3>
      </template>
    </v-data-table>
    <div class="d-flex">
      <v-btn class="mt-10 back-btn" dark large fab color="#083666" to="/">
        <v-icon>fas fa-long-arrow-alt-left</v-icon>
      </v-btn>
    </div>
    </div>
  </template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'First', value: 'first' },
        { text: 'Last', value: 'last' },
        { text: 'Country', value: 'country' },
        { text: 'FedEx Pts', value: 'points' },
        { text: 'Events', value: 'events.length' },
        { text: 'Wins', value: 'wins' },
        { text: 'Top 10', value: 'top' },
        { text: 'Cuts', value: 'cuts' },
        { text: 'Earnings', value: 'money' },
        { text: 'Actions', value: 'action' }
      ],
      players: [],
      editedIndex: -1,
      editedItem: {
        first: '',
        last: '',
        country: '',
        points: 0,
        events: [],
        wins: 0,
        top: 0,
        cuts: 0,
        money: 0,
        injured: false,
        grade: ''
      },
      defaultItem: {
        first: '',
        last: '',
        country: '',
        points: 0,
        events: [],
        wins: 0,
        top: 0,
        cuts: 0,
        money: 0,
        injured: false,
        grade: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Golfer' : 'Edit Golfer'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.players = this.$store.state.golfers.players
      },

      editItem (item) {
        this.editedIndex = this.players.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const id = item.id
        this.$store.dispatch('golfers/deleteGolfer', id)
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
          const editItem = this.editedItem
          const editIndex = this.editedIndex
          this.$store.dispatch('golfers/editGolfer', { golfer: editItem, edited: editIndex })
        } else {
          this.$store.dispatch('golfers/addGolfer', this.editedItem)
        }
        this.close()
      },

      resetGolfers () {
        this.$store.dispatch('golfers/resetGolfers')
      }
    }
  }
</script>

<style lang="scss">
@import '~assets/sass/main.scss';

#content-wrapper {
  @include flex-center;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background: url('~assets/img/background-play.jpg');
  h1 {
    color: $blue;
    text-transform: uppercase;
    font-weight: bold;
  }
}

.title {
  color: $red;
}

#pga-logo {
  width: 100px;
  left: 10px;
  top: 15px;
  position: absolute;
  img {
    width: 100px;
  }
}

#main-menu {
  @include flex-center;
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: 5rem;
    font-weight: bold;
    text-transform: uppercase;
    color: $blue;
    margin: 85px 0 10px;
  }
}

#menu-buttons {
  @include flex-center;
}

.menu-item {
  @include flex-center;
  width: 275px;
  height: 225px;
  background: $red;
  flex-direction: column;
  margin: 0 5px;
  opacity: 0.75;
  transition: all 0.5s;
  &:hover {
    opacity: 1;
    transform: scale(1.10);
    z-index: 1;
  }
  i {
    width: 100%;
    height: 165px;
    color: $white;
  }
}

.menu-item-sub {
  @include flex-center;
  width: 100%;
  height: 60px;
  background: $blue;
  p {
    color: $white;
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }
}

.year-select {
  max-width: 12%;
}

</style>
