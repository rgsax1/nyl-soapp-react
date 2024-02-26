import axios from "axios";

const EQUIPMENTGENERAL_REST_API_BASE_URL = 'http://localhost:8080/api/v1/equipment-generals';

export const listEquipmentGenerals = () => axios.get(EQUIPMENTGENERAL_REST_API_BASE_URL);
export const createEquipmentGeneral = (equipmentGeneral) => axios.post(EQUIPMENTGENERAL_REST_API_BASE_URL, equipmentGeneral);
export const getEquipmentGeneral = (equipmentGeneralId) => axios.get(`${EQUIPMENTGENERAL_REST_API_BASE_URL}/${equipmentGeneralId}`);
export const updateEquipmentGeneral = (equipmentGeneralId, equipmentGeneral) => axios.put(EQUIPMENTGENERAL_REST_API_BASE_URL + '/' + equipmentGeneralId, equipmentGeneral);
export const deleteEquipmentGeneral = (equipmentGeneralId) => axios.delete(`${EQUIPMENTGENERAL_REST_API_BASE_URL}/${equipmentGeneralId}`);



