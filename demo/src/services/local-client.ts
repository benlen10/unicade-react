import axios from 'axios';

export const runScript = async (scriptPath: string) => {
    try {
        const response = await axios.post('http://localhost:3001/run-script', {
            scriptPath
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response ? error.response.data : 'Error running script');
    }
};