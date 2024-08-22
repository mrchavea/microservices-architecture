import { Request, Response, Router } from "express";
import axios, { AxiosRequestConfig, Method, AxiosResponse } from "axios";
import registryJson from "./registry.json";

interface ExtendedRequest extends Request {
  user_id?: string;
}

// Define la interfaz para el JSON de configuración
interface Service {
  url: string;
}

interface Registry {
  services: {
    [key: string]: Service;
  };
}

// Importa y tipa el archivo JSON de configuración
const registry: Registry = registryJson;

// Crea el router de Express
const router = Router();

// Define la ruta para manejar solicitudes
router.all("/:apiName/:path", async (req: ExtendedRequest, res: Response) => {
  // Obtiene `user_id` del objeto `req`
  const user_id = req?.user_id;

  // Obtiene los parámetros de la solicitud
  const apiName = req.params.apiName;
  const path = req.params.path;

  // Verifica si el servicio está registrado en `registry`
  if (registry.services[apiName]) {
    // Configura los parámetros para la solicitud Axios
    const config: AxiosRequestConfig = {
      method: req.method as Method, // `req.method` es de tipo `string`, pero `Method` es específico para Axios
      url: `${registry.services[apiName].url}${path}`, // Concatena la URL del servicio con el path
      headers: req.headers as any, // Usa `any` si no conoces la forma exacta de `headers`
      data: req.body, // Datos del cuerpo de la solicitud
      params: { ...req.params, user_id } // Añade `user_id` a los parámetros de la solicitud
    };

    try {
      // Realiza la solicitud Axios
      const response: AxiosResponse<any> = await axios(config);
      console.timeEnd("http communication");

      // Devuelve la respuesta del servidor
      return res.status(200).json(response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      return res.status(500).send("Error en el servidor");
    }
  }

  // Si no se encuentra el servicio, devuelve un error 404
  return res.sendStatus(404);
});

export default router;
