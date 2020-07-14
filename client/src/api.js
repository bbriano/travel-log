const API_URL = 'http://localhost:1106';

export const listLogEntries = async () => {
  const response = await fetch(`${API_URL}/api/logs`);
  const json = response.json();
  return json;
};

export const addNewEntry = async () => {
  // TODO
};
