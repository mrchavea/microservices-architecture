import { Chat, Message, NewChatDto } from "..";

export interface ChatRepository{
    getChat: (chatId:string) => Promise<Chat>,
    addMessage: (chat:Chat, message: Message) => Promise<Chat>
    createChat: (chatDto: NewChatDto) => Promise<Chat>
}