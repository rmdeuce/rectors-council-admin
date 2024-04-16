import { DataProvider, fetchUtils } from 'react-admin';

const API_URL = import.meta.env.VITE_JSON_SERVER_URL

const getTokenFromLocalStorage = () => {
  const authString = localStorage.getItem('auth');
  const authStringObj = JSON.parse(authString);
  return authStringObj.access_token;
}

export const dataProvider: DataProvider = {
  getList: async (resource) => {
    const response = await fetchUtils.fetchJson(`${API_URL}/${resource}/GetAll`);
    return {
      data: response.json['councils'],
      total: parseInt(response.headers.get("x-total-count") || "", 10),
    };
  },
  getOne: async (resource, params) => {
    const response = await fetchUtils.fetchJson(
      `${API_URL}/${resource}/Get/${params.id}`
    );
    return { data: response.json };
  },
  update: async (resource, params) => {
    const accessToken = getTokenFromLocalStorage();
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const response = await fetchUtils.fetchJson(
      `${API_URL}/${resource}/Update`,
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(params.data)
      }
    );
    return { data: response.json };
  },
  delete: async (resource, params) => {
    const accessToken = getTokenFromLocalStorage();
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    const response = await fetchUtils.fetchJson(
      `${API_URL}/${resource}/Delete/${params.id}`,
      {
        method: "DELETE",
        headers: headers
      }
    );
    return { data: response.json };
  },
  deleteMany: async (resource, { ids }) => {
    const accessToken = getTokenFromLocalStorage();
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const requests = ids.map((id) => ({
      method: 'DELETE',
      headers: headers
    }));

    const responses = await Promise.allSettled(requests.map((request) => {
      const { method, headers } = request;
      const url = `${API_URL}/${resource}/Delete/${params.id}`; // Предполагаю, что params.id должно быть заменено на конкретный ID

      return fetchUtils.fetchJson(url, {
        method,
        headers
      });
    }));

    // Преобразуем ответы в массив данных
    const data = responses.map((res) => res.value?.json).filter(Boolean);

    return { data };
  }
}