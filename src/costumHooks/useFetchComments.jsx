import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchComments = (pinId) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const options = {
          url: `http://localhost:8000/api/pin/${pinId}/comment`,
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        };
        const response = await axios(options);
        console.log(response.data.comments)
        setComments(response.data.comments);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    
    fetchComments();

    // Listen for the NewComment event
    window.Echo.channel(`pin.${pinId}`)
      .listen('NewComment', (e) => {
        fetchComments();
      });

    // Clean up the event listener when the component is unmounted
    return () => {
      window.Echo.leaveChannel(`pin.${pinId}`);
    }
  }, [pinId]);

  return { comments, error, loading };
}

export default useFetchComments;
