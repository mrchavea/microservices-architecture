import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

export class CookieAdapter {
  private static SECRET_KEY = process.env.COOKIE_SECRET_KEY as string;

  public constructor() {}

  public static encrypt(cookieData: string): string {
    // Crear el vector de inicialización (IV)
    const iv: Buffer = crypto.randomBytes(16);

    // Crear el cifrador con AES-256-CBC, convertir la clave a Buffer
    const cipher: crypto.Cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(this.SECRET_KEY), iv);

    // Encriptar el texto
    let encrypted: string = cipher.update(cookieData, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Devolver el IV y el texto encriptado, concatenados
    return `${iv.toString("hex")}:${encrypted}`;
  }

  public static decrypt(cookie: string): string {
    // Separar el IV y el texto encriptado
    const [ivHex, encryptedText] = cookie.split(":");

    // Convertir el IV a un Buffer
    const iv: Buffer = Buffer.from(ivHex, "hex");

    // Crear el descifrador con AES-256-CBC, convertir la clave a Buffer
    const decipher: crypto.Decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(this.SECRET_KEY), iv);

    // Desencriptar el texto
    let decrypted: string = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}
