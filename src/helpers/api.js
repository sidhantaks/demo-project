import CryptoJS from "crypto-js";

export const DOMAIN = process.env.REACT_APP_DOMAIN;
export const PRODUCTS_ENDPOINT = process.env.REACT_APP_PRODUCTS_ENDPOINT;
export const USERS_ENDPOINT = process.env.REACT_APP_USERS_ENDPOINT;
export const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
export const CRYPTO_SECRET = process.env.REACT_APP_CRYPTO_SECRET;

export const encrypt = (payload) => {
  return CryptoJS.AES.encrypt(payload, CRYPTO_SECRET).toString();
};

export function getEndPointUrl(domain, endpoint) {
  return `${domain}${endpoint}`;
}

async function handleApiRequest(url, options = {}) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
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

export const crudApi = {
  get: async (domain, endpoint) => {
    const url = getEndPointUrl(domain, endpoint);
    return handleApiRequest(url);
  },

  create: async (domain, endpoint, payload) => {
    const url = getEndPointUrl(domain, endpoint);
    return handleApiRequest(url, {
      method: "POST",
      body: payload,
    });
    // JSON.stringify(payload)
  },

  update: async (domain, endpoint, payload) => {
    const url = getEndPointUrl(domain, endpoint);
    return handleApiRequest(url, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  remove: async (domain, endpoint) => {
    const url = getEndPointUrl(domain, endpoint);
    return handleApiRequest(url, {
      method: "DELETE",
    });
  },
};
