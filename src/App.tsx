
import { useEffect, useState, useRef } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])
  //userRef -> guarda un valor que queremos que se comparta
  //entre renderizados pero que, al cambiar, no vuelva a renderizar el componente
  //Al llamar a la API guardamos esta referencia para disponer de ella
  //cuando el estado users cambie.

  //actualización del estado basado en el estado previo
  const toggleColors = () => {
    setShowColors(!showColors) //cuando se ejecute invierte el estado actual
  }

  //El estado antes de la actualización. 
  //Compara prevState con this.state para determinar lo que cambió.
  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  } //funcion interruptor

  const handleReset = () => {
    setUsers(originalUsers.current)
   }//reseteamos el estado de users, pasandole la referencia guardada con useRef. 
   //Así evitamos crear otro estado.
  
  //Recibe el email del user que queremos borrar. Filtra los users y devuelve aquellos
  //que son diferentes del email que le pasamos.
 const handleDelete = (email: string) => {
  const filteredUsers = users.filter((user) => user.email !== email)
  setUsers(filteredUsers)
 }
 
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
    .then(async res => await res.json())
    .then(res => {
      setUsers(res.results)
      originalUsers.current = res.results //guardamos la referencia para el useRef
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
//Para tipar los datos de la Api, copio el raw y lo pego en quicktype

//tener un solo estado para aquí hacer los cálculos necesarios con ese estado
const sortedUsers = sortByCountry 
? users.toSorted((a, b) => {
  return a.location.country.localeCompare(b.location.country)
})
: users

  return (
    
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
      <button onClick={handleReset}>Resetear usuarios</button>
    <button onClick={toggleColors}>Colorear filas</button>
    <button onClick={toggleSortByCountry}>
      {sortByCountry ? 'No ordenar' : 'Ordenar por país'}
      </button>

      </header>
      <main>
    
    <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
    </main>
   </div>
   
   
  )
}

export default App
