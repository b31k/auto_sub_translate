const path = require("path");
const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const processfiles = require("./processfiles");
const opensubtitles = require("./opensubtitles");
const connection = require("./connection");
const languages = require("./languages");

// Usa la API Key desde variable de entorno
const apikeyValue = process.env.DEEPL_API_KEY;
const apikey = {
  checkapikey: async () => apikeyValue ? 100 : false, // dummy check
};

const builder = new addonBuilder({
  id: "org.autotranslate.sonsuzanime",
  version: "1.0.1",
  name: "Auto Subtitle Translate by SonsuzAnime",
  logo: "https://stremioaddon.sonsuzanime.com/subtitles/logo.png",
  configurable: true,
  behaviorHints: { configurable: true, configurationRequired: true },
  config: [
    { key: "translateto", title: "Translate to", type: "select", required: true, options: languages.getAllValues() },
    { key: "apikey", title: "API Key", type: "text", required: true },
  ],
  description: "Addon que traduce subtítulos desde OpenSubtitlesV3",
  types: ["series","movie"],
  catalogs: [],
  resources: ["subtitles"],
});

builder.defineSubtitlesHandler(async function(args){
  const { id, config } = args;
  // Aquí puedes integrar tu lógica de traducción real
  return { subtitles: [] }; // placeholder
});

const port = process.env.PORT || 3000;
const address = process.env.ADDRESS || "0.0.0.0";

// Servir el addon con CORS habilitado
serveHTTP(builder.getInterface(), {
  port,
  address,
  cacheMaxAge: 10,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  }
});
