import {useEffect, useState} from 'react';
import {deleteUser, listUsers} from './UserService.js';
import {Link, useNavigate} from "react-router-dom";


const ListUserComponents = () => {
    const [users, setUsers] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, [])

    function getAllUsers() {
        listUsers().then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewUser() {
        navigator('/add-user')
    }

    function updateUser(id) {
        navigator(`/edit-user/${id}`)
    }

    function removeUser(id) {
        console.log(id);
        deleteUser(id).then((response) => {
            getAllUsers();
        }).catch(error => {
            console.error(error);
        })
    }

    return (<div className="container">
        <h2 className="text-center">List of Users</h2>
        <button className='btn btn-primary mb-2' onClick={addNewUser}>Adicionar Usuário</button>
        <table className="table table-striped table-bordered">
            <thead>
            <tr>
                <th>Id:</th>
                <th>Usuário:</th>
                <th>Primeiro nome:</th>
                <th>Último nome:</th>
                <th>Função:</th>
                <th>Nível de acesso:</th>
                <th>Ações:</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user =>
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.jobTitle}</td>
                <td>{user.userAccessLevel}</td>
                <td>
                    <button className="btn btn-info"
                            onClick={() => updateUser(user.id)}>
                        Atualizar
                    </button>
                    <button className="btn btn-danger"
                            onClick={() => removeUser(user.id)}
                            style={{marginLeft: '10px'}}>
                        Deletar
                    </button>
                </td>
            </tr>)}
            </tbody>
        </table>
    </div>)
}

export default ListUserComponents;