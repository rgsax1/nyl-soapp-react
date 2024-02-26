import React, {useEffect, useState} from 'react';
import {deleteEquipmentGeneral, listEquipmentGenerals, updateEquipmentGeneral} from './EquipmentGeneralService.js';
import {useNavigate} from 'react-router-dom';

const EquipmentGeneralListComponent = () => {
    const [equipmentGenerals, setEquipmentGenerals] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        listEquipmentGenerals()
            .then((response) => {
                setEquipmentGenerals(response.data);
            }).catch((error) => {
            console.error(error);
        });
    }, []);

    function getAllEquipmentGenerals() {
        listEquipmentGenerals().then((response) => {
            setEquipmentGenerals(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewEquipmentGeneral() {
        navigator('/add-equipment-general');
    }

    function updateEquipmentGeneral(id) {
        navigator(`/edit-equipment-general/${id}`);
    }

    function removeEquipmentGeneral(id) {
        console.log(id);
        deleteEquipmentGeneral(id).then((response) => {
            getAllEquipmentGenerals();
        }).catch(error => {
            console.error(error);
        });
    }


    return (
        <div className="container">
            <h2 className="text-center">Lista geral de equipamentos</h2>
            <button className="btn btn-primary mb-2" onClick={addNewEquipmentGeneral}>
                Adicionar Equipamento
            </button>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Id:</th>
                    <th>Fabricante do Equipamento:</th>
                    <th>Modelo do Equipamento:</th>
                    <th>Descrição:</th>
                    <th>Ações:</th>
                </tr>
                </thead>
                <tbody>
                {equipmentGenerals.map((equipmentGeneral) => (
                    <tr key={equipmentGeneral.id}>
                        <td>{equipmentGeneral.id}</td>
                        <td>{equipmentGeneral.equipmentManufacturer}</td>
                        <td>{equipmentGeneral.equipmentModel}</td>
                        <td>{equipmentGeneral.description}</td>
                        <td>
                            <button className="btn btn-info"
                                    onClick={() => updateEquipmentGeneral(equipmentGeneral.id)}>
                                Atualizar
                            </button>
                            <button className="btn btn-danger"
                                    onClick={() => removeEquipmentGeneral(equipmentGeneral.id)}
                                    style={{marginLeft: '10px'}}>
                                Deletar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
                <thead>
                </thead>
            </table>
        </div>
    );
}

export default EquipmentGeneralListComponent;