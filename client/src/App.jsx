import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Socket from './components/Socket'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Socket/>
     
    </div>
  )
}

export default App
