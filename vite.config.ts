import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    host: "speak",
    port: 3216,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "certs/https-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "certs/https.pem")),
    },
  },
});
