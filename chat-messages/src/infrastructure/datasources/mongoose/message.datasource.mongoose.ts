import {Message, MessageRepository, CustomError, NewMessageDto, MessageMapper} from '@/domain'
import { MessageModel } from '@/../database/mongoose/models'

export class MessageDatasourceMongoose implements MessageRepository{

    async getMessagesByChatId(chatId: string, pagination: number):Promise<Message[]> {
        let messages: Array<Message> = []
        try {
            const limit: number = parseInt (process.env.MESSAGES_LIMIT!)
            const skip: number = (pagination - 1) * limit
            const db_messages = await MessageModel.find({chatId: chatId}).sort({sent_date: -1}).skip(skip).limit(limit)    
            for(let i=0; i < db_messages.length; i++){
                messages.push(await MessageMapper.createMessageFromObject(db_messages[i]))
            }
            return messages      
        } catch (error) {
            throw CustomError.internalServer("Error retrieving chat messages")
        }
    }

    async createMessage(newMessageDto: NewMessageDto): Promise<Message> {
        const {chatId, text, from, sent_date} = newMessageDto
        try {
            const db_message = await MessageModel.create({chatId, text, from, sent_date})
            await db_message.save()
            return MessageMapper.createMessageFromObject({chatId, text, from, sent_date})
        } catch (error) {
            throw CustomError.internalServer("Error creating new message")
        }
    }
}