import express from 'express';
import { connectToDatabase } from './services/database.service';
import { cardsRouter } from './routes/cards.router';
import cors from 'cors';

const app = express();
const port = 81; // default port to listen

connectToDatabase()
  .then(() => {
    app.use(cors())
    app.use('/cards', cardsRouter);

    app.listen(process.env.PORT || port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
