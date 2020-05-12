import { RootStore } from './RootStore'
import { observable, action, runInAction } from 'mobx'
import { IGoal } from '../models/domain/Goal'

export default class GoalStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.goal = null
  }

  @observable goal: IGoal | null

  @action setGoal = (goal: IGoal | null) => {
    this.goal = goal
  }
}
