import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const CLIENT_ENDPOINT = process.env.CLIENT_ENDPOINT;
export const CORSCONFIG = {
  origin: CLIENT_ENDPOINT,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 200,
};
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_OPTIONS = {
  expiresIn: '30d',
};

export const JWT_ACC_SECRET = process.env.JWT_ACC_SECRET;
