import { io } from 'socket.io-client'

class WebSocketService {
  constructor() {
    this.socket = null
    this.connected = false
  }

  connect() {
    this.socket = io('ws://localhost:8000', {
      transports: ['websocket'],
    })

    this.socket.on('connect', () => {
      this.connected = true
      console.log('WebSocket connected')
    })

    this.socket.on('disconnect', () => {
      this.connected = false
      console.log('WebSocket disconnected')
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.connected = false
    }
  }

  joinDisplay(displayId) {
    if (this.socket) {
      this.socket.emit('join-display', displayId)
    }
  }

  onAdminUpdate(callback) {
    if (this.socket) {
      this.socket.on('admin:update', callback)
    }
  }

  offAdminUpdate(callback) {
    if (this.socket) {
      this.socket.off('admin:update', callback)
    }
  }
}

export default new WebSocketService()