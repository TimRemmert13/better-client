import React from 'react'
import { Alert } from '@material-ui/lab'
import { Paper } from '@material-ui/core'

const Unauthorized = () => {
  return (
    <Paper style={{ padding: 10 }}>
      <Alert severity="error">You are not authorized to view this page</Alert>
    </Paper>
  )
}

export default Unauthorized
