const API_URL = 'https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT';

const API_ENDPOINTS = {
  posts: '/posts',
  register: '/users/register',
  login: '/users/login',
  user: '/users/me',
};

const getURL = (endPoint) => {
  const path = API_ENDPOINTS[endPoint];
  if (!path) {
    throw new Error('Invalid endpoint');
  }
  return API_URL + path;
};

const getOptions = (method, body, token) => ({
  method: method ? method.toUpperCase() : 'GET',
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
  ...(body && { body: JSON.stringify(body) }),
});

export const fetchFromApi = async ({ endPoint, method, body, token }) => {
  try {
    const result = await fetch(
      getURL(endPoint),
      getOptions(method, body, token)
    );
    const response = await result.json();
    if (response.error) {
      alert(response.error.message);
      throw response.error;
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
