import * as React from 'react'
import { Theme, withStyles, StyleRulesCallback } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'

const styles: StyleRulesCallback = (theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'calc(100vh - 145px)',
    backgroundColor: theme.palette.primary.light,
    textAlign: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 32.6,
    maxWidth: 570,
    opacity: 0.7,
    lineHeight: '24px',
    fontSize: 14,
    fontWeight: 'normal',
  }
})

export default withStyles(styles)(({ classes }) => (
  <div className={classes.wrapper}>
    <h2 className={classes.title}>Hello</h2>
    <p className={classes.description}>How are ya?</p>
    <Button
      classes={{ root: 'marginTop25' }}
      variant='raised'
      color='primary'
      size='large'
    >
      Sign Up
    </Button>
  </div>
))