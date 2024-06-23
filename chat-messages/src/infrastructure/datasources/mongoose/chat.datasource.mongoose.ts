import { ChatModel } from "../../../../database/mongoose/models";
import { Chat, ChatRepository, CustomError, Message } from "../../../domain";
import { NewChatDto } from "../../../domain/dtos/newChat.dto";
import { ChatMapper } from "../../../domain/mappers/chat.mapper";

export class ChatDatasourceMongoose implements ChatRepository{

    async getChat(chatId: string): Promise<Chat> {
        try {
            const db_chat = await ChatModel.findById(chatId)
            return await ChatMapper.createChatFromObject({...db_chat})
        } catch (error) {
            console.error("Error -> getChat: " + error)
            throw CustomError.internalServer("Error retrieving chat")
        }
    }

    async addMessage(chat: Chat, message: Message): Promise<Chat> {
        try {
            //Remove the oldest recent message in order to be substituted for the new one in last place
            await ChatModel.updateOne({_id: chat.id}, {$pop: {recent_messages: -1}, $push: {recent_messages: message}})
            chat.addMessage(message)
            return chat
        } catch (error) {
            throw CustomError.internalServer("Error creating new message in chat")
        }
    }

    async createChat(chatDto: NewChatDto): Promise<Chat> {
        const {name, slug, users, messages} = chatDto
        try {
            const db_chat = await ChatModel.create({name, slug, users, messages: messages ?? []})
            await db_chat.save()
            return ChatMapper.createChatFromObject({...db_chat})
        } catch (error) {
            throw CustomError.internalServer("Error creating new chat")
        }
    }
}