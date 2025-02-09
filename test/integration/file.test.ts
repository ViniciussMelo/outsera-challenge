import path from "path";

import { generateFileHash, verifyCsvIntegrity } from '../../src/shared/utils/verify-csv.utils';

describe('File test', () => {
  it('should be able to generate a valid hash', () => {
    const filePath = path.join(__dirname, "..", "..","tmp", "movielist.csv");

    const hash = generateFileHash(filePath);
    expect(hash).toHaveLength(64);
  });

  it('should detect when the CSV file has not been modified', () => {
    const integrityCheck = verifyCsvIntegrity();
    expect(integrityCheck).toBe(true);
  });

  it('should detect when the CSV file has been modified', () => {
    const filePath = path.join(__dirname, "..", "..","tmp", "movielist-changed.csv");

    const integrityCheck = verifyCsvIntegrity(filePath);
    expect(integrityCheck).toBe(false);
  });
})