import path from 'path';
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { Schema } from 'mongoose';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from '../build/routes';

/** Controllers */
import * as jobController from './controllers/jobController';
import { ErrorHandler } from './error/errorHandler';

dotenv.config();

const connection = process.env.MONGOLAB_URI || 'nope';

mongoose
  .connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Database Connected Successfully'))
  .catch((err) => console.log(err));

const app = express();

const PORT = process.env.PORT || 8080;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

/** Public route for testing */
app.get('/jobs', jobController.getJobs);

// Serve the Swagger documentation
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

RegisterRoutes(app);
ErrorHandler(app);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
