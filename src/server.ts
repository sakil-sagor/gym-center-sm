import { Request, Response } from 'express';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string).then(() => {
      console.log('Database Connection successful');
    });

    app.get('/', (req: Request, res: Response) => {
      res.send('Running Node Server-SM Technology');
    });

    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
