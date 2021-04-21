import VueCookies from 'vue-cookies'
import axios from 'axios'
import { useState } from "../store/store";


const BACKEND_URL = require('../../config.json').backendURL
// const BACKEND_URL = process.env.MY_BACKEND_URL

// const ACCESS_TOKEN = VueCookies.get('access-token')

let state = useState()

let ACCESS_TOKEN;
const URL_PARAMS =  new URLSearchParams(window.location.search);


const requestOptions = {
  headers: {
    Authorization: state?.user?.isLoggedIn()?window.user.data:URL_PARAMS.get("token"),
    'Content-Type': 'application/json',
  }
}

export function setAccessToken(token){
  ACCESS_TOKEN=token
}

/**
 * @param {*} pathName without preceeding /
 */
export async function getBackendRequest(pathName) {
  return axios.get(BACKEND_URL + pathName, requestOptions).then(function (response) {
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

  return axios.post(BACKEND_URL + pathName, postParam, requestOptions).then(function (response) {
    return response.data
  }).catch(function (error) {
    console.error(error)
    return error
  })
}

export async function putBackendRequest(pathName, putParam){
  return axios.put(BACKEND_URL + pathName, putParam, requestOptions).then(function(response){
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
