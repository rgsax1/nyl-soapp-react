import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    createMaintenanceMechanicals, getMaintenanceMechanical, updateMaintenanceMechanical,
} from "./MaintenanceMechanicalService.js";

const MaintenanceMechanicalsComponent = () => {
    const {id} = useParams()
    const [type, setType] = useState('')
    const navigator = useNavigate()
    const [errors, setErrors] = useState({
        type: '',
    })

    useEffect(() => {
        if (id) {
            getMaintenanceMechanical(id).then((response) => {
                setType(response.data.type);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateMaintenanceMechanical(e) {
        e.preventDefault();
        if (validateForm()) {
            const maintenance = {type}
            console.log(maintenance)
            if (id) {
                updateMaintenanceMechanical(id, maintenance).then((response) => {
                    console.log(response.data);
                    navigator('/maintenance-mechanicals');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createMaintenanceMechanicals(maintenance).then((response) => {
                    console.log(response.data);
                    navigator('/maintenance-mechanicals')

                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = {...errors};

        if (type.trim()) {
            errorsCopy.type = '';
        } else {
            errorsCopy.type = "Digite o nome da manutenção mecânica.";
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Atualizar manutenção mecânica</h2>
        } else {
            return <h2 className="text-center">Adicionar manutenção mecânica</h2>
        }
    }


    return (<>
            <div className="container">
                <br></br>
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        {pageTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label htmlFor="" className="form-label">Nome da manutenção mecânica</label>
                                    <input
                                        type="text"
                                        placeholder="Digite o nome da manutenção mecânica"
                                        name="type"
                                        value={type}
                                        className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                                        onChange={(e) => setType(e.target.value)}>
                                    </input>
                                    {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                                </div>
                                <button className='btn btn-success mb-2'
                                        onClick={(e) => saveOrUpdateMaintenanceMechanical(e)}>Enviar
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default MaintenanceMechanicalsComponent;