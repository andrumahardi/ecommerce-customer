import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const serverUrl = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    username: '',
    email: '',
    password: '',
    loginStatus: false
  },
  mutations: {
    setUsername (state, value) {
      state.username = value
    },
    setEmail (state, value) {
      state.email = value
    },
    setPassword (state, value) {
      state.password = value
    },
    setLoginStatus (state, value) {
      state.loginStatus = value
    },
    setProducts (state, value) {
      state.products = value
    },
    setCategories (state, value) {
      state.categories = value
    },
    clearAll (state) {
      state.username = ''
      state.email = ''
      state.password = ''
      state.loginStatus = false
    }
  },
  actions: {
    registerAsync ({ state }) {
      return axios({
        method: 'POST',
        url: `${serverUrl}/customer/register`,
        data: {
          username: state.username,
          email: state.email,
          password: state.password
        }
      })
    },
    loginAsync ({ state }) {
      return axios({
        method: 'POST',
        url: `${serverUrl}/customer/login`,
        data: {
          email: state.email,
          password: state.password
        }
      })
    },
    fetchProductsAsync ({ state, commit }) {
      axios({
        method: 'GET',
        url: `${serverUrl}/products`
      })
        .then((result) => {
          commit('setProducts', result.data.products)
          return axios({
            method: 'GET',
            url: `${serverUrl}/category`
          })
        })
        .then((result) => {
          commit('setCategories', result.data.data)
        })
        .catch((err) => console.log(err))
    },
    getProductAsync ({ state }, categoryId) {
      return axios({
        method: 'GET',
        url: `${serverUrl}/product/${categoryId}`
      })
    },
    checkoutAsync ({ state }, { token, itemId }) {
      console.log(token, itemId)
    }
  }
})