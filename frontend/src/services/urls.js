import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/urls';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newUrl) => {
  const request = axios.post(baseUrl, newUrl);
  return request.then((response) => response.data);
};

export default { getAll, create };
