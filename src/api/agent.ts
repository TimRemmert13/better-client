import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { history } from '../'
import { request } from 'http'
import { IGoal } from '../models/domain/Goal'
import { IUser } from '../models/domain/User'
import { ICreateGoalDto, IEditGoalDto } from '../models/dtos/GoalDtos'
import { ISignUpDto, ILoginDto, IVerifyDto } from '../models/dtos/UserDtos'

const BASE_URL = 'https://fl1ikq34hh.execute-api.us-east-1.amazonaws.com/dev'

axios.defaults.baseURL = BASE_URL

// inject id token for each request made in axios as Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('jwt')
    if (token) config.headers.Authorization = token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// handle errors returned from the server
axios.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network error - make sure the API server is running')
  }
  const { status, data, config } = error.response
  if (status === 404) {
    history.push('/notfound')
  }
  if (status === 400 && config.method === 'get') {
    history.push('/notfound')
  }
  if (status === 500) {
    toast.error('Server error please check the terminal for details')
  }
  throw error.response
})

const responseBody = (response: AxiosResponse) => response.data

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Goals = {
  list: (): Promise<IGoal[]> => requests.get('/goals'),
  get: (id: string) => requests.get(`/goals/${id}`),
  create: (goalDto: ICreateGoalDto) => requests.post('/goals', goalDto),
  edit: (id: string, goalDto: IEditGoalDto) =>
    requests.post(`/goals/${id}`, goalDto),
  delete: (id: string) => requests.delete(`/goals/${id}`),
}

const User = {
  signup: (signupDto: ISignUpDto) => requests.post('/users', signupDto),
  login: (loginDto: ILoginDto) => requests.post('/users/login', loginDto),
  logout: (token: string) => requests.post('/users/logout', token),
  verfify: (verifyDto: IVerifyDto) => requests.post('/users/verify', verifyDto),
  delete: (token: string) => requests.delete(`/users/${token}`),
}

export default {
  Goals,
  User,
}
