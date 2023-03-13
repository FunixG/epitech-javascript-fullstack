import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import ApiException from '../errors/api-error';

@Injectable()
export default class EncryptionService {
  private readonly salt: string;

  constructor() {
    this.salt = EncryptionService.getSalt();
  }

  encrypt(data: string): string {
    return bcrypt.hashSync(data, this.salt);
  }

  static compare(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
  }

  private static getSalt(): string {
    if (!this.secretFileExists()) {
      return this.genNewSalt();
    }
    return this.getSaltFromFile();
  }

  private static secretFileExists(): boolean {
    try {
      fs.accessSync('keys/secret-encryption.key', fs.constants.F_OK);
      return true;
    } catch (err) {
      return false;
    }
  }

  private static getSaltFromFile(): string {
    try {
      return fs.readFileSync('keys/secret-encryption.key', 'utf8');
    } catch (err) {
      throw new ApiException();
    }
  }

  private static genNewSalt(): string {
    const newSalt: string = bcrypt.genSaltSync();

    try {
      if (!fs.existsSync('keys')) {
        fs.mkdirSync('keys');
      }
      fs.writeFileSync('keys/secret-encryption.key', newSalt, { encoding: 'utf8', flag: 'w' });
      return newSalt;
    } catch (err) {
      throw new ApiException();
    }
  }
}
