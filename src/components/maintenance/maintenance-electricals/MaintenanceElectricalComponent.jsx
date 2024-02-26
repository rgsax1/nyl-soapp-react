import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    createMaintenanceElectricals,
    getMaintenanceElectrical,
    updateMaintenanceElectrical
} from "./MaintenanceElectricalService.js";

const MaintenanceElectricalComponent = () => {
    const {id} = useParams();
    const [type, setType] = useState('')
    const navigator = useNavigate();
    const [errors, setErrors] = useState({
        type: '',
    })

    useEffect(() => {
        if (id) {
            getMaintenanceElectrical(id).then((response) => {
                setType(response.data.type);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateMaintenanceElectrical(e) {
        e.preventDefault();
        if (validateForm()) {
            const maintenance = {type}
            console.log(maintenance)
            if(id) {
                updateMaintenanceElectrical(id, maintenance).then((response) => {
                    console.log(response.data);
                    navigator('/maintenance-electricals');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createMaintenanceElectricals(maintenance).then((response) => {
                    console.log(response.data);
                    navigator('/maintenance-electricals')

                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = {...errors};

        if(type.trim()){
            errorsCopy.type = '';
        } else {
            errorsCopy.type = 'Digite o nome da manutenção elétrica';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id){
            return <h2 className="text-center">Atualizar manutenção elétrica</h2>
        } else {
            return <h2 className="text-center">Adicionar manutenção elétrica</h2>
        }
    }


    return (
        <>
            <div className="container">
                <br></br>
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        {pageTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label htmlFor="" className="form-label">Nome da manutenção elétrica</label>
                                    <input
                                    type="text"
                                    placeholder="Digite o nome da manutenção elétrica"
                                    name="type"
                                    value={type}
                                    className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                                    onChange={(e) => setType(e.target.value)}>
                                    </input>
                                    {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                                </div>
                                <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateMaintenanceElectrical(e)}>Enviar</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MaintenanceElectricalComponent;