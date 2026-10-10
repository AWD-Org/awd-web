import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amoxtli",
    short_name: "Amoxtli",
    description: "Studio de software, apps y SaaS en México.",
    start_url: "/",
    display: "browser",
    background_color: "#FBFBFB",
    theme_color: "#FA1F6F",
    lang: "es-MX",
    icons: [
      { src: "/assets/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
