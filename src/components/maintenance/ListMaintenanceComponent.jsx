import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMaintenance, listMaintenances } from "./MaintenanceService.js";
import { listUsers } from "../user/UserService.js";
import { listMaintenanceElectricals } from "./maintenance-electricals/MaintenanceElectricalService.js";
import { listMaintenanceMechanicals } from "./maintenance-mechanicals/MaintenanceMechanicalService.js";
import { format, parseISO } from "date-fns";




const ListMaintenanceComponent = () => {
    const [maintenances, setMaintenances] = useState([]);
    const [users, setUsers] = useState([]);
    const [maintenanceElectricals, setMaintenanceElectricals] = useState([]);
    const [maintenanceMechanicals, setMaintenanceMechanicals] = useState([]);


    const navigator = useNavigate();

    useEffect(() => {
        getAllMaintenances().then((response) => {
            setMaintenances(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    async function getAllMaintenances() {
        try {
            const maintenanceResponse = await listMaintenances();
            setMaintenances(maintenanceResponse.data);

            // Agora, após buscar as manutenções, busque a lista de usuários
            const userResponse = await listUsers();
            setUsers(userResponse.data);

            const maintenanceElectricalResponse = await listMaintenanceElectricals();
            setMaintenanceElectricals(maintenanceElectricalResponse.data);


            const maintenanceMechanicalResponse = await listMaintenanceMechanicals();
            setMaintenanceMechanicals(maintenanceMechanicalResponse.data);

        } catch (error) {
            console.error("Erro ao buscar as manutenções ou a lista de usuários:", error);
        }
    }

    function formatDate(isoDate) {
        if (!isoDate) return ''; // Verifique se a data não está vazia
        const date = parseISO(isoDate, { timeZone: 'America/Sao_Paulo' }); // Configura o fuso horário para GMT-3 (Brasília)
        return format(date, 'dd/MM/yyyy', { timeZone: 'America/Sao_Paulo' }); // Formata no fuso horário desejado
    }
    function addNewMaintenance() {
        navigator('/add-maintenance')
    }

    function updateMaintenance(id) {
        navigator(`/edit-maintenance/${id}`)
    }

    function removeMaintenance(id) {
        console.log(id);
        deleteMaintenance(id)
            .then(() => {
                console.log("Manutenção excluída com sucesso");
                return getAllMaintenances();
            })
            .then((response) => {
                console.log("Lista de manutenções atualizada após exclusão:", response);
            })
            .catch((error) => {
                console.error("Erro ao excluir a manutenção:", error);
            });
    }

    function mapUserIdToUserName(userId, users) {
        const user = users.find(user => user.id === userId);
        return user ? user.userName : "Usuário não encontrado";
    }
    function mapMaintenanceElectricalIdsToTypes(maintenanceElectricalIds, maintenanceElectricals) {
        if (Array.isArray(maintenanceElectricalIds)) {
            return maintenanceElectricalIds.map(id => {
                const maintenanceElectrical = maintenanceElectricals.find(maintenance => maintenance.id === id);
                return maintenanceElectrical ? (
                    <p key={id}>{maintenanceElectrical.type}</p>
                ) : (
                    <p key={id}>Manutenção elétrica não encontrada</p>
                );
            });
        } else {
            return "IDs de manutenção elétrica inválidos";
        }
    }
    


    function mapMaintenanceMechanicallIdsToTypes(maintenanceMechanicalIds, maintenanceMechanicals) {
        if (Array.isArray(maintenanceMechanicalIds)) {
            return maintenanceMechanicalIds.map(id => {
                const maintenanceMechanical = maintenanceMechanicals.find(maintenance => maintenance.id === id);
                return maintenanceMechanical ? (
                    <p key={id}>{maintenanceMechanical.type}</p>
                ) : (
                    <p key={id}>Manutenção mecânica não encontrada</p>
                );
            });
        } else {
            return "IDs de manutenção mecânica inválidos";
        }
    }
    





    return (
        <div className="container">
            <h2 className="text-center">Fichas de Manutenções</h2>
            <button className="btn btn-primary mb-2" onClick={addNewMaintenance}>Criar nova ficha</button>
            <div className="row">
                {maintenances.map((maintenance) => (
                    <div className="col-md-6" key={maintenance.id}>
                        <div className="card maintenance-card">
                            <div className="card-body">
                                <h5 className="card-title"><strong>ID:</strong> {maintenance.id}</h5>
                                <p className="card-text"><strong>Registro:</strong> {maintenance.maintenanceRecord}</p>
                                <p className="card-text"><strong>Revisão:</strong> {maintenance.maintenanceReview}</p>
                                <p className="card-text"><strong>Data de criação:</strong> {formatDate(maintenance.maintenanceEmissionDate)}</p>
                                <p className="card-text"><strong>Aprovado por:</strong> {mapUserIdToUserName(maintenance.userId, users)}</p>
                                <p className="card-text"><strong>Manutenção elétrica:</strong></p>
                                {mapMaintenanceElectricalIdsToTypes(maintenance.maintenanceElectricalIds, maintenanceElectricals).map((id) => (
                                    <p key={id}>{id}</p>
                                ))}
                                <p className="card-text"><strong>Manutenção mecânica:</strong></p>
                                {mapMaintenanceMechanicallIdsToTypes(maintenance.maintenanceMechanicalIds, maintenanceMechanicals).map((id) => (
                                    <p key={id}>{id}</p>
                                ))}
                                <div className="maintenance-actions">
                                    <button className="btn btn-info" onClick={() => updateMaintenance(maintenance.id)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => removeMaintenance(maintenance.id)}>Excluir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
    

}

export default ListMaintenanceComponent;