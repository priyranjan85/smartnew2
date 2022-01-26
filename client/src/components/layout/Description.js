import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Grid, Typography } from '@mui/material'

const Landing = ({ isAuthenticated }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontFamily: 'Helvetica',
            fontSize: '34px',
            fontWeight: 'bold',
          
            textAlign: 'left'}}
        >
          Transparent
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Helvetica',
          
            textAlign: 'left'}}
        >
          All transactions are recorded on the blockchain
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontFamily: 'Helvetica',
            fontSize: '34px',
            fontWeight: 'bold',
          
            textAlign: 'left'}}
        >
          Anonymous
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Helvetica',
          
            textAlign: 'left'}}
        >
          No user data is stored, each player is recognised  only by their wallet
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontFamily: 'Helvetica',
            fontSize: '34px',
            fontWeight: 'bold',
          
            textAlign: 'left'}}
        >
          Provably Fair
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Helvetica',
          
            textAlign: 'left'}}
        >
          Gameplay is governed by Smart Contract which  is uploaded onto the Binance Smart Chain and is publicly verifiable
        </Typography>
      </Grid>
    </Grid>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Landing)
