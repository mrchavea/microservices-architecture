import express, { Request, Response } from "express";
import { tokengRPCClient, usergRPCClient } from "../../../gRPCClient";
import { addRefreshCookie, addAccessToken } from "../../helpers/cookies";

const router = express.Router();

interface GRPCResponse {
  status: {
    code: number;
    error?: string;
  };
  access_token?: string;
  access_token_expiration?: string;
  refresh_token?: string;
  refresh_token_expiration?: string;
  id?: string;
  name?: string;
  email?: string;
  username?: string;
}

const getRefreshToken = (refresh_token: string): Promise<GRPCResponse> =>
  new Promise((resolve, reject) => {
    tokengRPCClient.refreshToken({ refresh_token }, (err: any, res: GRPCResponse) => {
      if (err) return reject(err);
      resolve(res);
    });
  });

const authenticateUser = (email: string, password: string): Promise<GRPCResponse> =>
  new Promise((resolve, reject) => {
    usergRPCClient.authenticateUser({ email, password }, (err: any, res: GRPCResponse) => {
      if (err) return reject(err);
      resolve(res);
    });
  });

const registerUser = (email: string, password: string, username: string, name: string, client_id: string): Promise<GRPCResponse> =>
  new Promise((resolve, reject) => {
    usergRPCClient.registerUser({ email, password, username, name, client_id }, (err: any, res: GRPCResponse) => {
      if (err) return reject(err);
      resolve(res);
    });
  });

router.get("/refreshToken", async (req: Request, res: Response) => {
  const refresh_token = req.cookies?.jwt_session;
  console.log("REFRESH_COOKIE", refresh_token);
  if (!refresh_token) return res.sendStatus(401);

  try {
    const response = await getRefreshToken(refresh_token);
    console.log("REFRESH?", response);

    if (response.status.code === 200) {
      addAccessToken(res, response.access_token!, response.access_token_expiration!);
      return res.sendStatus(200);
    }

    return res.status(response.status.code).send({ error: response.status.error });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  console.time("login");
  const { email, password } = req.body;

  try {
    const response = await authenticateUser(email, password);
    console.timeEnd("login");
    console.log("TOKEN?", response);

    if (response.status.code != 200) return res.status(response.status.code).send({ error: response.status.error });

    addRefreshCookie(res, response.refresh_token!, response.refresh_token_expiration!);
    return res.status(200).json({ accessToken: response.access_token });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

router.post("/register", async (req: Request, res: Response) => {
  console.time("register");
  const { email, password, username, name, client_id } = req.body;

  try {
    const response = await registerUser(email, password, username, name, client_id);
    console.timeEnd("register");
    console.log("REGISTER?", response);

    if (response.status.code === 200) {
      const { id, name, email, username, access_token, refresh_token, access_token_expiration, refresh_token_expiration } = response;
      addRefreshCookie(res, refresh_token!, access_token_expiration!);
      //addAccessToken(res, access_token!, refresh_token_expiration!);
      return res.status(200).json({
        id,
        name,
        email,
        username,
        access_token
      });
    }

    return res.status(response.status.code).send({ error: response.status.error });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

export default router;
