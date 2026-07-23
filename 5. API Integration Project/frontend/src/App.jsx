// ------- 1. GET - data -----------

// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// const App = () => {

//   const [users, setUsers] = useState([])
//   const[loading  , setLoading] = useState(true)
//   const[error , setError] = useState("")



//   const fetchUsers = async () => {
//      setLoading(true);
//      setError("")

//     try {
//       // 1. Using Fetch
//       // const response = await fetch("http://127.0.0.1:8000/users")
//       //const data = await response.json()
//       //setUsers(data)


//       //2.Using Axios( automatically parse Json)
//       const response = await axios.get("http://127.0.0.1:8000/users");
//       setUsers(response.data)

//     }
//     catch {
//       setError("Failed to Fetch the user")
//       setLoading(false)
//     }

//     finally{
//       setLoading(false)
//     }


//   }

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   return (
//     <div>
//       {/* condition 1 ? result : condition 2 ? result : default; */}
//       {loading ? (
//         <h1>loading....</h1>
//       ) : error ? (
//         <h1>{error}</h1>
//       ) : (
//         users.map(user => (
//           <h2 key={user.id}>
//             {user.name}
//             <br />
//             {user.role}
//           </h2>
//         ))
//       )}
//     </div>
//   )
// }

// export default App


// -------- 2.POST - Create data using Form

import React , {useState} from 'react'
import axios from 'axios'


const App = () => {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(name)
    console.log(role)

    try {
      const response = await axios.post("http://127.0.0.1:8000/users", { name, role });
      console.log(response.data)
      setName("")
      setRole("")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)} />

        <input
          type="text"
          placeholder='Enter Role'
          value={role}
          onChange={(e) => setRole(e.target.value)} />
          
          <button type='submit'>submit</button>
      </form>

    </div>
  )
}

export default App
