const getDefaultState = () => {
    return {
        activeSeason: false,
        currentWeek: 0,
        players: [],
        schedule: [],
        playoffSchedule: [
          {
            playoffId: 0,
            name: 'The Northern Trust',
            course: 'TPC Boston',
            purse: 9500000,
            points: 2000,
            field: 125,
            complete: false
          },
          {
            playoffId: 1,
            name: 'BMW Championship',
            course: 'Olympia Fields CC',
            purse: 9500000,
            points: 2000,
            field: 70,
            complete: false
          },
          {
            playoffId: 2,
            name: 'TOUR Championship',
            course: 'East Lake GC',
            purse: 0,
            points: 0,
            field: 30,
            complete: false
          }
        ],
        isPlayoffs: false,
        watchedVideo: false,
        isEndOfSeason: false,
        fedex: [
          {'points': [300, 165, 105, 80, 65, 60, 55, 50, 45, 40, 37.5, 35, 32.5, 31, 30.5, 30, 29.5, 29, 28.5, 28, 26.76, 25.51, 24.27, 23.02, 22.09, 21.16, 20.22, 19.29, 18.36, 17.42, 16.49, 15.56, 14.62, 13.69, 13.07, 12.44, 11.82, 11.2, 10.58, 9.96, 9.33, 8.71, 8.09, 7.47, 6.84, 6.53, 6.22, 5.91, 5.6, 5.29, 4.98, 4.67, 4.36, 4.04, 3.73, 3.61, 3.48, 3.36, 3.24, 3.11, 2.99, 2.86, 2.74, 2.61, 2.49, 2.36, 2.24, 2.12, 1.99, 1.87, 1.8, 1.74, 1.68, 1.62, 1.56, 1.49, 1.43, 1.37, 1.31, 1.24, 1.18, 1.12, 1.06, 1, 0.93, 0.90, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88]},
          {'points': [500, 300, 190, 135, 110, 100, 90, 85, 80, 75, 70, 65, 60, 57, 55, 53, 51, 49, 47, 45, 43, 41, 39, 37, 35.5, 34, 32.5, 31, 29.5, 28, 26.5, 25, 23.5, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.8, 5.6, 5.4, 5.2, 5, 4.8, 4.6, 4.4, 4.2, 4, 3.8, 3.6, 3.4, 3.2, 3, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
          {'points': [550, 315, 200, 140, 115, 105, 95, 89, 83, 78, 73, 69, 65, 62, 59, 57, 55, 53, 52, 51, 48.73, 46.47, 44.2, 41.93, 40.23, 38.53, 36.83, 35.13, 33.43, 31.73, 30.03, 28.33, 26.63, 24.93, 23.8, 22.67, 21.53, 20.4, 19.27, 18.13, 17, 15.87, 14.73, 13.6, 12.47, 11.9, 11.33, 10.77, 10.2, 9.63, 9.07, 8.5, 7.93, 7.37, 6.8, 6.57, 6.35, 6.12, 5.89, 5.67, 5.44, 5.21, 4.99, 4.76, 4.53, 4.31, 4.08, 3.85, 3.63, 3.4, 3.29, 3.17, 3.06, 2.95, 2.83, 2.72, 2.61, 2.49, 2.38, 2.27, 2.15, 2.04, 1.93, 1.81, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.1, 1.1, 1.1, 1, 1, 1, 1, 1, 1]},
          {'points': [600, 330, 210, 150, 120, 110, 100, 94, 88, 82, 77, 72, 68, 64, 61, 59, 57, 55, 53, 51, 48.73, 46.47, 44.2, 41.93, 40.23, 38.53, 36.83, 35.13, 33.43, 31.73, 30.03, 28.33, 26.63, 24.93, 23.8, 22.67, 21.53, 20.4, 19.27, 18.13, 17, 15.87, 14.73, 13.6, 12.47, 11.9, 11.33, 10.77, 10.2, 9.63, 9.07, 8.5, 7.93, 7.37, 6.8, 6.57, 6.35, 6.12, 5.89, 5.67, 5.44, 5.21, 4.99, 4.76, 4.53, 4.31, 4.08, 3.85, 3.63, 3.4, 3.29, 3.17, 3.06, 2.95, 2.83, 2.72, 2.61, 2.49, 2.38, 2.27, 2.15, 2.04, 1.93, 1.81, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.1, 1.1, 1.1, 1, 1, 1, 1, 1, 1]},
          {'points': [2000, 1200, 760, 540, 440, 400, 360, 340, 320, 300, 280, 260, 240, 228, 220, 212, 204, 196, 188, 180, 172, 164, 156, 148, 142, 136, 130, 124, 118, 112, 106, 100, 94, 88, 84, 80, 76, 72, 68, 64, 60, 56, 52, 48, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 23.2, 22.4, 21.6, 20.8, 20, 19.2, 18.4, 17.6, 16.8, 16, 15.2, 14.4, 13.6, 12.8, 12, 11.6, 11.2, 10.8, 10.4, 10, 9.6, 9.2, 8.8, 8.4, 8, 7.6, 7.2, 6.8, 6.4, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
        ],
        moneyDist: [18, 10.8, 6.8, 4.8, 4, 3.6, 3.35, 3.1, 2.9, 2.7, 2.5, 2.3, 2.1, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.12, 1.04, 0.96, 0.88, 0.8, 0.77, 0.74, 0.71, 0.68, 0.65, 0.62, 0.59, 0.565, 0.54, 0.515, 0.49, 0.47, 0.45, 0.43, 0.41, 0.39, 0.37, 0.35, 0.33, 0.31, 0.29, 0.274, 0.26, 0.252, 0.246, 0.24, 0.236, 0.232, 0.23, 0.228, 0.226, 0.224, 0.222, 0.22, 0.218, 0.216, 0.214, 0.212, 0.21, 0.208, 0.206, 0.204, 0.202, 0.2, 0.198, 0.196, 0.194, 0.19, 0.188, 0.186, 0.184, 0.18, 0.178, 0.176, 0.174, 0.17, 0.168, 0.166, 0.164, 0.16, 0.158, 0.156, 0.154, 0.15, 0.148, 0.146, 0.144, 0.14, 0.138, 0.136, 0.134, 0.13, 0.13, 0.13 ]
    }
  }
  
  export const state = () => getDefaultState()

  export const getters = {
    topPlayers: state => {
      const newArray = state.players.map(player => player)
      const sortedPlayers = newArray.sort((a,b) => b.points - a.points) 
      return sortedPlayers.slice(0,state.playoffSchedule[state.currentWeek].field)
    },
    injuredPlayers: state => state.players.filter(player => player.injury)
  }
  
  export const mutations = {
    RESET_SEASON: state => {
      Object.assign(state, getDefaultState())
    },
    ACTIVATE_SEASON: state => state.activeSeason = true,
    ADD_PLAYERS: (state, players) => {
        state.players = players
    },
    ADD_EVENT: (state, details) => {
      let count = state.schedule.length
      let event = {...details, id: count}
      state.schedule.push(event)
    },
    EDIT_EVENT: (state, { event, index, playoff }) => {
      playoff ? Object.assign(state.playoffSchedule[index], event) : Object.assign(state.schedule[index], event)
    },
    DELETE_EVENT: (state, item) => {
      const deletedEvent = state.schedule.find(event => event === item)
      const index = state.schedule.indexOf(deletedEvent)
      state.schedule.splice(index, 1)
    },
    ADD_EVENT_TO_PLAYERS: (state, { field, event }) => {
      let fieldId = field.map(player => player.id)
      let newEvent = {name: event, finish: null, ties: null}
      state.players.forEach(player => {
        if (fieldId.includes(player.id)) {
          player.events.push(newEvent)
        }
      })
    },
    ADD_CUT_MADE: (state, field) => {
      state.players.forEach(player => {
        let cut = field.find(item => item.id === player.id)
        if (cut !== undefined) {
          if (cut.score !== 'CUT') {
            player.cuts++
          } else {
            player.cuts
          }
        }
      })
    },
    GET_EVENT_ARRAY: (state, field) => {
      state.players.forEach(player => {
        let event = field.find(item => item.id === player.id)
        if (event !== undefined) {
          player.events[player.events.length - 1] = {...event.events[event.events.length - 1]}
        }
      })
    },
    GET_FEDEX_POINTS: (state, { field, pointValue }) => {
      let mappedField = field.map(player => player.id)

      if (pointValue === 300) {
        pointValue = 0
      } else if (pointValue === 500) {
        pointValue = 1
      } else if (pointValue === 550) {
        pointValue = 2
      } else if (pointValue === 600) {
        pointValue = 3
      } else if (pointValue === 2000) {
        pointValue = 4
      }

      state.players.forEach(player => {
        let golfer = field.find(item => item.id === player.id)
        let index = mappedField.indexOf(player.id)
        if (golfer !== undefined) {
          let finish = golfer.events[golfer.events.length - 1].finish
          let ties = golfer.events[golfer.events.length - 1].ties

          if (golfer.score === 'CUT') {

            player.points += 0
            player.money += 0

          } else {

            // CHECK IF TOUR CHAMPIONSHIP
            if (state.currentWeek === 2 && state.isPlayoffs === true) {

              // NO POINTS - MONEY AWARDED NOT PART OF OFFICIAL EARNINGS PER PGA
              state.isEndOfSeason = true

            } else {

              if (ties - 1 !== 0) {
                // SPLIT POINTS
                let splitPoints = state.fedex[pointValue].points.slice(finish - 1, finish + ties - 1)
                let distPoints = Math.round(splitPoints.reduce((acc, curr) => acc + curr, 0) / ties)
                player.points += distPoints
  
                // SPLIT MONEY
                let splitMoney = state.moneyDist.slice(finish - 1, finish + ties - 1)
                let splitMoneyMap = state.isPlayoffs ? splitMoney.map(money => Math.round(state.playoffSchedule[state.currentWeek].purse * (money / 100))) : splitMoney.map(money => Math.round(state.schedule[state.currentWeek].purse * (money / 100)))
                let distMoney = Math.round(splitMoneyMap.reduce((acc, curr) => acc + curr, 0) / ties)
                player.money += distMoney
  
              } else {
                // NO TIES - KEEP FULL POINT VALUE & MONEY
                player.points += Math.round(state.fedex[pointValue].points[index])
                state.isPlayoffs ? player.money += Math.round(state.playoffSchedule[state.currentWeek].purse * (state.moneyDist[index] / 100)) : player.money += Math.round(state.schedule[state.currentWeek].purse * (state.moneyDist[index] / 100))
              }

            }
            // DECLARE WINNER
            if (finish == 1) {
              player.wins++
              state.isPlayoffs ? state.playoffSchedule[state.currentWeek].winner = `${player.first} ${player.last}` : state.schedule[state.currentWeek].winner = `${player.first} ${player.last}`
            }

            // DECLARE TOP 10 FINISH
            if (finish <= 10) {
              player.top++
            }
          }
        }
      })
    },
    ADVANCE_WEEK: (state) => {
      // Advance Week & Determine When Playoffs, End of Season
      if (state.isPlayoffs === false) {
        state.currentWeek === state.schedule.length - 1 ? (state.currentWeek = 0, state.isPlayoffs = true) : state.currentWeek++
      } else {
        state.currentWeek === state.playoffSchedule.length - 1 ? state.isEndOfSeason = true : state.currentWeek++
      }
    },
    RANK_LEADERBOARD: (state) => {
      state.players.sort((a,b) => b.points - a.points)

      state.players.forEach(player => {
        player.rank = state.players.indexOf(player) + 1
      })
    },
    SET_LAST_RANK: (state) => {
      state.players.forEach(player => player.lastRank = player.rank)
      console.log(state.players)
    },
    SET_VIDEO_STATUS: (state) => {
      state.watchedVideo = true
    },
    ADD_INJURY: (state, golfer) => {
      state.players.forEach(player => {
        if (player.id === golfer.id) {
          player.injury = true
          player.injuryType = golfer.injury
        }
      })
    },
    REMOVE_INJURY: (state, id) => {
      state.players.forEach(player => {
        if (player.id === id) {
          player.injury = false
        }
      })
    },
    MOVE_EVENT_UP: (state, index) => {
      const arrayMove = require('array-move');
      let newSchedule = arrayMove(state.schedule, index, index - 1)

      if (index - 1 >= 0) {
        state.schedule = newSchedule
      }    
    },
    MOVE_EVENT_DOWN: (state, index) => {
      const arrayMove = require('array-move');
      let newSchedule = arrayMove(state.schedule, index, index + 1)

      state.schedule = newSchedule
    },
  }
  
  export const actions = {
    resetSeason ({ commit }) {
      commit('RESET_SEASON')
    },
    activateSeason ({ commit }) {
      commit('ACTIVATE_SEASON')
    },
    addPlayers ({ commit }, players) {
      commit('ADD_PLAYERS', players)
    },
    addEvent ({ commit }, details) {
      commit('ADD_EVENT', details)
    },
    editEvent ({ commit }, { event, index, playoff }) {
      commit('EDIT_EVENT', { event, index, playoff })
    },
    deleteEvent ({ commit }, item) {
      commit('DELETE_EVENT', item)
    },
    addEventToPlayers ({ commit }, { field, event }) {
      commit('ADD_EVENT_TO_PLAYERS', { field, event })
    },
    getEventArray ({ commit }, field) {
      commit('GET_EVENT_ARRAY', field)
    },
    addCutMade ({ commit }, field) {
      commit('ADD_CUT_MADE', field)
    },
    getFedexPoints ({ commit }, { field, pointValue }) {
      commit('GET_FEDEX_POINTS', { field, pointValue })
    },
    advanceWeek ({ commit }) {
      commit('ADVANCE_WEEK')
    },
    rankLeaderboard ({ commit }) {
      commit('RANK_LEADERBOARD')
    },
    setLastRank ({ commit }) {
      commit('SET_LAST_RANK')
    },
    setVideoStatus ({ commit }) {
      commit('SET_VIDEO_STATUS')
    },
    addInjury ({ commit }, golfer) {
      commit('ADD_INJURY', golfer)
    },
    removeInjury ({ commit }, id) {
      commit('REMOVE_INJURY', id)
    },
    moveEventUp ({ commit }, index) {
      commit('MOVE_EVENT_UP', index)
    },
    moveEventDown ({ commit }, index) {
      commit('MOVE_EVENT_DOWN', index)
    }
  }