/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split("/")[1]
  : "";
const isUserOrOrgSite = repoName.endsWith(".github.io");
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath =
  isGithubActions && repoName && !isUserOrOrgSite ? `/${repoName}` : "";
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
};
module.exports = nextConfig;
