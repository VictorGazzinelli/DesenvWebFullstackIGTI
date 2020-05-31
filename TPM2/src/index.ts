import server from './server';
// import swaggerJsDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import swaggerOptions from './swagger/swaggerOptions.json'
  
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// server.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`[SERVER] Running at http://localhost:${port}`);
});