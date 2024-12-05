import axios from 'axios';

const API_URL = 'https://ems-backend-2.vercel.app/'; // Flask API URL

// Function to get all employees
export async function getEmployees() {
    try {
        const response = await axios.get(`${API_URL}/employees`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
}

// Function to add an employee
export async function addEmployee(employee) {
    try {
        const response = await axios.post(`${API_URL}/employee`, employee);
        return response.data;
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
}

// Function to update an employee
export async function updateEmployee(id, updatedData) {
    try {
        const response = await axios.put(`${API_URL}/employee/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
}

// Function to delete an employee
export async function deleteEmployee(id) {
    try {
        const response = await axios.delete(`${API_URL}/employee/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
}

// Function to generate the employee report
export async function generateReport() {
    try {
        const response = await axios.get(`${API_URL}/report`);
        return response.data;
    } catch (error) {
        console.error('Error generating report:', error);
        throw error;
    }
}
