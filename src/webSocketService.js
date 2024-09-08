class WebSocketService {
    constructor() {
      const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
      const wsUrl = `${wsProtocol}https://944d-2001-da8-1002-6004-00-1-31f1.ngrok-free.app`; // 替换为你的 ngrok 地址
      this.socket = new WebSocket(wsUrl);
  
      this.socket.onopen = () => {
        console.log('WebSocket connection opened');
      };
  
      this.socket.onmessage = (message) => {
        console.log('Received message:', message.data);
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }
  
    sendMessage(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
      }
    }
  }
  
  export default new WebSocketService();