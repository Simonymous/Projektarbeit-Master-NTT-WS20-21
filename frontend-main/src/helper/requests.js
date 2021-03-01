import VueCookies from 'vue-cookies'
import axios from 'axios'

// TODO: Schauen ob funktioniert
const BACKEND_URL = require('../../config.json').backendURL
// const BACKEND_URL = process.env.MY_BACKEND_URL

const ACCESS_TOKEN = VueCookies.get('access-token')

const requestOptions = {
  headers: {
    Authorization: ACCESS_TOKEN,
    'Content-Type': 'application/json',
  }
}

/**
 * @param {*} pathName without preceeding /
 */
export async function getBackendRequest(pathName) {
  return axios.get(BACKEND_URL + pathName, requestOptions).then(function (response) {
    console.log(response.data)
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

/**
 * @param {*} pathName without preceeding /
 */
export async function postBackendRequest(pathName, postParam) {
  try{
    let {_id, ...rest} = postParam;
    postParam = rest;
  }catch(e){console.log("_id not removed",e)}

  axios.post(BACKEND_URL + pathName, postParam, requestOptions).then(function (response) {
    return response.data
  }).catch(function (error) {
    console.error(error)
    return error
  })
}

export async function putBackendRequest(pathName, putParam){
  axios.put(BACKEND_URL + pathName, putParam, requestOptions).then(function(response){
    return response.data
  }).catch(function(error){
    return error
  })
}

export async function deleteBackendRequest(pathName){
  axios.delete(BACKEND_URL + pathName, requestOptions).then(function(response){
    return response.data
  }).catch(function(error){
    return error
  })
}
