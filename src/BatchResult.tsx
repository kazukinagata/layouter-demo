import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Box from '@material-ui/core/Box'
import { TransitionProps } from '@material-ui/core/transitions'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
)

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

type Props = {
  data: { [clientId: string]: string[] }
  onClose: () => void
  src: any
}
export default function ({ data, onClose, src }: Props) {
  const classes = useStyles()
  const open = !!Object.keys(data).length
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Batch result
          </Typography>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mb={2}>
          <h2>Contents</h2>
          <div>{JSON.stringify(src)}</div>
        </Box>
        <Box mb={2}>
          <h2>Results</h2>
          <Grid container>
            {Object.keys(data).map((clientId, i) => (
              <Grid item md={3}>
                <p style={{ marginBottom: '1em' }}>Client id: {clientId}</p>
                {data[clientId].map((url) => (
                  <Box>
                    <img src={url} alt='' style={{ width: '100%' }} />
                  </Box>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Dialog>
  )
}
