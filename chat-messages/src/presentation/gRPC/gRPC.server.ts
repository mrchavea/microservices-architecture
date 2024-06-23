import { gRPCMethods, gRPCService } from "./gRPC.service";

const path = require("path");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

interface Options {
  PORT?: number,
  PROTO_NAME: string,
  services: gRPCService[]
}

export class gRPC_Server {
  
  public readonly server = new grpc.Server()
  private readonly port: number
  private proto: any
  private PROTO_PATH = path.join(__dirname, "../../../config/protos/authentication.proto");
  options: Options
  
  constructor (options: Options){
    const {PROTO_NAME, PORT = 50051} = options
    this.options = options
    this.port = PORT
    this.proto = this.loadPackage(this.PROTO_PATH, PROTO_NAME);
  }

  private loadPackage(PROTO_PATH: string, PROTO_NAME: string){
    const packageDefinition =  protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
    return grpc.loadPackageDefinition(packageDefinition)[PROTO_NAME]
  }

  private addService(serviceName:string, methods: gRPCMethods) {
    this.server.addService(this.proto[serviceName].service, methods)
  }

  async start(){
    for(const service of this.options.services){
      this.addService(service.service, service.methods)
    }
    this.server.bindAsync(
      "0.0.0.0:" + this.port,
      grpc.ServerCredentials.createInsecure(),
      (err:any, port:number ) => {
        if (err != null) {
          return console.error(err);
        }
        console.log(`gRPC listening on ${port}`);
      }
    );
  }
}
