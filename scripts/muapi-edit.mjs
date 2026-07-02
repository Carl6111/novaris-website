#!/usr/bin/env node
/**
 * MuAPI Logo-Edit → hyperrealistisches Roboter-Auge (Flux Kontext Pro i2i).
 *
 * Flow: Logo hochladen (/upload_file) → URL → /flux-kontext-pro-i2i → poll
 *       /predictions/{id}/result → Ergebnis nach public/images/logo-iris.png
 *
 * Key aus .env.local (MUAPIAPP_API_KEY), nie aus Argumenten/Chat.
 *   node scripts/muapi-edit.mjs
 */

import { readFileSync, writeFileSync, existsSync, openAsBlob } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const BASE = "https://api.muapi.ai/api/v1";
const MODEL = process.env.MODEL || "flux-kontext-pro-i2i";
const INPUT_LOGO = resolve(ROOT, "..", "logo.novaris.png"); // ~/Downloads/logo.novaris.png
const OUT = resolve(ROOT, process.env.OUT_NAME || "public/images/logo-iris.png");

const PROMPT = process.env.EYE_PROMPT_FILE
  ? readFileSync(process.env.EYE_PROMPT_FILE, "utf8")
  : process.env.EYE_PROMPT || `Keep this exact logo: same almond eye shape, same silhouette, same
composition, the same three small circuit traces on the right, same proportions and
placement. Do not redesign it and do not add new elements or background scenery.
Render the SAME logo in hyper-realistic, premium 3D quality — still instantly the
same minimal logo, only now real, dimensional and high-end. The almond eye outline
becomes a smoothly sculpted three-dimensional frame of dark brushed metal with subtle
realistic highlights; the three circuit traces become real raised metallic traces
with small glowing round nodes, kept exactly where they are. In the center, turn the
disc into a hyper-realistic ROBOTIC iris that clearly looks like a machine eye:
concentric mechanical camera-aperture blades, machined sensor rings with fine grooves,
tiny screws and seams, faint circuitry — built from neutral dark metal. The iris
EMITS a bright COLD ICE-BLUE glow: pale icy electric-blue energy and data streams
flowing through thin glowing channels and along the ring, with a soft luminous bloom,
as if cold current and live data pulse through it. At the exact center a perfectly
round pupil rendered as solid pure black, completely empty — no glow, no reflection,
no detail inside it, precisely circular and centered. Keep the background clean,
uniform and plain so it can be cut out later. Hyper-realistic, sharp, premium,
cinematic lighting. No text, no clutter, no extra objects.`;

function apiKey() {
  if (process.env.MUAPIAPP_API_KEY) return process.env.MUAPIAPP_API_KEY;
  const envPath = resolve(ROOT, ".env.local");
  const line = readFileSync(envPath, "utf8")
    .split("\n")
    .find((l) => l.trim().startsWith("MUAPIAPP_API_KEY="));
  if (!line) throw new Error("MUAPIAPP_API_KEY fehlt in .env.local");
  return line.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function uploadLogo(key) {
  const blob = await openAsBlob(INPUT_LOGO, { type: "image/png" });
  const fd = new FormData();
  fd.append("file", blob, "logo.png");
  const res = await fetch(`${BASE}/upload_file`, {
    method: "POST",
    headers: { "x-api-key": key },
    body: fd,
  });
  if (!res.ok) throw new Error(`Upload ${res.status}: ${await res.text()}`);
  const j = await res.json();
  if (!j.url) throw new Error(`Keine URL im Upload-Response: ${JSON.stringify(j)}`);
  return j.url;
}

async function main() {
  const key = apiKey();
  if (!existsSync(INPUT_LOGO)) throw new Error(`Logo fehlt: ${INPUT_LOGO}`);
  const headers = { "Content-Type": "application/json", "x-api-key": key };

  const mode = process.env.MODE || "i2i";
  let body;
  if (mode === "t2i") {
    console.log(`[muapi] Text→Bild (${MODEL})…`);
    body = { prompt: PROMPT, aspect_ratio: "1:1", num_images: 1 };
  } else {
    console.log("[muapi] Logo hochladen…");
    const imageUrl = await uploadLogo(key);
    console.log("[muapi] Logo-URL:", imageUrl);
    console.log(`[muapi] Edit (${MODEL})…`);
    body = {
      prompt: PROMPT,
      images_list: [imageUrl],
      aspect_ratio: "1:1",
      num_images: 1,
    };
  }
  const submit = await fetch(`${BASE}/${MODEL}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const submitText = await submit.text();
  if (!submit.ok) throw new Error(`Submit ${submit.status}: ${submitText}`);
  const submitJson = JSON.parse(submitText);
  console.log("[muapi] submit:", JSON.stringify(submitJson).slice(0, 300));

  const requestId =
    submitJson.request_id ??
    submitJson.requestId ??
    submitJson.data?.request_id ??
    submitJson.id;
  if (!requestId) throw new Error("Keine requestId gefunden.");
  console.log("[muapi] requestId:", requestId);

  let outputs = null;
  for (let i = 0; i < 80; i++) {
    await sleep(3000);
    const res = await fetch(`${BASE}/predictions/${requestId}/result`, {
      headers,
    });
    const json = await res.json();
    const status = json.data?.status ?? json.status;
    process.stdout.write(`\r[muapi] status: ${status}    `);
    if (status === "completed") {
      outputs = json.data?.outputs ?? json.outputs;
      break;
    }
    if (status === "failed") {
      throw new Error(`\nfailed: ${JSON.stringify(json).slice(0, 400)}`);
    }
  }
  console.log("");
  if (!outputs?.length) throw new Error("Keine outputs (Timeout?).");

  console.log("[muapi] Ergebnis-URL:", outputs[0]);
  const img = await fetch(outputs[0]);
  const buf = Buffer.from(await img.arrayBuffer());
  writeFileSync(OUT, buf);
  console.log(`[muapi] gespeichert: ${OUT} (${buf.length} bytes)`);
}

main().catch((e) => {
  console.error("\n[muapi] FEHLER:", e.message);
  process.exit(1);
});
