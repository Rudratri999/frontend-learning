import React from 'react'
import UserCard from './Components/UserCard'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

const App = () => {
  
  return (
    <div className='App'>
      <Navbar/>
      <UserCard name = "Rudra" role = "Developer" email = "rudra@gmail.com" />
      <Footer/>
    </div>
  )
}

export default App
