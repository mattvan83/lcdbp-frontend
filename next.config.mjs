/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/**`,
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Or any other appropriate limit
    },
  },
};

export default nextConfig;
