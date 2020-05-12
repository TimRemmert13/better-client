import { configure } from 'mobx'
import GoalStore from './GoalStore'
import UserStore from './UserStore'
import { createContext } from 'react'
import UtilityStore from './UtilityStore'
import CommonStore from './CommonStore'

configure({ enforceActions: 'always' })

export class RootStore {
  goalStore: GoalStore
  //userStore: UserStore
  utilityStore: UtilityStore
  //commonStore: CommonStore

  constructor() {
    this.goalStore = new GoalStore(this)
    //this.userStore = new UserStore(this)
    this.utilityStore = new UtilityStore(this)
    //this.commonStore = new CommonStore(this)
  }
}

export const RootStoreContext = createContext(new RootStore())
