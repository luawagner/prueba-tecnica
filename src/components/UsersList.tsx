import { SortBy, type User } from '../types.d'

interface Props {
    changeSorting: (sort: SortBy) => void
    deleteUser: (email: string) => void
    showColors: boolean
    users: User[]
}

export function UsersList ({ changeSorting, deleteUser, showColors, users }: Props) {

    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className='pointer' onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
                    <th  className='pointer'onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
                    <th className='pointer' onClick={() => changeSorting(SortBy.COUNTRY)}>País</th>
                    <th>Acciones</th>

                </tr>
            </thead>

            <tbody>
                {users.map((user, index) => {
                    //tomo el índice, si es par le aplico un tono sino otro
                    const backgroundColor = index % 2 === 0 ? '#333' : '#555'
                    const color = showColors ? backgroundColor : 'transparent'
                    //color aplicará el color si el estado showColors es true, sino dejará transparente
                    return(
                        //le indico que aplique los estilos de color  
                        <tr key={user.email} style={{ backgroundColor: color }}> {/*id es un objeto, por eso accedo a su value*/}
                        <td>
                            <img src={user.picture.thumbnail}/>
                        </td>
                        <td>
                            {user.name.first}
                        </td>
                        <td>
                            {user.name.last}
                        </td>
                        <td>
                            {user.location.country}
                        </td>
                        <td>
                            <button onClick={() => { deleteUser(user.email)}}>Eliminar</button>
                        </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}