import axios from 'axios';
import promise from 'redux-promise';

export function fetch(endpoint, params) {
  return {
    type: endpoint,
    payload: axios.get("http://rest.learncode.academy/api/wstern/"+endpoint.toLowerCase())
  }
}

export function save(endpoint, params) {
  return {
    type: endpoint,
    payload: axios.post("http://rest.learncode.academy/api/wstern/"+endpoint.toLowerCase())
  }
}

export function remove(endpoint, params) {
  return {
    type: endpoint,
    payload: axios.get("http://rest.learncode.academy/api/wstern/"+endpoint.toLowerCase())
  }
}
