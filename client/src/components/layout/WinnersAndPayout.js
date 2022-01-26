import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Grid,
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

import { getTopWinners, getTotalPayout } from '../../actions/game'

const Landing = ({ isAuthenticated, top_winners, total_payout, getTopWinners, getTotalPayout }) => {
  useEffect(() => {
    getTopWinners()

    getTotalPayout()
  }, [getTopWinners, getTotalPayout])

  console.log('landing: tPayout, tWnners', total_payout, top_winners)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              fontFamily: 'Helvetica',
            }}
          >
            24H Top Winners
          </Typography>
          <TableContainer>
            <Table
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none',
                },
              }}
            >
              <TableBody>
                {top_winners && top_winners.map(t => (
                  <TableRow style={{ height: '10px' }}>
                    <TableCell
                      align="center"
                      sx={{ color: '#fff', height: 'auto !important', fontSize: '18px', }}
                    >
                      {String(t.address).substring(0, 6) +
                      '...' +
                      String(t.address).substring(38)}
                    </TableCell>
                    <TableCell sx={{ color: '#fff', fontSize: '18px', }}>{t.payout.toFixed(4)} BNB</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              fontFamily: 'Helvetica',
            }}
          >
            Total Payout
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              mt: 1,
              fontFamily: 'Helvetica',
            }}
          >
            {total_payout.toFixed(4)} BNB
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  top_winners: state.game.top_winners,
  total_payout: state.game.total_payout,
  game: state.game
})

export default connect(mapStateToProps, { getTopWinners, getTotalPayout })(Landing)
