import jwt from 'jsonwebtoken';
import { TOKEN_METHOD, TOKEN_TYPE } from './enums';
import { TokenPayload } from './interfaces';
require("dotenv").config();

export interface generatedToken {
  token:string,
  duration: string | undefined
}

const DURATION = {
  ACCESS_TOKEN: '1h',
  REFRESH_TOKEN: '6h'
}

export class JwtAdapter {

  static async generateToken( 
    payload: TokenPayload): Promise<generatedToken|null> {
    return new Promise( ( resolve ) => {
      const secret = payload.type == TOKEN_TYPE.ACESS_TOKEN ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET
      const options = payload.type == TOKEN_TYPE.ACESS_TOKEN ? {expiresIn: DURATION.ACCESS_TOKEN} : {expiresIn: DURATION.REFRESH_TOKEN}
      // todo: generación del seed
      jwt.sign( payload, secret!, options, (err, token) => {

        if ( err ) return resolve(null);

        resolve({
          token: token!,
          duration: payload.type == TOKEN_TYPE.ACESS_TOKEN ? DURATION.ACCESS_TOKEN : DURATION.REFRESH_TOKEN
        });
        
      });

    } );
  }


  static validateToken( token: string, type:TOKEN_TYPE ): Promise<TokenPayload | null> {
    const secret = type == TOKEN_TYPE.ACESS_TOKEN ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET
    return new Promise( (resolve) => {

      jwt.verify( token, secret!, (err, payload) => {

        if ( err ) return resolve(null);

        resolve(payload as TokenPayload);

      });
    });
  }


}