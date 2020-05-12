import React, { useContext } from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'
//import { RootStoreContext } from '../stores/RootStore'
import { observer } from 'mobx-react-lite'
import { CommonStoreContext } from '../stores/CommonStore'

const TabBar = () => {
  const commonStore = useContext(CommonStoreContext)
  const { currentTab, handleTabChange } = commonStore

  return (
    <Paper>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Dashboard" />
        <Tab label="Schedule" />
        <Tab label="Details" />
      </Tabs>
    </Paper>
  )
}

const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
  console.log(newValue)
  console.log(event)
}

export default observer(TabBar)
