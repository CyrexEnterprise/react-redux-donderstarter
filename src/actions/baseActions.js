import axios from 'axios';

export function fetch(endpoint) {
  return {
    type: endpoint,
    payload: axios.get("http://dummydata.cloudoki.com/"+endpoint.toLowerCase())
  };
}

export function save(endpoint) {
  return {
    type: endpoint,
    payload: axios.post("http://dummydata.cloudoki.com/"+endpoint.toLowerCase())
  };
}

export function remove(endpoint) {
  return {
    type: endpoint,
    payload: axios.get("http://dummydata.cloudoki.com/"+endpoint.toLowerCase())
  };
}
