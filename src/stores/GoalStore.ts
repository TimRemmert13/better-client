import { RootStore } from './RootStore'
import { observable } from 'mobx'
import { IGoal } from '../models/domain/Goal'

export default class GoalStore {
  rootStore: RootStore
  constructor(rootStrore: RootStore) {
    this.rootStore = rootStrore
  }

  @observable goal: IGoal | null = null
  @observable goalMap = new Map()
}
