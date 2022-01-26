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
      // background: '-webkit-linear-gradient(-90deg, #ffda6f 30%, #e2a139 90%)',
      background: 'rgba(255, 255, 255, 0.7)'
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
        <Box mt={3}>
          {/* Open Rule Modal */}
          <IconButton
            onClick={handleClickOpen}
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', mr: 3 }}
          >
            <StorageIcon />
          </IconButton>

          {/* Mute Audio */}
          <IconButton
            onClick={() => setMute(!mute)}
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
            Start by setting your Bet Amount.
          </Typography>
          <Typography gutterBottom>
            Then proceed to choose either Heads or Tails
          </Typography>
          <Typography gutterBottom>
            Lastly to confirm bet click on the Bet button.
          </Typography>
          <Typography gutterBottom>
            Your bet is accepted and we send a request to an offchain oracle to generate randomness and then the results will be displayed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            onClick={handleClose}
            sx={{ borderRadius: '20px', fontFamily: 'Helvetica' }}
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
