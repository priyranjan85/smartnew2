import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../../actions/auth'

import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  Container,
} from '@mui/material'
import { withStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import CasinoIcon from '@mui/icons-material/Casino'
import Settings from './Settings'
import { makeStyles, useMediaQuery } from '@material-ui/core'

import {
  connectWallet,
  getCurrentWalletConnected,
  getWeb3,
  getContract
} from '../../../utils/interact.js'

import WinLoseModal from './WinLoseModal'
// import { config } from '../../../utils/config.js'
import { saveWinnerData } from '../../../actions/game'

import win_effect from '../../../static/coinflip_win.wav'
import lose_effect from '../../../static/coinflip_lose.wav'
import space_effect from '../../../static/coinflip_space.wav'

const Win = new Audio(win_effect)
const Lose = new Audio(lose_effect)
const Space = new Audio(space_effect)

const Flip = ({ isAuthenticated, login, saveWinnerData }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const Tx = require("ethereumjs-tx").Transaction
  const Common = require('ethereumjs-common').default
  const BSC_FORK = Common.forCustomChain(
    'mainnet',
    {
      name: 'Binance Smart Chain Test Net',
      networkId: 56,
      chainId: 56,
      url: process.env.REACT_APP_BSC_MAIN
    },
    'istanbul',
  );

  //State variables
  const [walletAddress, setWallet] = useState('')
  const [selected, setSelected] = useState('HEADS')
  const [betType, setBetType] = useState('HEADS')
  const [betAmount, setBetAmount] = useState(0.02)
  const [isWin, setIsWin] = useState(0)
  const [open, setOpen] = React.useState(false)
  const [mute, setMute] = useState(false)

  // For smart contract
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [chainId, setChainId] = useState(undefined);
  console.log(chainId)

  useEffect(() => {
    async function fetchData() {
      // Connect Smart Contact
      const web3 = await getWeb3()
      const contract = await getContract()

      // Connect Wallet
      const { address } = await getCurrentWalletConnected()
      
      // Get Chain ID
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      // handleChainChanged(chainId);
      console.log(chainId)
      setChainId(chainId)

      // Set states
      setWeb3(web3)
      setContract(contract)
      setWallet(address)
    }
    fetchData()
  }, [])

  // Get nonce for sendSignedTransaction()
  const getNonce = async () => {
    return await web3.eth.getTransactionCount(process.env.REACT_APP_OWNER)
  }

  // Save Current Data
  const saveCurrentData = () => {
    const data = {
      address: walletAddress,
      payout: betAmount * 1.8 * 0.98
    }

    console.log(data)

    saveWinnerData(data)
  }

  // Connect Wallet
  const connectWalletPressed = async () => {
    //TODO: implement
    const walletResponse = await connectWallet()
    setWallet(walletResponse.address)

    addWalletListener()

    if (walletResponse.success) {
      login(walletResponse.address)
    }
  }
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0])
        } else {
          setWallet('')
        }
      })
    } else {
    }
  }

  // Set Heads or Tails
  const headsSelected = () => {
    setSelected('HEADS')
  }
  const tailsSelected = () => {
    setSelected('TAILS')
  }

  // Set Bet Amount
  const handleChange = (event) => {
    if (event.target.value > 1) {
      alert("Max bet amount is 1 BNB!")
      setBetAmount(1)
    }
    setBetAmount(event.target.value)
  }

  // Set Bet Min Value
  const setMinValue = () => {
    setBetAmount(0.02)
  }
  const MinButton = () => (
    <Button
      onClick={setMinValue}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        ml: 3,
      }}
    >
      Min
    </Button>
  )

  // Custom color For Heads and Tails
  const HeadColor = withStyles({
    root: {
      fontSize: '20px !important',
      textAlign: 'center',
      background:
        '-webkit-linear-gradient( #ffda6f 15%, #e2a139 60%, #a44e01 80%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: 'Helvetica'
    },
  })(Typography)

  const TailColor = withStyles({
    root: {
      fontSize: '20px !important',
      textAlign: 'center',
      background:
        '-webkit-linear-gradient( #a44e01 15%, #e2a139 60%, #ffda6f 80%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: 'Helvetica'
    },
  })(Typography)

  // Set TextField's Color
  const useStyles = makeStyles({
    root: {
      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ffda6f',
      },
      '& .MuiOutlinedInput-input': {
        color: '#e2a139',
      },
      width: '400px',
    },
  })
  const classes = useStyles()

  // onClick Bet Button
  const startBet = () => {
    
    // parseFloat(ethers.utils.formatEther(betAmount) )  betAmount * 10 ** 10
    // 
    console.log(process.env.REACT_APP_OWNER)
    contract.methods.Bet(process.env.REACT_APP_OWNER, web3.utils.toWei(betAmount.toString(), 'ether')).send({
      from: walletAddress,
      value: web3.utils.toWei(betAmount.toString(), 'ether')
    })
      .on('receipt', async () => {
        if (!mute) { Space.play() }

        let currentType = ''
        if (Math.random() <= 0.4) {
          setBetType('HEADS')
          currentType = 'HEADS'
        } else {
          setBetType('TAILS')
          currentType = 'TAILS'
        }

        if (selected === currentType) {
          setIsWin(1)
          if (!mute) { Win.play() }
          console.log(betAmount * 1.8 * 0.98)

          const privateKey = Buffer.from(process.env.REACT_APP_OWNER_PRIVATEKEY, 'hex')
          const count = await getNonce()
          const rawTx = {
            nonce: web3.utils.toHex(count),
            gasPrice: web3.utils.toHex(100000000000),
            gasLimit: web3.utils.toHex(300000),
            from: process.env.REACT_APP_OWNER,
            to: walletAddress,
            value: web3.utils.toHex(web3.utils.toWei((betAmount * 1.8 * 0.98).toString(), 'ether')),
          }

          const tx = new Tx(rawTx, { 'common': BSC_FORK });
          tx.sign(privateKey);
          const serializedTx = tx.serialize();

          web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('receipt', () => {
              console.log()
              saveCurrentData()
            })
        } else {
          setIsWin(0)
          if (!mute) { Lose.play() }
        }
        // Display WinLose Modal
        handleClickOpen()
      })
  }

  // Open and Close Win/Lose Modal
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = (value) => {
    setOpen(false)
  }

  //Start Rendering
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="container">
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              height: 'auto',
              width: '100%',
              p: 3,
            }}
          >
            {/* Rules and Audio settings */}
            <Settings mute={mute} setMute={setMute} />

            {/* Game Logic */}
            <Container maxWidth="lg">
              {/* Set Coin Head or Tail */}
              <Container maxWidth="sm">
                <Stack
                  direction="row"
                  mt={5}
                  justifyContent={isDesktop ? 'space-between' : 'center'}
                  flexWrap="wrap"
                  sx={{ width: '100%' }}
                >
                  {/* Select Heads Button */}
                  <Stack>
                    <Button
                      onClick={headsSelected}
                      sx={{
                        borderRadius: '12px',
                        background:
                          selected === 'HEADS'
                            ? 'linear-gradient(rgb(255, 230, 105) 15%, rgb(255, 140, 100) 46%, rgb(255, 100, 100) 67%)'
                            : '',
                      }}
                    >
                      <Stack
                        sx={{
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.2)',
                          padding: '20px 25px',
                        }}
                      >
                        <img
                          src="/assets/coin_head.png"
                          alt=".."
                          style={{ height: '65px' }}
                        />
                        <HeadColor> HEADs </HeadColor>
                        <HeadColor> 1.8x </HeadColor>
                      </Stack>
                    </Button>
                  </Stack>

                  {/* Displaying Coin */}
                  <Stack sx={{ height: '190px' }}>
                    <div id="coin" className={betType}>
                      <div className="side-a">
                        <img
                          src="/assets/coin_tail.png"
                          alt=".."
                          style={{ height: '190px' }}
                        />
                      </div>
                      <div className="side-b">
                        <img
                          src="/assets/coin_head.png"
                          alt=".."
                          style={{ height: '190px' }}
                        />
                      </div>
                    </div>
                    <WinLoseModal
                      open={open}
                      onClose={handleClose}
                      isWin={isWin}
                    />
                  </Stack>

                  {/* Select Tails Button */}
                  <Stack>
                    <Button
                      onClick={tailsSelected}
                      sx={{
                        borderRadius: '12px',
                        background:
                          selected === 'TAILS'
                            ? 'linear-gradient(rgb(21, 241, 178) 15%, rgb(32, 226, 184) 46%, rgb(62, 186, 199) 60%, rgb(110, 123, 223) 100%, rgb(149, 71, 243) 100%)'
                            : '',
                      }}
                    >
                      <Stack
                        sx={{
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.2)',
                          padding: '20px 25px',
                        }}
                      >
                        <img
                          src="/assets/coin_tail.png"
                          alt=".."
                          style={{ height: '65px' }}
                        />
                        <TailColor> TAILS </TailColor>
                        <TailColor> 1.8x </TailColor>
                      </Stack>
                    </Button>
                  </Stack>
                </Stack>
              </Container>

              {/* Set Bet Amount */}
              <Grid
                item
                container
                xs={12}
                md={12}
                justifyContent="center"
                mt={3}
              >
                <Grid
                  item
                  container
                  xs={12}
                  md={12}
                  justifyContent="center"
                  mt={3}
                >
                  <HeadColor>Bet Amount</HeadColor>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  md={12}
                  justifyContent="center"
                  mt={3}
                >
                  <TextField
                    id="bet-amount"
                    type="number"
                    value={betAmount}
                    className={classes.root}
                    onChange={handleChange}
                    InputProps={{ endAdornment: <MinButton /> }}
                    fullWidth
                  />
                </Grid>
              </Grid>

              {/* Connect Wallet and Start Betting */}
              <Grid
                item
                container
                xs={12}
                md={12}
                justifyContent="center"
                mb={3}
              >
                {walletAddress.length > 0 || isAuthenticated ? (
                  <Button
                    onClick={startBet}
                    variant="contained"
                    size="large"
                    startIcon={<CasinoIcon />}
                    sx={{
                      width: '300px',
                      height: 54,
                      mt: 3,
                      borderRadius: '10px',
                      fontWight: 'bold',
                      fontFamily: 'Helvetica',
                      background:
                        'linear-gradient(120deg , #dc2424 15%, #4a569d 80%)',
                      '&:hover': {
                        background:
                          'linear-gradient(120deg , #4a569d 15%, #dc2424 80%)'
                      }
                    }}
                  >
                    {' '}
                    Bet {selected}{' '}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={connectWalletPressed}
                    sx={{
                      width: '300px',
                      height: 54,
                      my: 3,
                      borderRadius: '10px',
                      fontWight: 'bold',
                      fontFamily: 'Helvetica',
                      background:
                        'linear-gradient(120deg , #dc2424 15%, #4a569d 80%)',
                      '&:hover': {
                        background:
                          'linear-gradient(120deg , #4a569d 15%, #dc2424 80%)'
                      }
                    }}
                  >
                    🦊
                    CONNECT{' '}
                  </Button>
                )}
              </Grid>
            </Container>
          </Box>
        </div>
      </div>
    </section>
  )
}

Flip.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  game: state.game
})

export default connect(mapStateToProps, { login, saveWinnerData })(Flip)
