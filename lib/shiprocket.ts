export async function getShiprocketToken() {
  const response = await fetch(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "rajdalpat5444@gmail.com",
        password: "sg*3PiF&e9J$Eq!*$ZQeOm*dO1UpU56!",
      }),
    },
  );
  
  const data = await response.json();

  if (!data.token) {
    throw new Error("Shiprocket token not generated");
  }

  return data.token;
}

export async function createShiprocketOrder(token: string, order: any) {
  const response = await fetch(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    },
  );

  return response.json();
}


export async function generateAWB(
  token: string,
  shipmentId: string
) {
  const response = await fetch(
    "https://apiv2.shiprocket.in/v1/external/courier/assign/awb",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shipment_id: shipmentId,
      }),
    }
  );

  return response.json();
}


export async function requestPickup(
  token: string,
  shipmentId: string
) {
  const response = await fetch(
    "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shipment_id: [shipmentId],
      }),
    }
  );

  return response.json();
}

export async function getTracking(
  token: string,
  awbCode: string
) {
  const response = await fetch(
    `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbCode}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}


export async function generateLabel(
  token: string,
  shipmentId: string
) {
  const response = await fetch(
    "https://apiv2.shiprocket.in/v1/external/courier/generate/label",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shipment_id: [shipmentId],
      }),
    }
  );

  return response.json();
}


export async function generateInvoice(
  token: string,
  orderId: string
) {
  const response = await fetch(
    "https://apiv2.shiprocket.in/v1/external/orders/print/invoice",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: [orderId],
      }),
    }
  );

  return response.json();
}


export async function getShippingRates(
  token: string,
  query: URLSearchParams
) {
  const response = await fetch(
    `https://apiv2.shiprocket.in/v1/external/courier/serviceability?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export async function getShippingRate(
  token: string,
  payload: {
    pickup_postcode: string;
    delivery_postcode: string;
    weight: number;
    length: number;
    breadth: number;
    height: number;
    cod: number;
  }
) {
  const response = await fetch(
    "https://apiv2.shiprocket.in/v1/external/courier/serviceability/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const url = new URL(
    "https://apiv2.shiprocket.in/v1/external/courier/serviceability/"
  );

  url.searchParams.append(
    "pickup_postcode",
    payload.pickup_postcode
  );

  url.searchParams.append(
    "delivery_postcode",
    payload.delivery_postcode
  );

  url.searchParams.append(
    "weight",
    payload.weight.toString()
  );

  url.searchParams.append(
    "cod",
    payload.cod.toString()
  );

  url.searchParams.append(
    "length",
    payload.length.toString()
  );

  url.searchParams.append(
    "breadth",
    payload.breadth.toString()
  );

  url.searchParams.append(
    "height",
    payload.height.toString()
  );

  const rateResponse = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return rateResponse.json();
}