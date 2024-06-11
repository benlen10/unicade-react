import { useState } from 'react';
import { runScript } from '../services/local-client';

const useRunScript = () => {
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);

    const handleRunScript = async (scriptPath: string) => {
        try {
            const result = await runScript(scriptPath);
            setOutput(result);
            setError(null);
        } catch (err: any) {
            setOutput('');
            setError(err.message);
        }
    };

    return { output, error, handleRunScript };
};

export default useRunScript;