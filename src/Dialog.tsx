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
  data: ArrayBuffer[]
  onClose: () => void
}
export default function ({ data, onClose }: Props) {
  const classes = useStyles()
  const open = !!data.length
  const handleClose = () => {
    onClose()
  }

  const srcs = data.map((ab) => {
    const bytes = new Uint8Array(ab)
    let binaryData = ''
    for (var i = 0, len = bytes.byteLength; i < len; i++) {
      binaryData += String.fromCharCode(bytes[i])
    }
    return 'data:image/jpeg;base64,' + window.btoa(binaryData)
  })

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
            PNG
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
        {srcs.map((src, i) => (
          <Box display='flex' justify-content='center' key={i}>
            <img src={src} />
          </Box>
        ))}
      </Container>
    </Dialog>
  )
}
