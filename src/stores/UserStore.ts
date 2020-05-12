import { IUser } from '../models/domain/User'
import { RootStore } from './RootStore'
import { observable, computed, action, runInAction } from 'mobx'
import { createContext } from 'react'
import { ILoginDto } from '../models/dtos/UserDtos'
import agent from '../api/agent'
//import jwt from 'jsonwebtoken'

export default class UserStore {
  @observable user: IUser | null = null

  @computed get isLoggedIn(): boolean {
    return !!this.user
  }

  @action login = async (values: ILoginDto) => {
    try {
      const response = await agent.User.login(values)
      console.log(response)
      runInAction(() => {
        //jwt.verify(response.id_token)
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const UserStoreContext = createContext(new UserStore())
