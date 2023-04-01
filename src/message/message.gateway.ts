import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
const cors = require('cors');

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const messages = await this.messageService.create(createMessageDto);

    this.server.emit('message', this.messageService.message);

    return messages;
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }
}
