import { Request, Response, NextFunction } from "express";
import { tokengRPCClient } from "../gRPCClient";
import { CookieAdapter } from "../src/presentation/adapters/CookieAdapter";

interface ExtendedRequest extends Request {
  user_id?: string;
}

interface ValidateTokenResponse {
  status: {
    code: number;
  };
  user_id?: string;
}

async function authenticateToken(req: ExtendedRequest, res: Response, next: NextFunction): Promise<void> {
  console.time("validating");

  // Disable authentication for authentication microservice and functionalities
  if (req.path.startsWith("/auth")) return next();

  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];

  // if (!token) {
  //   res.sendStatus(401);
  //   return;
  // }

  const sessionCookie = req.cookies["jwt_session"];
  const accessCookie = req.cookies["jwt_access"];
  console.log("COOKIES?", sessionCookie, accessCookie);

  if (!sessionCookie || !accessCookie) {
    res.sendStatus(401);
    return;
  }

  const sessionToken = CookieAdapter.decrypt(sessionCookie!);

  const validateToken = (): Promise<ValidateTokenResponse> =>
    new Promise((resolve, reject) => {
      tokengRPCClient.validateToken({ accessCookie }, (err: any, res: ValidateTokenResponse) => {
        if (err) return reject(err);
        resolve(res);
      });
    });

  try {
    const response = await validateToken();
    console.log("RES", response);
    console.timeEnd("validating");

    if (response?.status?.code !== 200) {
      res.sendStatus(403);
      return;
    }

    req.user_id = response.user_id;
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export default authenticateToken;
