// Define the types based on the PostEx API Documentation

export interface PostExOrderPayload {
  orderRefNumber: string;
  invoicePayment: number;
  orderDetail?: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  transactionNotes?: string;
  cityName: string;
  invoiceDivision: number;
  items: number;
  pickupAddressCode?: string;
  storeAddressCode?: string;
  orderType: "Normal" | "Reverse" | "Replacement";
}

const POSTEX_BASE_URL = "https://api.postex.pk/services/integration/api/order";
const TOKEN = process.env.POSTEX_API_TOKEN;

const getHeaders = () => {
  if (!TOKEN) throw new Error("POSTEX_API_TOKEN is missing in environment variables.");
  return {
    "Content-Type": "application/json",
    "token": TOKEN, // Required by PostEx API
  };
};

/**
 * Fetch Operational Cities
 * City Type can be: 'Pickup', 'Delivery', or null
 */
export async function getOperationalCities(cityType: string = "Delivery") {
  try {
    const response = await fetch(`${POSTEX_BASE_URL}/v2/get-operational-city?operationalCityType=${cityType}`, {
      method: "GET",
      headers: getHeaders(),
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching operational cities:", error);
    throw error;
  }
}

/**
 * Create a new PostEx Order
 */
export async function createPostExOrder(payload: PostExOrderPayload) {
  try {
    const response = await fetch(`${POSTEX_BASE_URL}/v3/create-order`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating PostEx order:", error);
    throw error;
  }
}

/**
 * Track an Order by Tracking Number
 */
export async function trackPostExOrder(trackingNumber: string) {
  try {
    const response = await fetch(`${POSTEX_BASE_URL}/v1/track-order/${trackingNumber}`, {
      method: "GET",
      headers: getHeaders(),
    });
    return await response.json();
  } catch (error) {
    console.error("Error tracking order:", error);
    throw error;
  }
}

/**
 * Cancel an Order
 */
export async function cancelPostExOrder(trackingNumber: string) {
  try {
    const response = await fetch(`${POSTEX_BASE_URL}/v1/cancel-order`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ trackingNumber }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error canceling order:", error);
    throw error;
  }
}