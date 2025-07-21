import CryptoJS from "crypto-js";
export const DOMAIN = process.env.REACT_APP_DOMAIN;
export const PRODUCTS_ENDPOINT = process.env.REACT_APP_PRODUCTS_ENDPOINT;
export const USERS_ENDPOINT = process.env.REACT_APP_USERS_ENDPOINT;
export const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
export const CRYPTO_SECRET = process.env.REACT_APP_CRYPTO_SECRET;

export const encrypt = (payload) => {
  return CryptoJS.AES.encrypt(payload, CRYPTO_SECRET).toString();
}

// Returns the complete URL for the products endpoint
export function getEndPointUrl(domain, endpoint) {
  return `${domain}${endpoint}`;
}

// Helper function for error handling
async function handleApiRequest(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "API Error");
    }
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw { error: error.message || "Unknown error" };
  }
}

// Generic CRUD operations for products
export const crudApi = {
  // Get all products or a single product by id
  get: async (domain, endpoint) => {
    const url = getEndPointUrl(domain, endpoint);
    return handleApiRequest(url);
  },

  // Create a new 
  create: async (domain, endpoint, payload) => {
    const url = getEndPointUrl(domain, endpoint);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  // Update a product by id (data should be an object)
  update: async (domain, endpoint, payload) => {
  const url = getEndPointUrl(domain, endpoint);
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
  },

  // Delete a product by id
  remove: async (domain, endpoint) => {
  const url = getEndPointUrl(domain, endpoint);
  const res = await fetch(url, { method: "DELETE" });
  return res.json();
},
};