const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER ) {
    // development variables
    return {
      env: {    
        NEXTAUTH_URL:'http://localhost:3000/',
        NEXTAUTH_SECRET: 'e9fd41e89309fc00c9e20d583ccdc7ba',
      },
    };
  }
  
  // production variables
  return {
    reactStrictMode: true,
    env: {
      NEXTAUTH_URL:'https://hellopartage.xyz',
      NEXTAUTH_SECRET: 'e9fd41e89309fc00c9e20d583ccdc7ba',
    },
  };
};