import axios from "axios";

const USER_REST_API_BASE_URL = 'http://localhost:8080/api/v1/orders';

export const listOrders = ()=> axios.get(USER_REST_API_BASE_URL);

export const createOrder = (order) => axios.post(USER_REST_API_BASE_URL, order);

export const getOrder = (orderId) => axios.get(USER_REST_API_BASE_URL + '/' + orderId);

export const updateOrder = (orderId, order) => axios.put(USER_REST_API_BASE_URL + '/' +orderId, order);

export const deleteOrder = (orderId) => axios.delete(USER_REST_API_BASE_URL + '/' + orderId);

