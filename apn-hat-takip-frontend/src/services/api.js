
const API_URL = "http://localhost:5000/api";

export async function getSimCards() {
  const res = await fetch(`${API_URL}/sim-cards`);
  return res.json();
}

export async function getCustomers() {
  const res = await fetch(`${API_URL}/customers`);
  return res.json();
}

// Diğer endpointler için benzer fonksiyonlar ekleyin