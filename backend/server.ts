
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { managerRouter } from '@src/routes/manager-routes';

dotenv.config({ path: './.env.development'});

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/manager', managerRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});