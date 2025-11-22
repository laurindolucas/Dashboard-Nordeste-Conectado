import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Nordeste Conectado",
      version: "1.0.0"
    }
  },
  apis: ["./src/modules/**/*.ts"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
