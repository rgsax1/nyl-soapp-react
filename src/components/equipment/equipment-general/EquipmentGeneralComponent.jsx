import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getEquipmentGeneral, createEquipmentGeneral, updateEquipmentGeneral } from "./EquipmentGeneralService.js";

const EquipmentGeneralComponent = () => {
    const { id } = useParams();
    const [equipmentManufacturer, setEquipmentManufacturer] = useState('');
    const [equipmentModel, setEquipmentModel] = useState('');
    const [description, setDescription] = useState('');
    const navigator = useNavigate();
    const [errors, setErrors] = useState({
        equipmentManufacturer: '',
        equipmentModel: '',
        description: ''
    });

    useEffect(() => {
        if (id) {
            getEquipmentGeneral(id)
                .then((response) => {
                    setEquipmentManufacturer(response.data.equipmentManufacturer);
                    setEquipmentModel(response.data.equipmentModel);
                    setDescription(response.data.description);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id])

    function saveOrUpdateEquipmentGeneral(e) {
        e.preventDefault();
        if (validateForm()) {
            const equipmentGeneral = {equipmentManufacturer, equipmentModel, description};
            console.log (equipmentGeneral)
            if (id) {
                updateEquipmentGeneral(id, equipmentGeneral).then((response) => {
                        console.log(response.data);
                        navigator('/equipment-generals');
                    }).catch((error) => {console.error(error);});
            } else {createEquipmentGeneral(equipmentGeneral).then((response) => {
                    console.log(response.data);
                    navigator('/equipment-generals');})
                    .catch((error) => {console.error(error);})
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (equipmentManufacturer.trim()) {
            errorsCopy.equipmentManufacturer = '';
        } else {
            errorsCopy.equipmentManufacturer = 'Digite o fabricante do equipamento';
            valid = false;
        }

        if (equipmentModel.trim()) {
            errorsCopy.equipmentModel = '';
        } else {
            errorsCopy.equipmentModel = 'Digite o modelo do equipamento';
            valid = false;
        }

        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = 'Digite a descrição do equipamento';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Atualizar equipamento</h2>
        } else {
            return <h2 className="text-center">Adicionar equipamento</h2>
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
                                <label className="form-label">Fabricante do equipamento:</label>
                                <input
                                    type="text"
                                    placeholder="Digite o fabricante do equipamento"
                                    name="equipmentManufacturer"
                                    value={equipmentManufacturer}
                                    className={`form-control ${errors.equipmentManufacturer ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEquipmentManufacturer(e.target.value)}
                                />
                                {errors.equipmentManufacturer && <div className="invalid-feedback">{errors.equipmentManufacturer}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Modelo do equipamento:</label>
                                <input
                                    type="text"
                                    placeholder="Digite o modelo do equipamento"
                                    name="equipmentModel"
                                    value={equipmentModel}
                                    className={`form-control ${errors.equipmentModel ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEquipmentModel(e.target.value)}
                                />
                                {errors.equipmentModel && <div className="invalid-feedback">{errors.equipmentModel}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Descrição do equipamento</label>
                                <input
                                    type="text"
                                    placeholder="Digite a descrição do equipamento"
                                    name="description"
                                    value={description}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDescription(e.target.value)} />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>

                            <button className="btn btn-success mb-2" onClick={(e) => saveOrUpdateEquipmentGeneral(e)}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EquipmentGeneralComponent;