// // // // import path from "path";
// // // // import { fileURLToPath } from "url";

// // // // const __filename = fileURLToPath(import.meta.url);
// // // // const __dirname = path.dirname(__filename);

// // // // /** @type {import('next').NextConfig} */

// // // // const nextConfig = {
// // // //   output: "export",
// // // //   outputFileTracingRoot: path.join(__dirname),
// // // //   images: {
// // // //     unoptimized: true,
// // // //   },
// // // // };

// // // // export default nextConfig;


// // // import path from "path";
// // // import { fileURLToPath } from "url";

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // /** @type {import('next').NextConfig} */
// // // const nextConfig = {
// // //   outputFileTracingRoot: path.join(__dirname),
// // //   images: {
// // //     unoptimized: true,
// // //   },
// // //   experimental: {
// // //     optimizePackageImports: [
// // //       'lucide-react',
// // //       'framer-motion',
// // //       'react-icons',
// // //     ],
// // //   },
// // // };

// // // export default nextConfig;


// // import path from "path";
// // import { fileURLToPath } from "url";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   outputFileTracingRoot: path.join(__dirname),
// //   images: {
// //     unoptimized: true,
// //   },
// //   experimental: {
// //     optimizePackageImports: [
// //       'lucide-react',
// //       'framer-motion',
// //       'react-icons',
// //     ],
// //   },
// //   // Exclude the stray Onboarding-UI folder from compilation
// //   webpack: (config) => {
// //     config.watchOptions = {
// //       ignored: ['**/Onboarding-UI/**', '**/node_modules/**'],
// //     };
// //     return config;
// //   },
// // };

// // export default nextConfig;


// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   outputFileTracingRoot: path.join(__dirname),
//   images: {
//     unoptimized: true,
//   },
//   experimental: {
//     optimizePackageImports: [
//       'lucide-react',
//       'framer-motion',
//       'react-icons',
//     ],
//   },
// };

// export default nextConfig;



import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'react-icons',
    ],
  },
};

export default nextConfig;