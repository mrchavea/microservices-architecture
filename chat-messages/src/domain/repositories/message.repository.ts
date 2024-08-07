import {Message, NewMessageDto} from "@/domain"

export interface MessageRepository{
    getMessagesByChatId: (chatId:string, pagination:number) => Promise<Array<Message>>,
    createMessage: (newMessageDto: NewMessageDto) => Promise<Message>
}