import jwt from 'jsonwebtoken';
require("dotenv").config();

export interface generatedToken {
  token:string,
  duration: string | undefined
}

const DURATION : string = '2h' 

export class JwtAdapter {

  static async generateToken( 
    payload: Object, 
    type: 'LOGIN' | 'REFRESH'): Promise<generatedToken|null> {
    return new Promise( ( resolve ) => {
      const secret = type == 'LOGIN' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET
      const options = type == 'REFRESH' ? {expiresIn: DURATION} : {}
      // todo: generación del seed
      jwt.sign( {...payload, method:type}, secret!, options, (err, token) => {

        if ( err ) return resolve(null);

        resolve({
          token: token!,
          duration: type == 'REFRESH' ? DURATION : undefined
        });
      });


    } );


  }


  static validateToken<T>( token: string, type: 'LOGIN' | 'REFRESH' ): Promise<T | null> {
    const secret = type == 'LOGIN' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET
    return new Promise( (resolve) => {

      jwt.verify( token, secret!, (err, decoded) => {

        if ( err ) return resolve(null);

        resolve(decoded as T);

      });


    });


  }


}