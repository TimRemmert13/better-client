import { IUser } from '../models/domain/User'
import { RootStore } from './RootStore'
import { observable, computed } from 'mobx'

export default class UserStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @observable user: IUser | null = null

  @computed get isLoggedIn(): boolean {
    return !!this.user
  }
}
