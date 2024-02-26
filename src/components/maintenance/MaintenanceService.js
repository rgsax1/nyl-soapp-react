import axios from "axios";

const MAINTENANCE_REST_API_BASE_URL = 'http://localhost:8080/api/v1/maintenances'; // Altere o URL base para o serviço de manutenção

export const listMaintenances = () => axios.get(MAINTENANCE_REST_API_BASE_URL);

export const createMaintenance = (maintenance) => axios.post(MAINTENANCE_REST_API_BASE_URL, maintenance);

export const getMaintenance = (maintenanceId) => axios.get(MAINTENANCE_REST_API_BASE_URL + '/' +maintenanceId);

export const updateMaintenance = (maintenanceId, maintenance) => axios.put(MAINTENANCE_REST_API_BASE_URL + '/' + maintenanceId, maintenance);

export const deleteMaintenance = (maintenanceId) => axios.delete(MAINTENANCE_REST_API_BASE_URL + '/' + maintenanceId);
