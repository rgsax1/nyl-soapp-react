import React, {useEffect, useState} from 'react';
import {deleteEquipment, listEquipments, updateEquipment} from './EquipmentService.js';
import {useNavigate} from 'react-router-dom';
import {listEquipmentGenerals} from "./equipment-general/EquipmentGeneralService.js";

const EquipmentListComponent = () => {
    const [equipments, setEquipments] = useState([]);
    const [equipmentGenerals, setEquipmentGenerals] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const equipmentResponse = await listEquipments();
                setEquipments(equipmentResponse.data);

                const equipmentGeneralsResponse = await listEquipmentGenerals();
                setEquipmentGenerals(equipmentGeneralsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then(() => {
            console.log("Chamada da API concluída com sucesso!");
        });
    }, []);


    function getAllEquipmentGenerals() {
        listEquipmentGenerals().then((response) => {
            setEquipmentGenerals(response.data);
        }).catch(error => {
            console.error(error);
        });
    }


    function getAllEquipments() {
        listEquipments().then((response) => {
            setEquipments(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewEquipment() {
        navigator('/add-equipment');
    }

      function updateEquipment(id) {
    navigator(`/edit-equipment/${id}`);
  }

    function removeEquipment(id) {
        console.log(id);
        deleteEquipment(id).then((response) => {
            getAllEquipments();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Equipments</h2>
            <button className="btn btn-primary mb-2" onClick={addNewEquipment}>
                Adicionar Equipamento
            </button>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Id:</th>
                    <th>Fabricante do equipamento:</th>
                    <th>Modelo do equipamento:</th>
                    <th>Descrição:</th>
                    <th>Data de Instalação:</th>
                    <th>Setor do equipamento:</th>
                    <th>Batismo:</th>
                    <th>Ações:</th>
                </tr>
                </thead>
 <tbody>
                    {equipments.map((equipment) => {
                        const correspondingEquipmentGeneral = equipmentGenerals.find(
                            (general) => general.id === equipment.equipmentGeneralId
                        );

                        return (
                            <tr key={equipment.id}>
                                <td>{equipment.id}</td>
                                <td>{correspondingEquipmentGeneral?.equipmentManufacturer}</td>
                                <td>{correspondingEquipmentGeneral?.equipmentModel}</td>
                                <td>{correspondingEquipmentGeneral?.description}</td>
                                <td>{equipment.installationDate}</td>
                                <td>{equipment.equipmentSector}</td>
                                <td>{equipment.baptism}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateEquipment(equipment.id)}>
                                        Atualizar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeEquipment(equipment.id)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <thead>
                </thead>
            </table>
        </div>
    );
}

export default EquipmentListComponent;
