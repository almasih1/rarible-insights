import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const host = req.headers.host || "www.rariblenomads.info";
  const proto = (req.headers["x-forwarded-proto"] as string) || "https";

  // Определяем destination в зависимости от пути
  const path = req.url || "";
  let destination = `${proto}://${host}/digital-nomad-relocation/relocation-checklist-for-digital-nomads`;

  res.statusCode = 301;
  res.setHeader("Location", destination);
  res.setHeader("Cache-Control", "no-store");
  res.end();
}
