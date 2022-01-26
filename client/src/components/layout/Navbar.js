import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login, logout } from '../../actions/auth'
import { useTheme } from '@material-ui/core/styles'
import { Button, Typography, useMediaQuery, Stack } from '@mui/material'
import {
  connectWallet,
  getCurrentWalletConnected,
} from '../../utils/interact.js'
// import useOffSetTop from '../../utils/useOffsetTop'
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';

const Navbar = ({ auth: { isAuthenticated }, login, logout }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  // const isOffset = useOffSetTop(100)
  // const walletResponse =  connectWallet();
  // console.log(walletResponse);
  console.log(isAuthenticated)
  //State variables
  const [walletAddress, setWallet] = useState('')

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const { address } = await getCurrentWalletConnected()
      setWallet(address)
      // ...
    }
    fetchData()
  }, [])

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
      // setStatus(
      //   <p>
      //     {" "}
      //     🦊{" "}
      //     <a href={`https://metamask.io/download.html`}>
      //       You must install Metamask, a virtual Ethereum wallet, in your
      //       browser.
      //     </a>
      //   </p>
      // );
    }
  }

 
          const checkMessage=(
          <div id="popup_section" style={{
              position: 'fixed',
              background: '#fff',
              padding: '20px 40px ',
              left:  '0',
              right:  '0',
              display:'block',
            
              margin:  'auto',
              color: 'red',
              textAlign:'center',
          
          }}>No wallet detected. Please install a wallet to continue using the site. <a href="#/" target="_blank" style={{color:'red'}}>Click here for more details</a></div>
          );
  
  const authLinks = (
    <ul>
      <Button
        variant="text"
        style={{
          color: 'white',
          marginRight: '3px',
          fontSize: '86',
          fontWeight: 'bold',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
        }}
      >
        Games
      </Button>
      <Button
        onClick={connectWalletPressed}
        variant="text"
        style={{
          color: 'white',
          marginRight: '3px',
          fontSize: '86',
          fontWeight: 'bold',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
        }}
      >
        {walletAddress.length > 0 ? (
          'Connected: ' +
          String(walletAddress).substring(0, 6) +
          '...' +
          String(walletAddress).substring(38)
        ) : (
          <span>🦊 Connect Wallet</span>
        )}
      </Button>
    </ul>
  )

  const guestLinks = (
    <ul>
      {walletAddress.length > 0 ? (
        <Button
          variant="text"
          href="/"
          style={{
            color: 'white',
            marginRight: '3px',
            fontSize: '86',
            fontWeight: 'bold',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            fontFamily:'Helvetica',
          }}
        >
          Games
        </Button>
      ) : (
        <Button
          variant="text"
          href="/"
          style={{
            color: 'white',
            marginRight: '3px',
            fontSize: '86',
            fontWeight: 'bold',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            fontFamily:'Helvetica',
            width: '152.6px',
          }}
        >
          Games
        </Button>
      )}
      <Button
        onClick={connectWalletPressed}
        variant="text"
        style={{
          color: 'white',
          marginRight: '3px',
          fontSize: '86',
          fontWeight: 'bold',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          fontFamily:'Helvetica',
          width: {},
        }}
      >
        {isAuthenticated || walletAddress.length > 0 ? (
          'Connected: ' +
          String(walletAddress).substring(0, 6) +
          '...' +
          String(walletAddress).substring(38)
        ) : (
          <span>🦊 Connect Wallet</span>
        )}
      </Button>
    </ul>
  )

  if (isDesktop) {
    return (
      <nav className="navbar">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ width: '40px', height: '20px' }}
          />
        </Link>
        <Link to="/">
          <Typography
            style={{
              color: '#ffffff',
              fontSize: '34px',
              fontWeight: 'bold',
              fontFamily:'Helvetica',
            }}
          >
            Smart Games
          </Typography>
        </Link>
        <Typography
          style={{
            color: '#ffffff',
            fontSize: '16px',
            marginTop: '10px',
            fontFamily:'Helvetica',
          }}
        >
          Provable fair games that is entirely based on smart contract with low 2% house edge, no sign ups & deposits.
          {window.ethereum===undefined?checkMessage:''}
        </Typography>
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        
      </nav>
    )
  } else {
    return (
      <nav className="navbar">
        <Stack direction="row">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ width: '40px', height: '20px', marginTop: '15px' }}
          />
        </Link>
        <Link to="/">
          <Typography
            style={{
              color: '#ffffff',
              fontSize: '30px',
              fontWeight: 'bold',
              fontFamily:'Helvetica',
            }}
          >
            Smart Games
          </Typography>
        </Link>
        </Stack>
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
       
      </nav>

      
    )
  }





}

Navbar.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { login, logout })(Navbar)

