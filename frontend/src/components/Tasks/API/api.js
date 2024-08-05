import axios from "axios";

const token = localStorage.getItem('token');
const id = localStorage.getItem('userId');
export const addTaskApi = async (payload,token,userId) => {
    try {
        // Define headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'id': id
        };

        // Make the POST request with headers
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v2/create-task`, payload, { headers });
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const getTodoTaskApi = async (userId,token) => {
    try {
        // Define headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'id': userId
        };

        // Make the POST request with headers
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v2/all-tasks`, { headers });
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const getInprogressTaskApi = async (userId,token) => {
    try {
        // Define headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'id': userId
        };

        // Make the POST request with headers
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v2/all-tasks/inprogress`, { headers });
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const getCompletedTaskApi = async (userId,token) => {
    try {
        // Define headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'id': userId
        };

        // Make the POST request with headers
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v2/all-tasks/completed`, { headers });
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const updateTaskApi = async (id,payload) => {
    try {
        // Define headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'id': id
        };

        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v2/update-task/${id}`,payload,   {headers});
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};
export const deleteTaskApi = async (id,userId) => {
    try {
        // Define headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'id': userId,
        };

        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v2/delete-task/${id}`,   {headers});
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const updateTaskStatusApi = async (taskId, status) => {
    try {
        // Define headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'id': id
        };

        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v2/tasks/${status}/${taskId}`, {}, { headers });
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};
