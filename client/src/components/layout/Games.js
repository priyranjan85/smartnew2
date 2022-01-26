import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Typography, Stack, Button } from '@mui/material'
import { Container, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

const Landing = ({ isAuthenticated }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  return (
    <Container maxWidth="lg">
      <Stack spacing={3} sx={{ width: '100%' }}>
        <Typography
          sx={{
            fontFamily: 'Helvetica',
            fontSize: '34px',
            fontWeight: 'bold',
            width: '100%',
          }}
        >
          Games
        </Typography>
        <Stack
          direction="row"
          justifyContent={isDesktop ? 'space-between' : 'center'}
          alignItems="bottom"
          flexWrap="wrap"
        >
          <Stack spacing={1} sx={{ m: 1 }}>
            <img
              src="/assets/coin-flip-white.png"
              alt="smart-game"
              style={{
                height: '150px',
                width: '80%',
                justifyContent: 'center',
              }}
            />
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
              }}
            >
              Smart Coin Flip
            </Typography>
            <Button
              size="small"
              href="/flip"
              sx={{
                padding: 0,
                backgroundColor: '#F4ADAB',
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
                fontColor: '#B52F1B',
                mb: 10,
              }}
            >
              {' '}
              Play Now{' '}
            </Button>
          </Stack>
          <Stack spacing={1} sx={{ m: 1 }}>
            <img
              src="/assets/dice.png"
              alt="smart-game"
              style={{ height: '150px' }}
            />
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
              }}
            >
              Smart Dice
            </Typography>
            <Button
              size="small"
              href="/dice"
              sx={{
                padding: 0,
                backgroundColor: '#F4ADAB',
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
                fontColor: '#B52F1B',
                marginBottom: 10,
              }}
            >
              {' '}
              Play Now{' '}
            </Button>
          </Stack>
          <Stack spacing={1} sx={{ m: 1 }}>
            <img
              src="/assets/raffle.png"
              alt="smart-game"
              style={{ height: '150px' }}
            />
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
              }}
            >
              Smart Raffle
            </Typography>
            <Button
              size="small"
              sx={{
                padding: 0,
                backgroundColor: '#F4ADAB',
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
                fontColor: '#B52F1B',
                marginBottom: 10,
              }}
            >
              {' '}
              Coming Soon{' '}
            </Button>
          </Stack>
          <Stack spacing={1} sx={{ m: 1 }}>
            <img
              src="/assets/two-dice.png"
              alt="smart-game"
              style={{ height: '150px' }}
            />
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
              }}
            >
              Smart Two Dice
            </Typography>
            <Button
              size="small"
              sx={{
                padding: 0,
                backgroundColor: '#F4ADAB',
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
                fontColor: '#B52F1B',
                marginBottom: 10,
              }}
            >
              {' '}
              Coming Soon{' '}
            </Button>
          </Stack>
          <Stack spacing={1} sx={{ m: 1 }}>
            <img
              src="/assets/roll.png"
              alt="smart-game"
              style={{ height: '150px' }}
            />
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
              }}
            >
              Smart Roll
            </Typography>
            <Button
              size="small"
              sx={{
                padding: 0,
                backgroundColor: '#F4ADAB',
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
                fontColor: '#B52F1B',
                '&hover': { backgroundColor: '#000', color: '#fff' },
                marginBottom: 10,
              }}
            >
              {' '}
              Coming Soon{' '}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Landing)
