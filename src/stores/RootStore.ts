import { configure } from 'mobx'
import GoalStore from './GoalStore'
import UserStore from './UserStore'
import { createContext } from 'react'
import UtilityStore from './UtilityStore'

configure({ enforceActions: 'always' })

export class RootStore {
  goalStore: GoalStore
  userStore: UserStore
  utilityStore: UtilityStore

  constructor() {
    this.goalStore = new GoalStore(this)
    this.userStore = new UserStore(this)
    this.utilityStore = new UtilityStore(this)
  }
}

export const RootStoreContext = createContext(new RootStore())
