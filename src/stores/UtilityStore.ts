import { RootStore } from './RootStore'
import { reaction, observable, action } from 'mobx'

export default class UtilityStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    reaction(
      () => this.idToken,
      (idToken) => {
        if (idToken) {
          window.localStorage.setItem('id_token', idToken)
        } else {
          window.localStorage.removeItem('id_token')
        }
      }
    )

    reaction(
      () => this.accessToken,
      (accessToken) => {
        if (accessToken) {
          window.localStorage.setItem('id_token', accessToken)
        } else {
          window.localStorage.removeItem('id_token')
        }
      }
    )
  }

  @observable idToken: string | null = window.localStorage.getItem('id_token')
  @observable accessToken: string | null = window.localStorage.getItem(
    'access_token'
  )
  @observable appLoaded: boolean = false

  @action setTokens = (idToken: string, accessToken: string) => {
    this.idToken = idToken
    this.accessToken = accessToken
  }

  @action setAppLoaded = () => {
    this.appLoaded = true
  }
}
