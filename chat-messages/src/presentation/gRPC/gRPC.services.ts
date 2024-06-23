import { gRPCService } from './gRPC.service';
import { TokengRPCService } from '../tokens/token.grpc.service';
import { UsergRPCService } from '../users/user.grpc.service';

export class gRPCServices {

    static get services(): gRPCService[]  {
        const tokengRPCService = new gRPCService('Token', TokengRPCService.methods)
        const usergRPCService = new gRPCService('User', UsergRPCService.methods)
        // const tokengRPCService = new gRPCService('token', TokengRPCService.methods)
        return [tokengRPCService, usergRPCService]
    }
}