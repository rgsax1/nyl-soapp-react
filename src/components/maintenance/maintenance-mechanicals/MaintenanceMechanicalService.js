import axios from "axios";

const MAINTENANCE_MECHANICAL_API = 'http://localhost:8080/api/v1/maintenance-mechanicals';

export const listMaintenanceMechanicals = () => axios.get(MAINTENANCE_MECHANICAL_API);

export const createMaintenanceMechanicals = (maintenanceMechanical) => axios.post(MAINTENANCE_MECHANICAL_API, maintenanceMechanical);

export const getMaintenanceMechanical = (maintenanceMechanicalId) => axios.get(MAINTENANCE_MECHANICAL_API + '/' + maintenanceMechanicalId);

export const updateMaintenanceMechanical = (maintenanceMechanicalId, maintenanceMechanical) => axios.put (MAINTENANCE_MECHANICAL_API + '/' + maintenanceMechanicalId, maintenanceMechanical);

export const deleteMaintenanceMechanical = (maintenanceMechanicalId) => axios.delete(MAINTENANCE_MECHANICAL_API + '/' + maintenanceMechanicalId);