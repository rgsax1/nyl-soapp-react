import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createMaintenance, getMaintenance, updateMaintenance} from "./MaintenanceService.js";
import {listUsers} from "../user/UserService.js";
import SelectMaintenanceElectrical from "./SelectMaintenanceElectrical.jsx";
import SelectMaintenanceMechanical from "./SelectMaintenanceMechanical.jsx";
import {format, parseISO} from 'date-fns';

const MaintenanceComponent = () => {

    const {id} = useParams();
    const [maintenanceRecord, setMaintenanceRecord] = useState('')
    const [maintenanceReview, setMaintenanceReview] = useState(0)
    const [maintenanceEmissionDate, setMaintenanceEmissionDate] = useState('')
    const [userId, setUserId] = useState('')
    const [users, setUsers] = useState([])
    const [maintenanceElectricalIds, setMaintenanceElectricalIds] = useState([])
    const [maintenanceMechanicalIds, setMaintenanceMechanicalIds] = useState([])
    const review = parseInt(maintenanceReview);
    const navigator = useNavigate();
    const [errors, setErrors] = useState({
        maintenanceRecord: '',
        maintenanceReview: '',
        maintenanceEmissionDate: '',
        user: '',
        maintenanceElectricalIds: '',
        maintenanceMechanicalIds: ''
    })

    const convertToISO8601 = () => {
        try {
            const parsedDate = new Date(maintenanceEmissionDate);
            return parsedDate.toJSON();
        } catch (error) {
            console.error('Erro ao converter a data: ', error);
            return null;
        }
    };


    useEffect(() => {
        listUsers().then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    useEffect(() => {
        if (id) {
            getMaintenance(id).then((response) => {
                setMaintenanceRecord(response.data.maintenanceRecord);
                setMaintenanceReview(response.data.maintenanceReview);

                // A data é armazenada como ISO8601, então vamos convertê-la para o formato "yyyy-MM-dd"
                const isoDate = response.data.maintenanceEmissionDate;
                const parsedDate = format(parseISO(isoDate), "yyyy-MM-dd");
                setMaintenanceEmissionDate(parsedDate);

                setUserId(response.data.userId);
                setMaintenanceElectricalIds(response.data.maintenanceElectricalIds);
                setMaintenanceMechanicalIds(response.data.maintenanceMechanicalIds);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);


    function saveOrUpdateMaintenance(e) {
        e.preventDefault();
        if (validateForm()) {
            const maintenance =
                {
                    maintenanceRecord,
                    maintenanceReview: review,
                    maintenanceEmissionDate,
                    userId,
                    maintenanceElectricalIds,
                    maintenanceMechanicalIds,
                };
            console.log(maintenance)
            if (id) {
                updateMaintenance(id, maintenance)
                    .then((response) => {
                        console.log(response.data);
                        navigator('/maintenances');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                createMaintenance(maintenance)
                    .then((response) => {
                        console.log(response.data);
                        navigator('/maintenances');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = {...errors};

        if (maintenanceRecord.trim()) {
            errorsCopy.maintenanceReview = '';
        } else {
            errorsCopy.maintenanceReview = 'Digite a revisão';
            valid = false;
        }

        if (maintenanceReview.trim()) {
            errorsCopy.maintenanceRecord = '';
        } else {
            errorsCopy.maintenanceRecord = 'Digite o registro'
            valid = false;
        }


        if (userId) {
            errorsCopy.user = '';
        } else {
            errorsCopy.user = 'Selecione um usuário'
            valid = false
        }


        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <><h2 className="text-center">Atualizar ficha de manutenção</h2><p
                className="text-center text-bg-warning">Atualize o número da revisão para editar</p></>
        } else {
            return <h2 className="text-center">Criar ficha de manutenção</h2>
        }
    }

    return (
        <div className="container">
            <br></br>
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">Ficha de manutenção:</label>
                                <input
                                    type='text'
                                    placeholder='FM'
                                    name='maintenanceRecord'
                                    value={maintenanceRecord}
                                    className={`form-control ${errors.maintenanceRecord ? 'is-invalid' : ''}`}
                                    onChange={(e) => setMaintenanceRecord(e.target.value)}
                                >
                                </input>{errors.maintenanceRecord &&<div className='invalid-feedback'>{errors.maintenanceRecord}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Revisão:</label>
                                <input
                                    type='number'
                                    placeholder='Revisão'
                                    name='maintenanceReview'
                                    value={maintenanceReview}
                                    step="1"  // Define o passo como 1 para permitir apenas números inteiros
                                    className={`form-control ${errors.maintenanceReview ? 'is-invalid' : ''}`}
                                    onInput={(e) => {
                                        const value = e.target.value;
                                        // Remove caracteres não numéricos e o sinal negativo
                                        e.target.value = value.replace(/[^0-9]/g, '');
                                        setMaintenanceReview(e.target.value);}}>
                                </input>
                                {errors.maintenanceReview && <div className='invalid-feedback'>{errors.maintenanceReview}</div>}
                            </div>


                            <div className="form-group mb-2">
                                <label className="form-label">Data de emissão:</label>
                                <input
                                    type="date" // Mantenha o campo type="date" para permitir a escolha da data
                                    name="maintenanceEmissionDate"
                                    value={maintenanceEmissionDate}
                                    className={`form-control ${errors.maintenanceEmissionDate ? 'is-invalid' : ''}`}
                                    onChange={(e) => setMaintenanceEmissionDate(e.target.value)}
                                /> {errors.maintenanceEmissionDate &&<div className='invalid-feedback'>{errors.maintenanceEmissionDate}</div>}
                            </div>


                            <div className="form-group mb-2">
                                <label className='form-label'>Selecione o usuário:</label>
                                <select
                                    className={`form-control ${errors.user ? 'is-invalid' : ''}`}
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                ><option value="Selecione o usuário">Selecione o usuário</option>
                                    {
                                        users.map(user =>
                                            <option key={user.id} value={user.id}>{user.userName}</option>
                                        )
                                    }
                                </select>
                                {errors.user && <div className='invalid-feedback'>{errors.user}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className='form-label'>Selecione as manutenções elétricas:</label>
                                <SelectMaintenanceElectrical
                                    value={maintenanceElectricalIds}
                                    onChange={(value) => setMaintenanceElectricalIds(value)}/>
                            </div>

                            <div className="form-group mb-2">
                                <label className='form-label'>Selecione as manutenções mecânicas:</label>
                                <SelectMaintenanceMechanical
                                    value={maintenanceMechanicalIds}
                                    onChange={(value) => setMaintenanceMechanicalIds(value)}/>
                            </div>
                            <button className="btn btn-success mb-2" onClick={saveOrUpdateMaintenance}>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MaintenanceComponent;