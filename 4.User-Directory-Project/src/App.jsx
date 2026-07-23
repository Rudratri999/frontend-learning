import React, { useState, useEffect } from 'react'
import UserCard from './components/UserCard'
import SearchBar from './components/SearchBar'

const App = () => {
  const [search, setSearch] = useState("")

  const users = [
    { id: 1, name: "Ram", role: "DevOps" },
    { id: 2, name: "Ramesh", role: "Developer" },
    { id: 3, name: "Rakesh", role: "Debugger" }
  ]

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    console.log("User Directory Loaded")
  }, [])

  return (
    <div>
      <h1>User Directory</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <h2>Total Users: {filteredUsers.length}</h2>

      {filteredUsers.map(user => (
        <UserCard
          key={user.id}
          name={user.name}
          role={user.role}
        />
      ))}
    </div>
  )
}

export default App