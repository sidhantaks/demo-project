// fetch("https://dummyjson.com/products")
export const DOMAIN = process.env.REACT_APP_DOMAIN;
export const PRODUCTS_ENDPOINT = process.env.REACT_APP_PRODUCTS_ENDPOINT;


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

  // Create a new product (data should be an object)
  create: async (data) => {
    const url = getEndPointUrl(DOMAIN, PRODUCTS_ENDPOINT);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Update a product by id (data should be an object)
  update: async (id, data) => {
    const url = getEndPointUrl(DOMAIN, `${PRODUCTS_ENDPOINT}/${id}`);
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Delete a product by id
  remove: async (id) => {
    const url = getEndPointUrl(DOMAIN, `${PRODUCTS_ENDPOINT}/${id}`);
    const res = await fetch(url, { method: "DELETE" });
    return res.json();
  },
};