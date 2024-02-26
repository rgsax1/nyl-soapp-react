import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    deleteMaintenanceElectrical, listMaintenanceElectricals, updateMaintenanceElectrical
} from "./MaintenanceElectricalService.js";

const ListMaintenanceElectricalComponent = () => {
    const [maintenanceElectricals, setMaintenanceElectricals] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllMaintenanceElectricals();
    }, []);

    function getAllMaintenanceElectricals() {
        listMaintenanceElectricals().then((response) => {
            setMaintenanceElectricals(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function updateMaintenanceElectrical(id) {
        navigator(`/edit-maintenance-electrical/${id}`)
    }

    function addNewMaintenanceElectrical() {
        navigator('/add-maintenance-electrical')
    }

    function removeMaintenanceElectrical(id) {
        console.log(id);
        deleteMaintenanceElectrical(id).then((response) => {
            getAllMaintenanceElectricals();
        }).catch(error => {
            console.error(error);
        })
    }

    return (<div className="container">
        <h2 className="text-center">Lista de manutenções elétricas</h2>
        <button className="btn btn-primary mb-2" onClick={addNewMaintenanceElectrical}>Adicionar manutenção
            elétrica
        </button>
        <table className="table table-striped table-bordered">
            <thead>
            <tr>
                <th>Id:</th>
                <th>Manutenção elétrica</th>
                <th>Ações:</th>
            </tr>
            </thead>

            <tbody>
            {maintenanceElectricals.map(maintenanceElectrical => <tr key={maintenanceElectrical.id}>
                <td>{maintenanceElectrical.id}</td>
                <td>{maintenanceElectrical.type}</td>
                <td>
                    <button className="btn btn-info"
                            onClick={() => updateMaintenanceElectrical(maintenanceElectrical.id)}>
                        Atualizar
                    </button>
                    <button className="btn btn-danger"
                            onClick={() => removeMaintenanceElectrical(maintenanceElectrical.id)}
                            style={{marginLeft: '10px'}}>
                        Deletar
                    </button>
                </td>
            </tr>)}
            </tbody>
        </table>
    </div>)
}

export default ListMaintenanceElectricalComponent;