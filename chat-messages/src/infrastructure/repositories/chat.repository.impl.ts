import { Chat, ChatRepository, Message, NewChatDto } from "../../domain";

export class ChatRepositoryImpl implements ChatRepository{

    constructor(private chatDataSource: ChatRepository){}

    getChat(chatId: string): Promise<Chat> {
        return this.chatDataSource.getChat(chatId)
    }

    addMessage(chat: Chat, message: Message): Promise<Chat> {
        return this.chatDataSource.addMessage(chat, message)
    }

    createChat(chatDto: NewChatDto): Promise<Chat> {
        return this.chatDataSource.createChat(chatDto)
    }
    
}