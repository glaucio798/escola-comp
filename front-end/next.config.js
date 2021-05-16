module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/frontend",
        permanent: true,
      },
    ];
  },
};
