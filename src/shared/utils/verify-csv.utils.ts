import crypto from 'crypto';
import path from "path";
import fs from 'fs';

const CSV_PATH = path.join(__dirname, "..", "..", "..", "tmp", "movielist.csv");

// hash already generated
const ORIGINAL_HASH = "df5e4a3ae2c7aeaf67d0cbf1ad39407d07d4b8ebaf538a0af436292a0c7855b1"

const generateFileHash = (filePath: string): string => {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
};

const verifyCsvIntegrity = (path = CSV_PATH): boolean => {
  try {
    const currentHash = generateFileHash(path);

    if (currentHash === ORIGINAL_HASH) {
      console.log('✅ O arquivo CSV NÃO foi alterado.');
      return true;
    }
    
    console.log('ALERTA: O arquivo CSV foi modificado!');
  } catch (error) {
    console.error('❌ Erro ao verificar o arquivo CSV:', error);
  }

  return false;
};

export { generateFileHash, verifyCsvIntegrity }