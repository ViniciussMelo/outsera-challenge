import { Movie, PrismaClient } from "@prisma/client";
import * as readline from "readline";
import * as path from "path";
import * as fs from "fs";

const prisma = new PrismaClient();

interface IMovie {
  year: number;
  title: string;
  studios: string;
  producers: string;
  won: boolean;
}

async function main () {
  console.log("Deleting movies...");
  await prisma.movie.deleteMany();

  console.log("Running seed...");
  const filePath = path.join(__dirname, "..", "tmp", "movielist.csv");
  const movies = await parseCSV(filePath);

  await prisma.movie.createMany({
    data: movies
  });
  
  console.log("Seed executed successfully!");
}

function parseCSV(filePath: string): Promise<IMovie[]> {
  return new Promise((resolve, reject) => {
    const results: IMovie[] = [];

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let firstLineSkipped = false;

    rl.on('line', (line) => {
      if (!firstLineSkipped) {
        firstLineSkipped = true;
        return;
      }
  
      const columns = line.split(';');
  
      const year = Number(columns[0]);
      const title = columns[1];
      const studios = columns[2];
      const producers = columns[3];
      const won = columns[4] === "yes";
  
      results.push({ year, title, studios, producers, won });
    });

    rl.on('close', () => {
      resolve(results);
    });

    rl.on('error', (err) => {
      reject('Error reading the file: ' + err);
    });
  });
}

main()
  .catch((error) => {
    console.error("Error executing seed:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });