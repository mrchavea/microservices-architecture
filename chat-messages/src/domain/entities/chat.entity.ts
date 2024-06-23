import { User, Message } from ".."

export class Chat {
    id: string
    name?: string
    users: Array<User>
    messages: Array<Message>

    constructor (id:string, users:Array<User>, messages: Array<Message>, name?:string) {
        this.id = id
        this.name = name
        this.users = users
        this.messages = messages
    }

    addMessage (message: Message): void {
        this.messages.push(message)
    }
}