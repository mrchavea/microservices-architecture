export type gRPCMethods = {
    [functionName: string]: (call:any, callback:any) => void;
};

export class gRPCService{
    service: string;
    methods: gRPCMethods

    constructor(service: string, methods: gRPCMethods){
        this.service= service;
        this.methods= methods;
    }

}