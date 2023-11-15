
import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState([]);
  const [showColors, setShowColors] = useState(false)
  const toggleColors = () => {
    setShowColors(!showColors) //cuando se ejecute invierte el estado actual
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
    .then(res => res.json())
    .then(res => {
      setUsers(res.results)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
//Para tipar los datos de la Api, copio el raw y lo pego en quicktype

  return (
    
    <div className='App'>
      <header>
    <button onClick={toggleColors}>Colorear filas</button>
      </header>
      <main>
    <h1>Prueba técnica</h1>
    <UsersList showColors={showColors} users={users} />
    </main>
   </div>
   
   
  )
}

export default App
