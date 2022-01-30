import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import {ExtractJwt, Strategy} from "passport-jwt"

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: 'rt_secret',
          passReqToCallback: true,
        });
      }
    
      validate(payload: any) {
        return payload;
      }
    }