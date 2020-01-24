import Golfers from '../static/golfers.json'
import Countries from '../static/countries.json'

const getDefaultState = () => {
  return {
    players: Golfers,
    countries: Countries    
  }
}

export const state = () => getDefaultState()

export const mutations = {
  RESET_GOLFERS: state => {
    confirm('Are you sure you want to reset all golfers to default (This cannot be undone!)?') && Object.assign(state, getDefaultState()) && window.location.reload()
  },
  ADD_GOLFER: (state, golfer) => {
    const idMap = state.players.map(player => player.id)
    while (idMap.includes(golfer.id)) {
      golfer.id++
    }
    state.players.push(golfer)
  },
  EDIT_GOLFER: (state, { golfer, edited }) => {
    Object.assign(state.players[edited], golfer)
  },
  DELETE_GOLFER: (state, id) => {
    const deletedGolfer = state.players.find(player => player.id === id)
    const index = state.players.indexOf(deletedGolfer)
    confirm('Are you sure you want to delete this golfer?') && state.players.splice(index, 1)
  },
  ADD_ROSTER: (state, roster) => {
    state.players.splice(0, state.players.length, ...roster)
  }
  
}

export const actions = {
  resetGolfers ({ commit }) {
    commit('RESET_GOLFERS')
  },
  addGolfer ({ commit }, golfer) {
    commit('ADD_GOLFER', golfer)
  },
  editGolfer ({commit}, { golfer, edited }) {
    commit('EDIT_GOLFER', { golfer, edited })
  },
  deleteGolfer ({ commit }, id) {
    commit('DELETE_GOLFER', id)
  },
  addRoster ({ commit }, roster) {
    commit('ADD_ROSTER', roster)
  }
}