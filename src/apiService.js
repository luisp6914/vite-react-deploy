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

export const addSecondDose = async (patient) =>{
    //console.log(patient, "[apiService file]");
    try {
        const response = await axios.patch(`${baseURL}/patients/secondDose`, patient);
        return response.date;
    } catch (error) {
        console.error("Failed to Add second Dose [apiServices file]", error)
    }
}

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

export const getVaccineById = async (id) => {
    try {
        console.log("apiServices fiel [Line 35]", id);
        const response = await axios.get(`${baseURL}/vaccines/getVaccine/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching vaccine by ID: ${id}`, error)
    }
}

export const addVaccine = async (vaccineData) => {
    try {
        //VaccineData
        //console.log(vaccineData, "in apiService file");
        const response = await axios.post(`${baseURL}/vaccines`, vaccineData);
        return response.data;
    } catch (error) {
        console.error("Failed to add vaccine [API Service file]", error);
    }
};

export const addDoses = async (vaccineId, doses) => {
    try {
        const response = await axios.post(`${baseURL}/vaccines/addDoses`, {vaccineId, doses});
        return response.data;
    } catch (error) {
        console.error("Failed to add doses [apiService.js file line 49]", error);
    }
};

export const updateVaccine = async (vaccineId, updateData) => {
    try {
        const response = await axios.put(`${baseURL}/vaccines/editVaccine/${vaccineId}`, updateData);
        return response.data;
    } catch (error) {
        console.error("Failed to update vaccine", error);
    }
}