import axios from "axios"
axios.defaults.baseURL="http://localhost:8181/api"
const config={
    headers:{
        "Content-type":"Application/json"
    }
}
const handleResponse = (res) => {
  if(res.data){
    console.log(res.data.message)
    if(res.data.httpStatusCode==200){
      return res.data.data
    }
    else{
      return []
    }
  }
  return []
};

const request = {
  get: (url) => axios.get(url).then(handleResponse).catch(err=>console.log(err)),
  post: (url, data) => axios.post(url, data, config).then(handleResponse),
  put: (url, data) => axios.put(url, data, config).then(handleResponse),
  delete: (url) => axios.delete(url).then(handleResponse),
};

export default request;