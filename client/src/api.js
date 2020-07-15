const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:1106'
    : 'https://travel-log-nu.vercel.app';

export const listLogEntries = async () => {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
};

export const addLogEntry = async (logEntry) => {
  const { apiKey } = logEntry;
  delete logEntry.apiKey;
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': apiKey,
    },
    body: JSON.stringify(logEntry),
  });

  const json = await response.json();
  if (!response.ok) {
    throw Error(json.message);
  }
  return json;
};

export const deleteLogEntry = async (id) => {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id: id }),
  });

  const json = await response.json();
  if (!response.ok) {
    throw Error(json.message);
  }
  return json;
};
