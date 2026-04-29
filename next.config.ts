// // next.config.js
// const path = require("path");

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     turbopack: {
//       // Set this to the directory containing your main node_modules/next
//       root: path.join(__dirname, "../../"),
//     },
//   },
// };

// module.exports = nextConfig;

import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Move from experimental.turbo to top-level turbopack
  turbopack: {
    root: path.join(__dirname), // Sets root to the current project directory
  },
};

export default nextConfig;
