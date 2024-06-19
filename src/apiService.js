//This file will handle the routing for the backend logic
import axios from "axios"

const baseURL = "http://localhost:5000/api";

export const getPatients = async () =>{
    try {
        const response = await axios.get(`${baseURL}/patients`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch patients", error);
    }
};

export const addPatient = async (patientData) => {
    try {
        const response = await axios.post(`${baseURL}/patients`, patientData);
        return response.data;
    } catch (error) {
        console.error("Failed to add patient", error);
    }
};

export const getVaccines = async () =>{
    try {
        const response = await axios.get(`${baseURL}/vaccines`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch vaccines", error);
    }
};

export const addVaccine = async (vaccineData) => {
    try {
        console.log(vaccineData, "in apiService file");
        const response = await axios.post(`${baseURL}/vaccines`, vaccineData);
        return response.data;
    } catch (error) {
        console.error("Failed to add vaccine [API Service file]", error);
    }
};

export const addDoses = async (vaccineId, doses) => {
    try {
        const response = await axios.post(`${baseURL}/vaccine/addDoses`, {vaccineId, doses});
        return response.data;
    } catch (error) {
        console.error("Failed to add doses", error);
    }
};

export const updateVaccine = async (vaccineId, updateData) => {
    try {
        const response = await axios.put(`${baseURL}/vaccines/${vaccineId}`, updateData);
        return response.data;
    } catch (error) {
        console.error("Failed to update vaccine", error);
    }
}