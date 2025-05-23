const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'recipes API',
    description: 'recipes API'
  },
  host: 'localhost:4000',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);