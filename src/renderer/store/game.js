const getDefaultState = () => {
    return {
      activeGame: false,
      field: [],
      pairings: [],
      tournamentScore: '',
      event: '',
      course: '',
      currentHole: 1,
      group: 0,
      gameEnded: false,
      emerge: 0,
      counter: 1,
      holeSync: [1,2,1,3,2,1,4,3,2,1,5,4,3,2,1,6,5,4,3,2,1,7,6,5,4,3,2,8,7,6,5,4,3,9,8,7,6,5,4,10,9,8,7,6,5,11,10,9,8,7,6,12,11,10,9,8,7,13,12,11,10,9,8,14,13,12,11,10,9,15,14,13,12,11,10,16,15,14,13,12,11,17,16,15,14,13,12,18,17,16,15,14,13,18,17,16,15,14,18,17,16,15,18,17,16,18,17,18],
      holeSyncEmerge: [1,2,1,3,2,1,4,3,2,1,5,4,3,2,1,6,5,4,3,2,1,7,6,5,4,3,2,8,7,6,5,4,3,9,8,7,6,5,4,10,9,8,7,6,5,11,10,9,8,7,6,12,11,10,9,8,7,13,12,11,10,9,8,14,13,12,11,10,9,16,15,14,13,12,11,10,17,16,15,14,13,12,11,18,17,16,15,14,13,12,18,17,16,15,14,13,18,17,16,15,14,18,17,16,15,18,17,16,18,17,18],
      groupSync:[0,0,1,0,1,2,0,1,2,3,0,1,2,3,4,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,1,2,3,4,5,2,3,4,5,3,4,5,4,5,5],
      groupSyncEmerge:[0,0,1,0,1,2,0,1,2,3,0,1,2,3,4,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,6,0,1,2,3,4,5,6,0,1,2,3,4,5,6,0,1,2,3,4,5,6,1,2,3,4,5,6,2,3,4,5,6,3,4,5,6,4,5,6,5,6,6],
      convertedScores: [
        {scores: [266,267,268,269,270,271,271,272,273]},
        {scores: [269,270,271,272,273,274,274,275,276]},
        {scores: [271,272,273,274,275,276,276,277,278]},
        {scores: [273,274,275,276,277,278,278,279,280]},
        {scores: [276,277,278,279,280,281,281,282,283]},
        {scores: [278,279,280,281,282,283,283,284,285]},
        {scores: [281,282,283,284,285,286,286,287,288]},
        {scores: [283,284,285,286,287,288,288,289,290]},
        {scores: [286,287,288,289,290,291,291,292,293]}
      ]
    }
  }
  
  export const state = () => getDefaultState()

  export const getters = {
      nonContention: state => {
        let pairA = state.pairings.map(pair => pair.a.id)
        let pairB = state.pairings.map(pair => pair.b.id)
        let pairs = pairA.concat(pairB)
        return state.field.filter(player => !pairs.includes(player.id))
      }
  }
  
  export const mutations = {
    RESET_GAME: state => {
        Object.assign(state, getDefaultState())
    },
    GET_FIELD: (state, field) => {
        state.field = field
        state.field.forEach(player => {
          player.score = null;
          player.scorecard = [
            {no: 1, score: null},
            {no: 2, score: null},
            {no: 3, score: null},
            {no: 4, score: null},
            {no: 5, score: null},
            {no: 6, score: null},
            {no: 7, score: null},
            {no: 8, score: null},
            {no: 9, score: null},
            {no: 10, score: null},
            {no: 11, score: null},
            {no: 12, score: null},
            {no: 13, score: null},
            {no: 14, score: null},
            {no: 15, score: null},
            {no: 16, score: null},
            {no: 17, score: null},
            {no: 18, score: null},
          ];
          player.today = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
          player.total = 0;
          player.round = 0;
        })
    },
    GET_PAIRINGS: (state, { pairs, scores }) => {
      let counter = 0
      
      pairs.forEach(pair => {
        pair.a.score = scores[0].a[counter]
        pair.b.score = scores[0].b[counter]
        counter++
      })
    
      state.pairings = pairs
    },
    UPDATE_TOURNAMENT_SCORING: (state, score) => {
      state.tournamentScore = score
    },
    UPDATE_SCORE: (state, { id, score}) => {
        state.field.forEach(player => {
          if (player.id == id) {
            player.score = score
          }
        })
      },
    SET_EVENT: (state, { event, course }) => {
      state.event = event
      state.course = course
      state.activeGame = true
    },
    CONVERT_SCORES: (state) => {
      state.field.forEach(player => {
        let grade = Number(player.grade.slice(0, -1))
        let tempScore = state.convertedScores[state.tournamentScore.score].scores[0]

        switch(player.score) {
          case 'A-':
            tempScore = player.score = state.convertedScores[state.tournamentScore.score].scores[0]
            player.score = tempScore + grade - 1
            break;
          case 'B+':
            tempScore = player.score = state.convertedScores[state.tournamentScore.score].scores[0]
            player.score = tempScore + grade
            break;
          case 'B':
            tempScore = player.score = state.convertedScores[state.tournamentScore.score].scores[1]
            player.score = tempScore + grade
            break;
          case 'B-':
            tempScore = player.score = state.convertedScores[state.tournamentScore.score].scores[2]
            player.score = tempScore + grade
            break;
          case 'C+':
            tempScore = player.score = state.convertedScores[state.tournamentScore.score].scores[3]
            player.score = tempScore + grade
            break;
          case 'C':
            tempScore = player.score = state.convertedScores[state.tournamentScore.score].scores[4]
            player.score = tempScore + grade
            break;
          case 'C-':
            tempScore = player.score = state.convertedScores[state.tournamentScore.score].scores[5]
            player.score = tempScore + grade
            break;
          case 'D+':
            tempScore = player.score = state.convertedScores[state.tournamentScore.score].scores[6]
            player.score = tempScore + (grade * 2)
            break;
          case 'D':
            tempScore = player.score = state.convertedScores[state.tournamentScore.score].scores[7]
            player.score = tempScore + (grade * 2)
            break;
          case 'D-':
            tempScore = player.score = state.convertedScores[state.tournamentScore.score].scores[8]
            player.score = tempScore + (grade * 2)
            break;
          case 'CUT':
            player.score = 500
          default: 
            player.score = player.score
        }
      })
      state.field.sort((a,b) => a.score - b.score)
    },
    SETUP_LEADERBOARD: (state, { par, pairs }) => {

      if (state.pairings[0].a.scorecard[0].score !== null || state.currentHole !== 1) {
        // Do not update the leaderboard - game is in progress!
      } else {
        state.pairings.forEach(pair => {
          pair.a.total = pair.a.score - par
          pair.b.total = pair.b.score - par
        })
  
        pairs.sort((a,b) => a.total - b.total)
      
        state.pairings.forEach(pair => {
          pair.a.rank = pairs.indexOf(pair.a)
          pair.b.rank = pairs.indexOf(pair.b)
        })
      }
    },
    ADD_SCORE: (state, { score, letter, today, coursePar, pairs }) => {
      let reducer = (accumulator, currentValue) => accumulator + currentValue

      if (letter === 'a') {
        state.pairings[state.group].a.scorecard[state.currentHole - 1].score = score
        state.pairings[state.group].a.today[state.currentHole - 1] = today
        
        const todayA = state.pairings[state.group].a.today.reduce(reducer)
        
        state.pairings[state.group].a.total = state.pairings[state.group].a.score - coursePar + todayA
      } else {
        state.pairings[state.group].b.scorecard[state.currentHole - 1].score = score
        state.pairings[state.group].b.today[state.currentHole - 1] = today

        const todayB = state.pairings[state.group].b.today.reduce(reducer)

        state.pairings[state.group].b.total = state.pairings[state.group].b.score - coursePar + todayB
      }
      
      pairs.sort((a,b) => a.total - b.total)
    
      state.pairings.forEach(pair => {
        pair.a.rank = pairs.indexOf(pair.a)
        pair.b.rank = pairs.indexOf(pair.b)
      })
    },
    NEXT_HOLE: (state) => {
      if (state.counter === 108) {
        let reducer = (accumulator, currentValue) => accumulator + currentValue
        let field = state.field

        state.gameEnded = true

        // ADD FINAL ROUND TO SCORE

      field.forEach(player => {
        let round = player.scorecard.map(hole => hole.score)
        let finalScore = round.reduce(reducer)

        if (finalScore !== 0) {
          player.score = player.score + finalScore
        }
      })
      } else {
          state.emerge > 0 ? state.group = (state.groupSyncEmerge[state.counter], state.currentHole = state.holeSyncEmerge[state.counter]) : (state.group = state.groupSync[state.counter], state.currentHole = state.holeSync[state.counter])
          state.counter++
      }
    },
    PREV_HOLE: (state) => {
      if (state.counter === 1) {
        // Do Nothing
      } else {
        state.emerge > 0 ? state.group = (state.group = state.groupSyncEmerge[state.counter - 2], state.currentHole = state.holeSyncEmerge[state.counter - 2]) : (state.group = state.groupSync[state.counter - 2], state.currentHole = state.holeSync[state.counter - 2])             
        }
      state.counter--
    },
    SORT_FIELD: (state) => {
      state.field.sort((a,b) => a.score - b.score)

      // Turn score 500 into CUT for presentation purposes
      state.field.forEach(player => {
        if (player.score === 500) {
          player.score = 'CUT'
        }
      })
    },
    RANK_FIELD: (state) => {
      let field = state.field
      let rank = 1
      
      // CODE FOR SETTING RANK
      field.forEach(player => {
        if (field.indexOf(player) !== 0 && player.score === field[field.indexOf(player) - 1].score) {
          player.rank = ''
          rank++
        } else {
          player.rank = rank
          rank++
        }
      })
    },
    ADD_FINISH: (state) => {
      let field = state.field
      let finalFinish = 1
      let counter = 1  

      // CODE FOR SETTING FINISH
      field.forEach(player => {
        let eventName = player.events[player.events.length - 1].name
        if (field.indexOf(player) !== 0 && player.score === field[field.indexOf(player) - 1].score) {
          player.events[player.events.length - 1] = {name: eventName, finish: finalFinish - counter}
          counter++
          finalFinish++
        } else {
          player.events[player.events.length - 1] = {name: eventName, finish: finalFinish}
          counter = 1
          finalFinish++
        }
      })
    },
    ADD_TIES: (state) => {
      let field = state.field
      // CODE FOR SETTING TIES  
      field.forEach(player => {
        let ties = field.filter(golfer => (golfer.score === player.score )).length
        player.events[player.events.length - 1].ties = ties
      })

    },
    SET_TOTAL_STROKES: (state) => {
      let field = state.field
      // CODE FOR SETTING FINAL TOTAL  
      field.forEach(player => {
        if (player.score === 'CUT') {
          player.total = 'CUT'
        } else {
            player.total = player.score - (72 * 4)
        }
      })
    },
    SET_EMERGING_CONTENDERS: (state, { contenders, parTotal }) => {

      const lowScoreA = state.pairings.map(pair => pair.a.total)
      const lowScoreB = state.pairings.map(pair => pair.b.total)
      const lowScores = lowScoreA.concat(lowScoreB)
      const lowestScore = Math.min(...lowScores)

      contenders.a.score = 288 - parTotal + lowestScore + 1
      contenders.a.total = lowestScore + 1

      contenders.b.score = 288 - parTotal + lowestScore + 1
      contenders.b.total = lowestScore + 1

      state.pairings.unshift(contenders)

      state.emerge = 1

    }
  }
  
  export const actions = {
    resetGame ({ commit }) {
      commit('RESET_GAME')
    },
    getField ({ commit }, field) {
      commit('GET_FIELD', field)
    },
    getPairings ({ commit }, { pairs, scores }) {
      commit('GET_PAIRINGS', { pairs, scores })
    },
    updateTournamentScoring ({ commit }, score) {
      commit('UPDATE_TOURNAMENT_SCORING', score)
    },
    updateScore ({commit }, { id, score }) {
      commit('UPDATE_SCORE', { id, score })
    },
    setEvent ({ commit }, { event, course }) {
      commit('SET_EVENT', { event, course})
    },
    convertScores ({ commit }) {
      commit('CONVERT_SCORES')
    },
    setupLeaderboard ({ commit }, { par, pairs }) {
      commit('SETUP_LEADERBOARD', { par, pairs })
    },
    addScore ({ commit }, { score, letter, today, coursePar, pairs }) {
      commit('ADD_SCORE', { score, letter, today, coursePar, pairs })
    },
    nextHole ({ commit }) {
      commit('NEXT_HOLE')
    },
    prevHole ({ commit }) {
      commit('PREV_HOLE')
    },
    sortField ({ commit }) {
      commit('SORT_FIELD')
    },
    rankField ({ commit }) {
      commit('RANK_FIELD')
    },
    addFinish ({ commit }) {
      commit('ADD_FINISH')
    },
    addTies ({ commit }) {
      commit('ADD_TIES')
    },
    setTotalStrokes ({ commit }) {
      commit('SET_TOTAL_STROKES')
    },
    setEmergingContenders ({ commit }, { contenders, parTotal }) {
      commit('SET_EMERGING_CONTENDERS', { contenders, parTotal })
    }
  }