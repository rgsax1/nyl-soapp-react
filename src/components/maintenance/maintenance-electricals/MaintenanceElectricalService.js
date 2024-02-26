import axios from "axios";

const MAINTENANCE_ELECTRICAL_API = 'http://localhost:8080/api/v1/maintenance-electricals';

export const listMaintenanceElectricals = () => axios.get(MAINTENANCE_ELECTRICAL_API);

export const createMaintenanceElectricals = (maintenanceElectrical) => axios.post(MAINTENANCE_ELECTRICAL_API, maintenanceElectrical);

export const getMaintenanceElectrical = (maintenanceElectricalId) => axios.get(MAINTENANCE_ELECTRICAL_API + '/' + maintenanceElectricalId);

export const updateMaintenanceElectrical = (maintenanceElectricalId, maintenanceElectrical) => axios.put (MAINTENANCE_ELECTRICAL_API + '/' + maintenanceElectricalId, maintenanceElectrical);

export const deleteMaintenanceElectrical = (maintenanceElectricalId) => axios.delete(MAINTENANCE_ELECTRICAL_API + '/' + maintenanceElectricalId);