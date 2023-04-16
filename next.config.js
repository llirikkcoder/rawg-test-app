module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['media.rawg.io'],
    },
    compiler: { styledComponents: true },
    env: {
        RAWG_API_KEY: process.env.RAWG_API_KEY,
    },
}
