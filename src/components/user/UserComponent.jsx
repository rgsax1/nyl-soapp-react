import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUser, updateUser } from "./UserService.js";

const UserComponent = () => {

    const [userName, setUserName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [password, setPassword] = useState('')
    const [userAccessLevel, setUserAccessLevel] = useState('USER')
    const { id } = useParams();
    const navigator = useNavigate();
    const [errors, setErrors] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        jobTitle: '',
        password: '',
        userAccessLevel: ''
    })


    useEffect(() => {
        if (id) {
            getUser(id).then((response) => {
                setUserName(response.data.userName);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setJobTitle(response.data.jobTitle);
                setPassword(response.data.password);
                setUserAccessLevel(response.data.userAccessLevel);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateUser(e) {
        e.preventDefault();
        if (validateForm()) {
            const user = { userName, firstName, lastName, jobTitle, password, userAccessLevel }
            console.log (user)
            if (id) {
                updateUser(id, user).then((response) => {
                    console.log(response.data);
                    navigator('/users');
                }).catch(error => {console.error(error);})
            } else {createUser(user).then((response) => {
                    console.log(response.data);
                    navigator('/users')
                }).catch(error => {console.error(error);})
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (userName.trim()) {
            errorsCopy.userName = '';
        } else {
            errorsCopy.userName = 'Digite o nome do usuário';
            valid = false;
        }

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'Digite o primeiro nome';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Digite o último sobrenome';
            valid = false;
        }

        if (jobTitle.trim()) {
            errorsCopy.jobTitle = '';
        } else {
            errorsCopy.jobTitle = 'Digite o cargo';
            valid = false;
        }

        if (password.trim()) {
            errorsCopy.password = '';
        } else {
            errorsCopy.password = 'Digite a senha';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Atualizar usuário</h2>
        } else {
            return <h2 className="text-center">Adicionar usuário</h2>
        }
    }


    return (
        <div className='container'>
            <br></br>
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">Nome do usuário:</label>
                                <input
                                    type='text'
                                    placeholder='Digite o nome do usuário'
                                    name='userName'
                                    value={userName}
                                    className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setUserName(e.target.value)}>
                                </input>
                                {errors.userName && <div className='invalid-feedback'>{errors.userName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Primeiro nome:</label>
                                <input
                                    type='text'
                                    placeholder='Digite o primeiro nome'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}>
                                </input>
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Último nome:</label>
                                <input
                                    type='text'
                                    placeholder='Digite o último nome'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}>
                                </input>
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Cargo:</label>
                                <input
                                    type='text'
                                    placeholder='Digite o nome do cargo'
                                    name='jobTitle'
                                    value={jobTitle}
                                    className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`}
                                    onChange={(e) => setJobTitle(e.target.value)}>
                                </input>
                                {errors.jobTitle && <div className='invalid-feedback'>{errors.jobTitle}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Senha:</label>
                                <input
                                    type='password'
                                    placeholder='Digite a sua senha'
                                    name='password'
                                    value={password}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    onChange={(e) => setPassword(e.target.value)}>
                                </input>
                                {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Nível de acesso:</label>
                                <select
                                    value={userAccessLevel}
                                    onChange={(e) => setUserAccessLevel(e.target.value)}
                                    className='form-control'>
                                    <option value='USER'>USER</option>
                                    <option value='MANAGER'>MANAGER</option>
                                    <option value='ADMIN'>ADMIN</option>
                                </select>
                            </div>
                            <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateUser(e)}>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserComponent;