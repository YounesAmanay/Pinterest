import { useState } from "react";
import axios from "axios";

function useDeleteSearchHistory() {
  const [isDeleted, setIsDeleted] = useState(false);  
 
  const deleteSearchHistory = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
      console.log(id)
      await axios.delete(`http://localhost:8000/api/search/history/${id}`, options);
      setIsDeleted(!isDeleted);
    } catch (error) {
      console.error(error);
    }
  };

  return { isDeleted, deleteSearchHistory };
}

export default useDeleteSearchHistory;
