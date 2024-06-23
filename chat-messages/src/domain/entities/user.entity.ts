export class User {
    id:string
    name: string;
    profile_picture: string;

    constructor(id:string, name:string, profile_picture:string){
        this.id = id
        this.name = name
        this.profile_picture = profile_picture
    }
};