export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://thecontrive.com/sitemap.xml",
  };
}