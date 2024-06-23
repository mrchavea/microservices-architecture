import { TOKEN_METHOD, TOKEN_TYPE } from "./enums";

export interface TokenPayload {
    user_id: string,
    method: TOKEN_METHOD,
    type: TOKEN_TYPE,
    iat?: number | undefined,
}