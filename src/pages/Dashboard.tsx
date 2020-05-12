import React from 'react'
import TabBar from '../components/TabBar'
import SideBar from '../components/SideBar'
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core'

const Dashboard = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      sideBar: {
        padding: 10,
      },
    })
  )
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TabBar />
        </Grid>
        <Grid item xs={3}>
          <SideBar />
        </Grid>
        <Grid item xs={9}>
          <h1>This is the Dashboard</h1>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
