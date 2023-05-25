import { useState } from 'react';
import axios from 'axios';

const useDeleteComment = (pinId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteComment = async (commentId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const options = {
        url: `http://localhost:8000/api/pin/${pinId}/comment/${commentId}`,
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
      await axios(options);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return { loading, error, deleteComment };
}

export default useDeleteComment;
