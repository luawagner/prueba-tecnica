
import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false)

  //actualización del estado basado en el estado previo
  const toggleColors = () => {
    setShowColors(!showColors) //cuando se ejecute invierte el estado actual
  }

  //El estado antes de la actualización. Compara prevState con this.state para determinar lo que cambió.
  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
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

const sortedUsers = sortByCountry 
? users.toSorted((a, b) => {
  return a.location.country.localeCompare(b.location.country)
})
: users

  return (
    
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
    <button onClick={toggleColors}>Colorear filas</button>
    <button onClick={toggleSortByCountry}>
      {sortByCountry ? 'No ordenar' : 'Ordenar por país'}
      </button>

      </header>
      <main>
    
    <UsersList showColors={showColors} users={sortedUsers} />
    </main>
   </div>
   
   
  )
}

export default App
