import React from 'react'

const UserCard = ({ name, role }) => {
  return (
    <div className='UserCard'>
      <h2>{name}</h2>
      <p>{role}</p>
      <hr />
    </div>
  )
}

export default UserCard