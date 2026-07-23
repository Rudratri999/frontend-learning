import React from 'react'

const UserCard = ({ name, role, email }) => {
    return (
        <div className='UserCard'>
            <h2>Name: {name}</h2>
            <p>Role: {role}</p>
            <p>Email: {email}</p>
        </div>
    )
}

export default UserCard
