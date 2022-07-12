import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Header from './pages/partial/header/header'
import Footer from './pages/partial/footer/footer'
import Container from './pages/container/container'

const menu = [
  { title: "Characters", route: "/Characters" },
  { title: "Locations", route: "/Locations" },
  { title: "Episodes", route: "/Episodes" },
]

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <Header Menu={menu}></Header>
      <Container></Container>
      <Footer Text={"This is not an official Rick and Morty Wiki"}></Footer>
    </div>
  )
}

export default App
