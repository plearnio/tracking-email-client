import React from 'react';
import logo from '../../static/images/logo.svg'
import '../../static/css/Animate.css'

const styles = {
  coverWhite: {
    backgroundColor: 'rgb(38,38,38)',
    padding: '20px',
    borderRadius: '10px',
  },
  logo: {
    height: '80px'
  },
  whiteText: {
    color: 'white'
  }
}

const Loading = () => {
  const style = styles
  return (
    <center style={style.coverWhite} >
      <img
        className="Spin"
        style={style.logo}
        src={logo}
        alt={logo}
      />
      <h3 style={style.whiteText}> Loading ... </h3>
    </center>
  )
}

export default Loading;
