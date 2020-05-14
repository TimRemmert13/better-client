import { RootStore } from './RootStore'
import { observable, action } from 'mobx'
import { createContext } from 'react'

export default class CommonStore {
  // rootStore: RootStore
  // constructor(rootStrore: RootStore) {
  //   this.rootStore = rootStrore
  // }

  @observable currentTab = 0

  @observable open = false

  @observable anchorEl: Element | null = null

  @action setAnchorEl = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.anchorEl = event.currentTarget
  }

  @action closeAnchorEl = () => {
    this.anchorEl = null
  }

  @action setOpen = () => {
    this.open = !this.open
  }

  @action handleTabChange = (
    event: React.ChangeEvent<{}>,
    newTabIndex: number
  ) => {
    this.currentTab = newTabIndex
  }
}

export const CommonStoreContext = createContext(new CommonStore())
