<template>
  <div id="score-wrapper">
    <div class="d-flex perks">
      <p
        class="body-2 font-weight-bold"
        :class="{
          green: perk.name === 'Lucky',
          'yellow darken-1': perk.name === 'Sunny',
          'grey darken-1': perk.name === 'Stormy',
          blue: perk.name === 'Ex. Control'
        }"
        v-for="(perk, index) in golfer.perks"
        :key="index"
        @click="tillFurtherNotice(perk)"
      >
        {{ perk.name }}
        <span class="caption" v-show="perk.tfn">(TFN)</span>
      </p>
    </div>
    <div id="scorecard-wrapper">
      <div class="d-flex pa-2 justify-space-between">
        <div class="d-flex align-center" id="name">
          <p class="headline white--text text-uppercase ml-4">
            {{ golfer.first }} {{ golfer.last }}
          </p>
          <img
            class="ml-4"
            height="60%"
            :src="require(`@/assets/img/flags/${country}.png`)"
            alt="Country Flag"
          />
        </div>
        <div class="d-flex align-center justify-center" id="score">
          <p
            class="display-1 white--text text-uppercase"
            v-if="showTodayScore"
            @click="toggleScore"
          >
            {{ todayTotal }}
          </p>
          <p
            class="display-1 white--text text-uppercase"
            v-else
            @click="toggleScore"
          >
            {{ total }}
          </p>
        </div>
      </div>
      <div class="d-flex pb-2">
        <img
          class="pb-2"
          height="100px"
          src="@/assets/img/pga_tour.png"
          alt="Country Flag"
        />
        <div id="scorecard">
          <div class="hole-number d-flex justify-space-around">
            <p
              v-for="holeNumber in holeNumbers"
              :key="holeNumber"
              :class="holeNumber === currentHole ? 'active' : ''"
            >
              {{ holeNumber }}
            </p>
          </div>
          <div class="hole-par d-flex justify-space-around">
            <div
              class="d-flex"
              id="tags"
              v-for="(hole, index) in holes"
              :key="hole.no"
            >
              <p>{{ hole.par }}</p>
              <p class="double" v-if="index === 8">{{ frontTotal }}</p>
              <p class="double" v-if="index === 17">{{ backTotal }}</p>
            </div>
          </div>
          <div class="hole-score hole-par d-flex justify-space-around">
            <div
              class="d-flex"
              v-for="(score, index) in scorecard"
              :key="score.no"
            >
              <p
                :class="{
                  eagle: score.score <= holes[index].par - 2 && score.score > 0,
                  birdie: score.score === holes[index].par - 1,
                  bogey: score.score === holes[index].par + 1,
                  'dbl-bogey': score.score >= holes[index].par + 2
                }"
              >
                {{ score.score }}
              </p>
              <p class="double" v-if="index === 8">{{ frontScore }}</p>
              <p class="double" v-if="index === 17">{{ backScore }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div class="d-flex flex-wrap scorecard-actions">
        <div class="d-flex flex-wrap score-actions mt-1">
          <v-row>
            <v-col cols="8">
              <v-btn
                v-for="action in actions"
                :key="action"
                tile
                width="100px"
                color="#083666"
                dark
                class="caption mb-2"
                @click="sendScore(action)"
              >
                {{ action }}
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                v-for="perk in perks"
                :key="perk"
                tile
                width="105px"
                color="#083666"
                dark
                class="caption mb-2"
                @click="addPerk(perk)"
              >
                {{ perk }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "golfer",
    "country",
    "holes",
    "scorecard",
    "today",
    "total",
    "showTodayScore"
  ],
  data: () => {
    return {
      holeNumbers: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        null,
        null,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        null,
        null
      ],
      actions: [
        "Ace",
        "Eagle",
        "Birdie",
        "Par",
        "Bogey",
        "Dbl Bogey",
        "Tpl Bogey",
        "+4 Over"
      ],
      perks: ["Lucky", "Ex. Control", "Sunny", "Stormy"],
      showToday: true
    };
  },
  computed: {
    frontScore() {
      let scores = this.scorecard.map(score => score.score).splice(0, 9);
      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      if (scores.reduce(reducer) === 0) {
        return "";
      } else {
        return scores.reduce(reducer);
      }
    },
    backScore() {
      let scores = this.scorecard.map(score => score.score).splice(9, 9);
      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      if (scores.reduce(reducer) === 0) {
        return "";
      } else {
        return scores.reduce(reducer);
      }
    },
    frontTotal() {
      let total = this.holes.map(hole => hole.par).splice(0, 9);
      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      return total.reduce(reducer);
    },
    backTotal() {
      let total = this.holes.map(hole => hole.par).splice(9, 9);
      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      return total.reduce(reducer);
    },
    todayTotal() {
      let total = this.today.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      if (total === 0) {
        return "E";
      } else if (total > 0) {
        return `+${total}`;
      } else {
        return total;
      }
    },
    currentHole() {
      return this.$store.state.game.currentHole;
    }
  },
  methods: {
    sendScore(action) {
      this.$emit("getScore", action);
    },
    addPerk(perk) {
      this.$emit("getPerk", perk);
    },
    tillFurtherNotice(perk) {
      this.$emit("getTfn", perk);
    },
    toggleScore() {
      this.$emit("toggleScorecardScore");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/sass/main.scss";

$gradient-blue: linear-gradient(#147fd1, #0f5387);
$gradient-black: linear-gradient(#0d0d0d, #1d1d1d);

#score-wrapper {
  width: 100%;
  height: 100%;
}

#scorecard-wrapper {
  width: 780px;
  height: 170px;
  background: $blue;
  position: relative;
}

#name {
  width: 87%;
  height: 50px;
  background: $gradient-black;
}

#score {
  width: 12.25%;
  height: 50px;
  background: $gradient-blue;
  p {
    cursor: pointer;
  }
}

#scorecard {
  width: 86%;
  height: 94px;
}

.hole-number {
  width: 100%;
  height: 25%;
  background: $gradient-blue;
  p {
    width: 28px;
    text-align: center;
    color: $white;
  }
}

.hole-par {
  width: 100%;
  height: 25%;
  background: $gray;
  p {
    width: 28px;
    text-align: center;
    color: $blue;
  }
  .double {
    width: 59px;
    font-weight: 600;
  }
}

.hole-score {
  @include flex-center;
  width: 100%;
  height: 50%;
  background: $gradient-black;
  p {
    @include flex-center;
    color: $white;
    width: 28px;
    height: 28px;
    text-align: center;
  }
  .eagle {
    background: $gray;
    border-radius: 50%;
    color: #000;
  }
  .birdie {
    border: 1px solid $gray;
    border-radius: 50%;
  }
  .bogey {
    border: 1px solid $gray;
  }
  .dbl-bogey {
    border: 1px solid $gray;
    background: $gray;
    color: #000;
  }
}

.scorecard-actions {
  width: 100%;
  height: 100px;
}
.score-actions {
  width: 100%;
  height: 100%;
  button {
    margin: 0 5px;
  }
}

.selected {
  outline: 2px solid $red;
}

.perks {
  width: 100%;
  height: 30px;
  p {
    padding: 5px 15px;
    cursor: pointer;
  }
}

.active {
  background: $blue;
}
</style>
