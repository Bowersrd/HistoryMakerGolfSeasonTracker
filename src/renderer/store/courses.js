import CourseList from '../static/courses.json'

const getDefaultState = () => {
    return {
      courses: CourseList    
    }
  }
  
  export const state = () => getDefaultState()
  
  export const mutations = {
    RESET_COURSES: state => {
      confirm('Are you sure you want to reset all courses to default (This cannot be undone!)?') && Object.assign(state, getDefaultState()) && window.location.reload()
    },
    ADD_COURSE: (state, course) => {
      const usedId = state.courses.map(course => course.courseId)
      if (usedId.includes(state.courses.length)) {
        course.courseId = state.courses.length + 1
      } else {
        course.courseId = state.courses.length
      }
      state.courses.push(course)
    },
    EDIT_COURSE: (state, { course, edited }) => {
      Object.assign(state.courses[edited], course)
    },
    DELETE_COURSE: (state, id) => {
      const deletedCourse = state.courses.find(course => course.courseId === id)
      const index = state.courses.indexOf(deletedCourse)
      confirm('Are you sure you want to delete this course?') && state.courses.splice(index, 1)
    }
  }
  
  export const actions = {
    resetCourses ({ commit }) {
      commit('RESET_COURSES')
    },
    addCourse ({ commit }, course) {
      commit('ADD_COURSE', course)
    },
    editCourse ({ commit }, { course, edited }) {
      commit('EDIT_COURSE', { course, edited })
    },
    deleteCourse({ commit }, id) {
      commit('DELETE_COURSE', id)
    }
  }