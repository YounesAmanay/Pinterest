import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useFetchPin = (id) => {
  const [pin, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isTrue ,setIsTrue ]=useState(false) 
  const authId = useSelector((state) => state.authUser);
  

  useEffect(() => {
    const fetchPin = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const options = {
          url: `http://localhost:8000/api/pin/${id}`,
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        };
        const response = await axios(options);
        setData(response.data);
        if( authId === pin.user_id){setIsTrue(true)} ;
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchPin();
  }, [id]);

  return { pin,isTrue, error, loading };
}

export default useFetchPin;
