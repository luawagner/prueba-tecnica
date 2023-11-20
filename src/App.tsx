
import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { User } from './types'

function App() {

  //-------------- ESTADOS
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])
  //userRef -> guarda un valor que queremos que se comparta
  //entre renderizados pero que, al cambiar, no vuelva a renderizar el componente
  //Al llamar a la API guardamos esta referencia para disponer de ella
  //cuando el estado users cambie.


  //----------------  HANDLES

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

 //------------------FETCHING DE DATOS

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

//-------------------PRIMERO FILTRAMOS LOS USUARIOS

/*Le indico que quiero que se ejecute solo cuando cambien los usuarios
o cada vez que el usuario me pase un nuevo filterCountry 
comparamos con toLowerCase para que no haya diferencias de caracteres. 
Usamos useMemo() para evitar cálculos innecesarios. */
const filteredUsers = useMemo(() => {
  return filterCountry !== null && filterCountry.length > 0
  //si tenemos un string y es mayor que 0s
  ? users.filter((user => {
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  }))
  : users
}, [users, filterCountry])
 


//tener un solo estado para aquí hacer los cálculos necesarios con ese estado
//---------------------SEGUNDO ORDENAMOS LOS USUARIOS
/*quiero que memorice el valor de la constante sortedUsers
y que no lo vuelva a calcular entre renderizados a no ser que el valor 
de filteredUsers o de sortByCountry cambie.
Le paso filteredUsers que va a darle los usuarios ya filtrados
o, si no hay un filtro aplicado, la lista completa de usuarios*/

const sortedUsers = useMemo(() => {
  return sortByCountry 
  ? filteredUsers.toSorted(
    (a, b) => 
     a.location.country.localeCompare(b.location.country)
  )
  : filteredUsers
}, [filteredUsers, sortByCountry]) /*si coloreo filas (showColors) se vuelve a renderizar el componente
pero esta función no se vuelve a ejecutar porque no cambió ninguno de los estados 
que le indiqué que vigile. */


  return (
    
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
      <button onClick={handleReset}>Resetear usuarios</button>
    <button onClick={toggleColors}>Colorear filas</button>
    <button onClick={toggleSortByCountry}>
      {sortByCountry ? 'No ordenar' : 'Ordenar por país'}
      </button>

      {/*cada vez que se escriba en este input se cambiará el estado del filterCountry*/}
    <input placeholder='Filtra por país' onChange={(e) => {
      setFilterCountry(e.target.value) // acá tenemos el string que está escribiendo el usuario
    }} />
      </header>
      <main>
    
    <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
    </main>
   </div>
   
   
  )
}

export default App
