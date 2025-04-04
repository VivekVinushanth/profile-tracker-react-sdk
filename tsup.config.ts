// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    target: "es2020",
    sourcemap: true,
    clean: true,
    jsx: "preserve", // <-- prevent it from trying to resolve JSX runtime
    external: ["react", "react-dom", "react/jsx-runtime"], // <-- prevent bundling
});
