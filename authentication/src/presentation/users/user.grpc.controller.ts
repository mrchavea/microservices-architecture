import { CustomError, LogInUser, LogInUserDto, RegisterUser, RegisterUserDto, TokenDto, TokenRepository, UserRepository } from "../../domain";

type gRPCFunction = (call: any, callback: any) => void;

export class UsergRPCController {
  constructor(private readonly userRepository: UserRepository, private readonly tokenRepository: TokenRepository) {}

  private handleError = (error: unknown, callback: any) => {
    console.log("CONTR ERR", error);
    if (error instanceof CustomError) {
      return callback(null, { status: { code: error.statusCode, error: error.message } });
    }

    return callback(null, { status: { code: 500, error: "Internal Server Error" } });
  };

  authenticateUser: gRPCFunction = async (call, callback) => {
    const { email, password } = call.request;
    try {
      const [error, logInUserDto] = LogInUserDto.makeLoginUserDto({ email, password });
      if (error) throw CustomError.badRequest(error);
      new LogInUser(this.userRepository, this.tokenRepository)
        .execute(logInUserDto!)
        .then((tokens) =>
          callback(null, {
            status: { code: 200 },
            access_token: tokens.access_token.value,
            refresh_token: tokens.refresh_token.value,
            access_token_expiration: tokens.access_token.expiry_time.getTime(),
            refresh_token_expiration: tokens.refresh_token.expiry_time.getTime()
          })
        )
        .catch((err) => this.handleError(err, callback));
    } catch (err) {
      this.handleError(err, callback);
    }
  };

  registerUser: gRPCFunction = async (call, callback) => {
    const { username, email, name, password, client_id } = call.request;
    try {
      const [error, registerUserDto] = await RegisterUserDto.makeUser({ name, email, username, password, client_id });
      console.log("validator ERR", error);
      if (error) throw CustomError.badRequest(error);
      new RegisterUser(this.userRepository, this.tokenRepository)
        .execute(registerUserDto!)
        .then((userAndTokens) =>
          callback(null, {
            status: { code: 200 },
            access_token: userAndTokens.tokens.access_token.value,
            access_token_expiration: userAndTokens.tokens.access_token.expiry_time.getTime(),
            refresh_token: userAndTokens.tokens.refresh_token.value,
            refresh_token_expiration: userAndTokens.tokens.refresh_token.expiry_time.getTime(),
            name: userAndTokens.user.name,
            email: userAndTokens.user.email,
            username: userAndTokens.user.username,
            id: userAndTokens.user.id
          })
        )
        .catch((err) => this.handleError(err, callback));
    } catch (err) {
      this.handleError(err, callback);
    }
  };
}
