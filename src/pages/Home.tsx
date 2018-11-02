import * as React from 'react'
import { Theme, withStyles, StyleRulesCallback } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'

const styles: StyleRulesCallback = (theme: Theme) => ({})

export default withStyles(styles)(({ classes }) => (
  <div>
    <h2>Hello</h2>
    <p>How are ya?</p>
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