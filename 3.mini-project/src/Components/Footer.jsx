import React  ,{useState} from 'react'

const Footer = () => {
    const[count , setCount] = useState(0)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count</button>
      <h1>count : {count}</h1>
    </div>
  )
}

export default Footer
