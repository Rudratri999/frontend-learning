import React, { useState } from 'react'

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div >
      <button className='btn' onClick={() => setIsLogin(true)}>
        {isLogin ? "Welcome" : "Login"}
      </button>
    </div>
  )
}

export default Navbar