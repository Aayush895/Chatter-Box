import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const CLIENT_ENDPOINT = process.env.CLIENT_ENDPOINT;
export const CORSCONFIG = {
  origin: CLIENT_ENDPOINT,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 200,
};
export const DB_URI = process.env.DB_URI