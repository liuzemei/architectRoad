import axios, { AxiosResponse } from 'axios'

const baseURL = 'http://localhost:8080'

// 它指的是服务器返回的对象
interface User {
  name: string,
  password: string
}

let user: User = {
  name: 'zhufeng',
  password: '123456'
}


// axios.create({
//   baseURL,
//   url:
// })

axios({
  baseURL,
  url: '/get',
  method: 'get',
  params: user
}).then((response: AxiosResponse) => {
  console.log(response)
  return response.data
}).catch((err: any) => {
  console.log(err)
})




