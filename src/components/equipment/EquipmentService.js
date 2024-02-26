import axios from "axios";

const EQUIPMENT_REST_API_BASE_URL = 'http://localhost:8080/api/v1/equipments'; // Altere o URL base para o serviço de equipamentos

export const listEquipments = () => axios.get(EQUIPMENT_REST_API_BASE_URL);
export const createEquipment = (equipment) => axios.post(EQUIPMENT_REST_API_BASE_URL, equipment);
export const getEquipment = (equipmentId) => axios.get(EQUIPMENT_REST_API_BASE_URL + '/' + equipmentId);
export const updateEquipment = (equipmentId, equipment) => axios.put(EQUIPMENT_REST_API_BASE_URL + '/' + equipmentId, equipment);
export const deleteEquipment = (equipmentId) => axios.delete(EQUIPMENT_REST_API_BASE_URL + '/' + equipmentId);



