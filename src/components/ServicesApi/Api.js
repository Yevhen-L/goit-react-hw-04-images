import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38983317-2cdf068ca906dc85bbb8e8b48';

export const getImage = async (value, page) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return data;
  } catch (error) {
    throw new Error('Ooops Error');
  }
};
