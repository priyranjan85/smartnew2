import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { Box, Stack } from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import StorageIcon from '@mui/icons-material/Storage'
import CloseIcon from '@mui/icons-material/Close'

const Setting = ({ isAuthenticated, mute, setMute }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  console.log('isAuthenticated:', isAuthenticated)
  // State Values
  const [open, setOpen] = React.useState(false)

  // Open Modal Action
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
      background: 'rgba(255, 255, 255, 0.7)',
    },
  }))

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    )
  }

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  }

  return (
    <Fragment>
      <Stack direction="row" justifyContent={isDesktop ? 'flex-end' : 'center'}>
        <Box mt={2}>
          {/* Open Rule Modal */}
          <IconButton
            onClick={handleClickOpen}
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', mr: 3 }}
          >
            <StorageIcon />
          </IconButton>

          {/* Mute Audio */}
          <IconButton
            onClick={ () => setMute }
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          >
            {!mute ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
        </Box>
      </Stack>

      {/* Dialog */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ width: isDesktop ? '450px' : '350px', margin: 'auto', marginTop: isDesktop ? '' : '100px' }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Rules
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Start by setting your Bet Amount. You can set Win Chance, Prediction
            Number and Multiplier by using the slider.
          </Typography>
          <Typography gutterBottom>
            You can also adjust parameters manually by changing input values.
            After you are ALL set, place your bet and swipe the MONEYBUTTON to
            start the game.
          </Typography>
          <Typography gutterBottom>
            Roll starts and “one” number will be drawn from 0 to 9999. You win
            if the roll outcome is within the chosen area.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            onClick={handleClose}
            sx={{ borderRadius: '20px' }}
          >
            play now
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  )
}

Setting.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Setting)
