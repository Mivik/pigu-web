module.exports = {
  client: {
    service: {
      name: 'pigu',
      // URL to the GraphQL API
      url: 'https://pigu.mivik.moe/api/graphql'
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js']
  }
};
