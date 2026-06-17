import crypto from "crypto";

export async function shiprocketProductWebhook(
  product: any
) {
  const apiKey =
    process.env.SHIPROCKET_API_KEY!;

  const secret =
    process.env.SHIPROCKET_SECRET_KEY!;

  const payload = {
    id: product.id,

    title: product.title,

    body_html:
      product.description || "",

    vendor:
      product.brand || "",

    product_type:
      product.collection || "",

    updated_at:
      new Date().toISOString(),

    status: "active",

    variants:
      product.variants.map(
        (variant: any) => ({
          id: variant.id,

          title:
            variant.color || "",

          price: String(
            variant.sellingPrice
          ),

          quantity:
            variant.stock,

          sku: variant.sku,

          updated_at:
            new Date().toISOString(),

          image: {
            src:
              variant.images?.[0]
                ?.url || "",
          },

          weight:
            variant.weight || 0,
        })
      ),

    image: {
      src:
        product.variants?.[0]
          ?.images?.[0]?.url || "",
    },
  };

  const body =
    JSON.stringify(payload);

  // HMAC
  const hmac =
    crypto
      .createHmac(
        "sha256",
        secret
      )
      .update(body)
      .digest("base64");

  const res = await fetch(
    "https://checkout-api.shiprocket.com/wh/v1/custom/product",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",

        "X-Api-Key":
          apiKey,

        "X-Api-HMAC-SHA256":
          hmac,
      },
      body,
    }
  );

  const text =
    await res.text();

  console.log(
    "Shiprocket webhook:",
    res.status,
    text
  );

  if (!res.ok) {
    throw new Error(text);
  }

  return text;
}