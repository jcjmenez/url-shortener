import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}/api/urls`;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newUrl) => {
  const request = axios.post(baseUrl, newUrl);
  return request.then((response) => response.data);
};

export default { getAll, create };
