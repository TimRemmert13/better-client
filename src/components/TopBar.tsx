import React, { useContext } from 'react'
import {
  AppBar,
  Typography,
  Toolbar,
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Grid,
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'
import clsx from 'clsx'

import MenuIcon from '@material-ui/icons/Menu'
import { CommonStoreContext } from '../stores/CommonStore'
import { observer } from 'mobx-react-lite'
import Logo from '../../public/assets/logo.svg'

export const drawerWidth = 240

const TopBar = () => {
  const commonStore = useContext(CommonStoreContext)
  const { open, setOpen, anchorEl, setAnchorEl, closeAnchorEl } = commonStore
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: grey[900],
        color: grey[50],
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      hide: {
        display: 'none',
      },
    })
  )
  const classes = useStyles()
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
      color="default"
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={setOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Grid container direction="row" alignItems="center" spacing={3}>
          <Grid item>
            <img width="55px" height="55px" src={Logo} />
          </Grid>
          <Grid item>
            <Typography variant="h6" noWrap>
              Get Better.
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-end" spacing={3}>
          <Grid item>
            <IconButton onClick={setAnchorEl}>
              <Avatar></Avatar>
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeAnchorEl}
            >
              <MenuItem onClick={closeAnchorEl}>Logout</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default observer(TopBar)
