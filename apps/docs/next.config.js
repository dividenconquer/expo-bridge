module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
    };
    config.resolve.extensions = [
      ...config.resolve.extensions,
    ];
    return config;
  },
};
