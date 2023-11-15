import { type User } from '../types.d'

interface Props {
    showColors: boolean
    users: User[]
}

export function UsersList ({ showColors, users }: Props) {

    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>País</th>
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
                        <tr key={index} style={{ backgroundColor: color }}> {/*id es un objeto, por eso accedo a su value*/}
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
                            <button>Eliminar</button>
                        </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}