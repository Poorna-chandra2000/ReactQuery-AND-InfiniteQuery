import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from "./components/Card.jsx";
import Posts from "./components/Posts.jsx";
import NavRouter from "./components/NavRouter.jsx";
import Navbar from "./components/Navbar.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Navbar/>
        <NavRouter/>
        {/*<Posts/>*/}
    </>
  )
}

export default App


