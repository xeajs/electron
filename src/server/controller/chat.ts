import { Socket } from 'socket.io'

export class Chat {
  static socket(socket: Socket) {
    console.log('/chat 新连接进来', socket.id)

    socket.on('disconnect', (socket) => {
      console.log('disconnect')
    })
    socket.on('close', (socket) => {
      console.log('close')
    })

    socket.on('message', (message) => {
      socket.send(message)
    })
  }
}
