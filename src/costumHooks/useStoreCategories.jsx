import axios from 'axios';

function useStoreCategories() {
  const handleClick = async (categoryIds) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:8000/api/category', { category_ids: categoryIds }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return [handleClick];
}

export default useStoreCategories;
