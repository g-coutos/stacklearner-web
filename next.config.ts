import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	crossOrigin: "anonymous",
	images: {
		domains: ["avatars.githubusercontent.com"],
	},
};

export default nextConfig;
