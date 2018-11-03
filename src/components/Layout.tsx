import * as React from 'react'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core'
import { TopBar } from './TopBar'

const styles: StyleRulesCallback = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    paddingTop: 64,
  },
})

interface Props extends WithStyles<typeof styles> {
  children: React.Component | React.SFC | any // drizzleConnect not typed
}

export const Layout = withStyles(styles)<Props>(({ classes, children }) => (
  <div className={classes.root}>
    <TopBar />
    <main className={classes.content}>{children}</main>
  </div>
))
