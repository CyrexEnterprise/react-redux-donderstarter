
import React, { useEffect } from 'react';

const LandingPage = () => {
  useEffect(() => {
    console.log("First thing to get executed")
  }, [])

  return (
    <div className='home-wrapper'>
      Home
    </div>
  )
}

export default LandingPage
