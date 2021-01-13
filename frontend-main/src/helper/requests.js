import VueCookies from 'vue-cookies'
const axios = require('axios')

const backendURL = require('../../config.json').backendURL
const AccessToken = VueCookies.get('access-token')

const requestOptions = {
  headers: {
    Authorization: AccessToken
  }
}

/**
 *
 * @param {*} pathName Without preceeding /
 */
export async function getBackendRequest (pathName) {
  axios.get(backendURL + '/' + pathName, requestOptions).then(function (response) {
    // state.user = response.data
    return response.data
  }).catch(function (error) {
    if (error?.response.status === 401) {
      console.log('Not Logged In!')
      // router.push('/login')
    } else {
      throw error
    }
  })
}
