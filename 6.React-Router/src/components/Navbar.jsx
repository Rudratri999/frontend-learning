import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>

        <Link to ="/">Home</Link>
        <Link to ="/users">User</Link>
        <Link to ="/profile">Profile</Link>
      
    </div>
  )
}

export default Navbar
