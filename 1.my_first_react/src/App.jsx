import { Component, useEffect, useState } from 'react'




// 1. here title are props which are coming from card title = "", then passing as = {}
const Card = ({ title }) => {
  const [count , setcount] = useState(0)
  const [hasliked, setHasliked] = useState(false)

  useEffect(()=>{
    console.log(`${title} has been liked : ${hasliked}`)
  });

  return (
    <div className='card' onClick={() => setcount(count + 1)}>
      {title}
      <p>Count: {count}</p>

      <button onClick={() => setHasliked(true)}>
        {hasliked ? 'Liked' : 'Like'}
      </button>
    </div>


  )
}
// This is called arrow components
const App = () => {

  return (
    <div className='CardContainer'>
      {/* <h2>This is called functional arrow Component</h2> */}

      <Card title="Cocktail 2" />
      <Card title="Housefull" />
      <Card title="Avatar" />
    </div>

  )
}

export default App