import { Socket } from 'socket.io'

export class Text2img {
  static socket(socket: Socket) {
    console.log('/text2img 新连接进来', socket.handshake)
  }
}
