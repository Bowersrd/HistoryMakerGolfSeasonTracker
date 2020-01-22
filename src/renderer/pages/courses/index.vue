<template>
  <div id="content-wrapper">
    <h1 class="mb-8 display-3">Course Manager</h1>
    <v-data-table
      :headers="headers"
      :items="courses"
      sort-by="name"
      class="elevation-1"
    >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title class="title">Library</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="#CC0001" dark class="mb-2 ml-2" v-on="on">Add Course</v-btn>
              <v-btn color="#083666" dark class="mb-2 ml-2" @click="importCourse">Import Course</v-btn>
              <v-btn color="#083666" dark class="mb-2" @click="resetCourses">Reset Courses</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.name" label="Course Name"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="editedItem.city" label="City"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="editedItem.state" label="State"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model.number="editedItem.par" label="Par"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model.number="editedItem.yards" label="Yards"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <h1>Holes</h1>
                    </v-col>
                    <v-col class="outlined" cols="4" v-for="(addHole, index) in addHoles" :key="addHole.index">
                      <h1 class="ml-11 mb-2"> {{ addHole }}</h1>
                      <div class="hole-box">
                        <v-text-field
                        label="Par"
                        outlined
                        dense
                        v-model.number="editedItem.holes[index].par"
                        ></v-text-field>
                        <v-text-field
                        label="Yds"
                        outlined
                        dense
                        v-model.number="editedItem.holes[index].yds"
                        ></v-text-field>
                      </div>
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
          class="mr-2"
          @click="deleteItem(item)"
        >
          fas fa-trash-alt
        </v-icon>
        <v-icon
          small
          @click="exportItem(item)"
        >
          fas fa-file-export
        </v-icon>
      </template>
      <template v-slot:no-data>
        <h3 class="font-weight-bold my-3">You have no courses in the database!</h3>
      </template>
    </v-data-table>
    <div class="d-flex">
      <v-btn class="mt-10 back-btn" dark large fab color="#083666" to="/">
        <v-icon>fas fa-long-arrow-alt-left</v-icon>
      </v-btn>
    </div>
    <v-snackbar
      color="#083666"
      v-model="snackbar"
      :timeout="3000"
    >
      {{ snackText }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    </div>
  </template>

<script>
  export default {
    data: () => ({
      dialog: false,
      snackbar: false,
      snackText: '',
      headers: [
        { text: 'Course Name', sortable: true, value: 'name' },
        { text: 'City', value: 'city' },
        { text: 'State', value: 'state' },
        { text: 'Par', value: 'par' },
        { text: 'Yards', value: 'yards' },
        { text: 'Holes', value: 'holes.length' },
        { text: 'Actions', value: 'action' }
      ],
      addHoles: ['No. 1', 'No. 2', 'No. 3', 'No. 4', 'No. 5', 'No. 6', 'No. 7', 'No. 8', 'No. 9', 'No. 10', 'No. 11', 'No. 12', 'No. 13', 'No. 14', 'No. 15', 'No. 16', 'No. 17', 'No. 18'],
      courses: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        city: '',
        state: '',
        par: 0,
        yards: 0,
        holes: [
          {no: 1, par: null, yds: null},
          {no: 2, par: null, yds: null},
          {no: 3, par: null, yds: null},
          {no: 4, par: null, yds: null},
          {no: 5, par: null, yds: null},
          {no: 6, par: null, yds: null},
          {no: 7, par: null, yds: null},
          {no: 8, par: null, yds: null},
          {no: 9, par: null, yds: null},
          {no: 10, par: null, yds: null},
          {no: 11, par: null, yds: null},
          {no: 12, par: null, yds: null},
          {no: 13, par: null, yds: null},
          {no: 14, par: null, yds: null},
          {no: 15, par: null, yds: null},
          {no: 16, par: null, yds: null},
          {no: 17, par: null, yds: null},
          {no: 18, par: null, yds: null},
        ]
      },
      defaultItem: {
        name: '',
        city: '',
        state: '',
        par: 0,
        yards: 0,
        holes: [
          {no: 1, par: null, yds: null},
          {no: 2, par: null, yds: null},
          {no: 3, par: null, yds: null},
          {no: 4, par: null, yds: null},
          {no: 5, par: null, yds: null},
          {no: 6, par: null, yds: null},
          {no: 7, par: null, yds: null},
          {no: 8, par: null, yds: null},
          {no: 9, par: null, yds: null},
          {no: 10, par: null, yds: null},
          {no: 11, par: null, yds: null},
          {no: 12, par: null, yds: null},
          {no: 13, par: null, yds: null},
          {no: 14, par: null, yds: null},
          {no: 15, par: null, yds: null},
          {no: 16, par: null, yds: null},
          {no: 17, par: null, yds: null},
          {no: 18, par: null, yds: null},
        ]
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Course' : 'Edit Course'
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
        this.courses = this.$store.state.courses.courses
      },

      editItem (item) {
        this.editedIndex = this.courses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const id = item.courseId
        this.$store.dispatch('courses/deleteCourse', id)
      },

      exportItem (item) {
        const {dialog} = require('electron').remote;
        const exportedCourse = JSON.stringify(item)
        let path = dialog.showOpenDialog({
        properties: ['openDirectory']});
        let name = item.name
        var fs = require('fs');
        if (path !== undefined) {
        fs.writeFile(`${path}/${name}.txt`, exportedCourse, function(err) {
          if (err) {
            console.log(err);
          }
        })
        this.snackbar = true
        this.snackText = `${item.name} successfully exported!`
        }
      },

      importCourse () {
        const {dialog} = require('electron').remote;
        const fs = require('fs');
        let file = dialog.showOpenDialog({
        properties: ['openFile']});
        if (file !== undefined) {
          const course = JSON.parse(fs.readFileSync(file[0], 'utf8'));
          if (course.courseId !== undefined) {
            this.$store.dispatch('courses/addCourse', course)
            this.snackbar = true
            this.snackText = `${course.name} successfully imported!`
          }
        }
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
          this.$store.dispatch('courses/editCourse', { course: editItem, edited: editIndex })
        } else {
          this.$store.dispatch('courses/addCourse', this.editedItem)
        }
        this.close()
      },

      resetCourses () {
        this.$store.dispatch('courses/resetCourses')
      }
    },
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

.hole-box {
  width: 100%;
  display: flex;
}

</style>
