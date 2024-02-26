import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createOrder, getOrder, updateOrder } from "./OrderService.js";
import { convertToISO8601 } from '../utils/dateUtils'

const OrderComponent = () => {
    const { id } = useParams();
    const [userOperator, setUserOperator] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [startServiceDate, setStartServiceDate] = useState('');
    const [finishServiceDate, setFinishServiceDate] = useState('');
    const [defect, setDefect] = useState('');
    const [activityPerformed, setActivityPerformed] = useState('');
    const [userResponsible, setUserResponsible] = useState('');
    const navigator = useNavigate();


    const [errors, setErrors] = useState({
        userOperator: '',
        issueDate: '',
        startServiceDate: '',
        finishServiceDate: '',
        defect: '',
        activityPerformed: '',
        userResponsible: '',
    })

    const handleConvertAndSetIssueDate = (e) => {
        const iso8601Date = convertToISO8601(e);
        setIssueDate(iso8601Date);
    };

    const handleConvertAndSetStartServiceDate = (e) => {
        const iso8601Date = convertToISO8601(e);
        setStartServiceDate(iso8601Date);
    };

    const handleConvertAndSetFinishServiceDate = (e) => {
        const iso8601Date = convertToISO8601(e);
        setFinishServiceDate(iso8601Date);
    };





    useEffect(() => {
        if (id) {
            getOrder(id).then((response) => {
                setUserOperator(response.data.userResponsible);
                setIssueDate(response.data.issueDate);
                setStartServiceDate(response.data.startServiceDate);
                setFinishServiceDate(response.data.finishServiceDate);
                setDefect(response.data.defect);
                setActivityPerformed(response.data.activityPerformed);
                setUserResponsible(response.data.userResponsible);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id]);

    function saveOrUpdateOrder(e) {
        e.preventDefault();
        if (validateForm()) {
            const order = {
                userOperator,
                issueDate,
                startServiceDate,
                finishServiceDate,
                defect,
                activityPerformed,
                userResponsible
            };
            console.log(order);
            if (id) {
                updateOrder(id, order)
                    .then((response) => {
                        console.log(response.data);
                        navigator('/orders');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                createOrder(order).then((response) => {
                    console.log(response.data);
                    navigator('/orders');
                })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (userOperator.trim()) {
            errorsCopy.userOperator = '';
        } else {
            errorsCopy.userOperator = 'Selecione um usuário';
            valid = false;
        }

        if (issueDate.trim()) {
            errorsCopy.issueDate = '';
        } else {
            errorsCopy.issueDate = 'Escolha uma data para abertura da ordem';
            valid = false;
        }
        if (defect.trim()) {
            errorsCopy.defect = '';
        } else {
            errorsCopy.defect = 'Digite o defeito';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }


    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Atualizar ordem de serviço</h2>
        } else {
            return <h2 className="text-center">Adicionar ordem de serviço</h2>
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
                                <label className="form-label">Operador(a):</label>
                                <input type="text"
                                    placeholder="Digite o operador"
                                    name="userOperator"
                                    value={userOperator}
                                    className={`form-control ${errors.userOperator ? 'is-invalid' : ''}`}
                                    onChange={(e) => setUserOperator(e.target.value)} />
                                {errors.userOperator && <div className="invalid-feedback">{errors.userOperator}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Data de emissão:</label>
                                <input type="date"
                                    placeholder="Selecione a data de emissão"
                                    name="issueDate"
                                    value={issueDate}
                                    className={`form-control ${errors.issueDate ? 'is-invalid' : ''}`}
                                    onChange={handleConvertAndSetIssueDate} />
                                {errors.issueDate && <div className="invalid-feedback">{errors.issueDate}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Data de início do serviço:</label>
                                <input type="date"
                                    placeholder="Selecione a data do início do serviço"
                                    name="startServiceDate"
                                    value={startServiceDate}
                                    className="form-control"
                                    onChange={handleConvertAndSetStartServiceDate}/>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Data de finalização do serviço:</label>
                                <input type="date"
                                    placeholder="Selecione a data da finalização do serviço"
                                    name="finishServiceDate"
                                    value={finishServiceDate}
                                    className="form-control"
                                    onChange={handleConvertAndSetFinishServiceDate} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Digite o defeito:</label>
                                <input type="text"
                                    placeholder="Digite o defeito do equipamento"
                                    name="defect"
                                    value={defect}
                                    className="form-control"
                                    onChange={(e) => setDefect(e.target.value)} />
                                {errors.defect && <div className="invalid-feedback">{errors.defect}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Descreva a atividade realizada:</label>
                                <input type="text"
                                    placeholder="Descreva a atividade realizada"
                                    name="activityPerformed"
                                    value={activityPerformed}
                                    className="form-control"
                                    onChange={(e) => setActivityPerformed(e.target.value)} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Selecione o usuário responsável:</label>
                                <input type="text"
                                    placeholder="Selecione o usuário responsável pela manutenção"
                                    name="userResponsible"
                                    value={userResponsible}
                                    className="form-control"
                                    onChange={(e) => setUserResponsible(e.target.value)} />
                            </div>

                            <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateOrder(e)}>Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default OrderComponent;