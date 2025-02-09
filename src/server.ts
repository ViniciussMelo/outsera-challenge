import { connectDB, executeSeed } from './shared/database';
import { app } from './app'

const startServer = async () => {
  await connectDB();
  await executeSeed();

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    const host = `http://localhost:${port}`;

    console.log(`Project is running at ${host}`);
    console.log(`Swagger is running at ${host}/api-docs`);
  });
}

startServer();