import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    deleteMaintenanceMechanical, listMaintenanceMechanicals, updateMaintenanceMechanical
} from "./MaintenanceMechanicalService.js";

const ListMaintenanceMechanicalComponent = () => {
    const [maintenanceMechanicals, setMaintenanceMechanicals] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllMaintenanceMechanicals();
    }, []);

    function updateMaintenanceMechanical(id) {
        navigator(`/edit-maintenance-mechanical/${id}`)
    }

    function getAllMaintenanceMechanicals() {
        listMaintenanceMechanicals().then((response) => {
            setMaintenanceMechanicals(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewMaintenanceMechanical() {
        navigator('/add-maintenance-mechanical')
    }

    function removeMaintenanceMechanical(id) {
        console.log(id);
        deleteMaintenanceMechanical(id).then((response) => {
            getAllMaintenanceMechanicals();
        }).catch(error => {
            console.error(error);
        })
    }

    return (<div className="container">
        <h2 className="text-center">Lista de manutenções mecânicas</h2>
        <button className="btn btn-primary mb-2" onClick={addNewMaintenanceMechanical}>Adicionar manutenção
            mecânica
        </button>
        <table className="table table-striped table-bordered">
            <thead>
            <tr>
                <th>Id:</th>
                <th>Manutenção mecânica</th>
                <th>Ações:</th>
            </tr>
            </thead>

            <tbody>
            {maintenanceMechanicals.map(maintenanceMechanical => <tr key={maintenanceMechanical.id}>
                <td>{maintenanceMechanical.id}</td>
                <td>{maintenanceMechanical.type}</td>
                <td>
                    <button className="btn btn-info"
                            onClick={() => updateMaintenanceMechanical(maintenanceMechanical.id)}>
                        Atualizar
                    </button>
                    <button className="btn btn-danger"
                            onClick={() => removeMaintenanceMechanical(maintenanceMechanical.id)}
                            style={{marginLeft: '10px'}}>
                        Deletar
                    </button>
                </td>
            </tr>)}
            </tbody>
        </table>
    </div>)
}

export default ListMaintenanceMechanicalComponent;