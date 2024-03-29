import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import JwtPayload from '../entities/jwt-payload';
import UserService from './user.service';
import User from '../entities/user.entity';
import ApiException from '../../core/errors/api-error';

@Injectable()
export default class JwtStrategyAuthGard extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtStrategyAuthGard.getJwtSecretKey(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.userService.getById(Number(payload.sub));
  }

  public static getJwtSecretKey(): string {
    if (!this.secretFileExists()) {
      return this.genNewSalt();
    }
    return this.getSaltFromFile();
  }

  private static secretFileExists(): boolean {
    try {
      fs.accessSync('keys/secret-jwt.key', fs.constants.F_OK);
      return true;
    } catch (err) {
      return false;
    }
  }

  private static getSaltFromFile(): string {
    try {
      return fs.readFileSync('keys/secret-jwt.key', 'utf8');
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
      fs.writeFileSync('keys/secret-jwt.key', newSalt, { encoding: 'utf8', flag: 'w' });
      return newSalt;
    } catch (err) {
      throw new ApiException();
    }
  }
}
