import http from 'node:http'
import { Server } from 'socket.io'
import { Controller } from 'src/server/controller'

let io: Server
export default function (server: http.Server) {
  io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } })

  io.of('/chat').on('connection', Controller.Chat.socket)
  io.of('/text2img').on('connection', Controller.Text2img.socket)
}
