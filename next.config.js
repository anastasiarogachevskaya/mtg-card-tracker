module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['c1.scryfall.com'],
  },
  webpack: (config) => {
    config.experiments = { 
      topLevelAwait: true,
      layers: true, 
    };
    return config;
  },
};
