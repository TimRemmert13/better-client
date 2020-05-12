import React from 'react'
import {
  AppBar,
  Typography,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
  Grid,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import zIndex from '@material-ui/core/styles/zIndex'

const NavBar = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
    })
  )
  const classes = useStyles()
  return (
    <AppBar position="static" style={{ margin: 0 }} className={classes.appBar}>
      <Toolbar>
        <Typography variant="h4" color="inherit">
          Better
        </Typography>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Avatar />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Username</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
