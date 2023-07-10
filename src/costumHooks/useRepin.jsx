import { useState } from 'react';
import axios from 'axios';

function useRepin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const repin = async (pinId, boardId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`http://localhost:8000/api/repin/${pinId}`, { board_id: boardId });
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            setError(err.response.data);
        }
    };

    return { repin, loading, error };
}

export default useRepin;