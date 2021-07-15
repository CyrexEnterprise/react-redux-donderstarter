import React from 'react'

const Navigation = ({ navigate }) => (
  <div className='navigation'>
    <div className='app-bar'>
      Navigation bar:
      <button onClick={() => navigate('contact')}>Go to contact</button>
    </div>
  </div>
)

export default Navigation
