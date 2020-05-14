import React, { useContext } from 'react'
import SideBar from '../components/SideBar'
import {
  makeStyles,
  Theme,
  createStyles,
  CssBaseline,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core'
import { UserStoreContext } from '../stores/UserStore'
import moment from 'moment'
import Unauthorized from './Unauthorized'
import TopBar, { drawerWidth } from '../components/TopBar'
import { grey } from '@material-ui/core/colors'

const Dashboard = () => {
  const { user } = useContext(UserStoreContext)
  // if (user == null) {
  //   return <Unauthorized />
  // }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
    })
  )
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      <SideBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container alignItems="flex-end" spacing={3}>
          <Grid item>
            <Typography variant="h6">Welcome User</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {moment().format('MMMM Do YYYY')}
            </Typography>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}
export default Dashboard
