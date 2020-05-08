import React from 'react'
import { AppBar, Tabs, Typography, Tab } from '@material-ui/core'

const NavBar = () => (
  <AppBar position="static">
    <Typography variant="h5">Better</Typography>
    <Tabs value="value">
      <Tab label="dashboard" />
      <Tab label="schedule" />
      <Tab label="Goals" />
    </Tabs>
  </AppBar>
)

export default NavBar
