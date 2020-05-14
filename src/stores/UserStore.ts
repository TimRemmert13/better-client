import { IUser } from '../models/domain/User'
import { RootStore } from './RootStore'
import { observable, computed, action, runInAction } from 'mobx'
import { createContext } from 'react'
import { ILoginDto } from '../models/dtos/UserDtos'
import agent from '../api/agent'
import jwtDecoder from 'jwt-decode'
import { history } from '../'

type TokenPayload = {
  sub: string
  email_verified: boolean
  name: string
  'cognito:username': string
  email: string
}
export default class UserStore {
  @observable user: IUser | null = null

  @observable displayError: boolean = false

  @computed get isLoggedIn(): boolean {
    return !!this.user
  }

  @action login = async (values: ILoginDto) => {
    try {
      const response = await agent.User.login(values)
      const payload: TokenPayload = jwtDecoder(response.id_token)
      const tempuser: IUser = {
        email: payload.email,
        emailVerified: payload.email_verified,
        id: payload.sub,
        username: payload['cognito:username'],
      }
      runInAction(() => {
        this.user = tempuser
      })
      history.push('/dashboard')
    } catch (error) {
      if (error.data.includes('400')) {
        runInAction(() => {
          this.displayError = true
        })
      } else {
        throw error
      }
    }
  }
}

export const UserStoreContext = createContext(new UserStore())
