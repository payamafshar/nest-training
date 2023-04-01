import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
import { Message } from './entities/message.entity';
@Injectable()
export class MessageService {
  public message: Message[] = [];

  create(createMessageDto: CreateMessageDto) {
    this.message.push(createMessageDto);
  }

  findAll() {
    return this.message;
  }
}
