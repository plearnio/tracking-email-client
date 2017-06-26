import React from 'react';
import '../../static/css/Animate.css'

const styles = {
  NotFound: {
    color: 'white',
    backgroundColor: '#3f3f46',
    padding: '20px',
    borderRadius: '10px',
  }
}

const NotFound = () => {
  const style = styles
  return (
    <center>
      <h3 style={style.NotFound}>{'<'} 404 Not Found {'>'}</h3>
    </center>
  )
}

export default NotFound;
