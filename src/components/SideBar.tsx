import React from 'react'
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  makeStyles,
  createStyles,
  Theme,
  Paper,
} from '@material-ui/core'

import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import DoneIcon from '@material-ui/icons/Done'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingLeft: 20,
    },
    title: {
      padding: 10,
    },
  })
)

const SideBar = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Paper elevation={3}>
        <Typography variant="h6" align="center" className={classes.title}>
          My Goals
        </Typography>
        <Divider />
        <List>
          {['Goal 1', 'Goal 2', 'Goal 3', 'Goal 4'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <TrendingUpIcon /> : <DoneIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default SideBar
