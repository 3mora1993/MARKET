class SocketService {
    private socket: WebSocket | null = null;
    private listeners: { [key: string]: ((data: any) => void)[] } = {};
  
    connect() {
      if (!this.socket) {
        this.socket = new WebSocket('ws://localhost:5000');
  
        this.socket.onopen = () => {
          console.log('WebSocket connected');
        };
  
        this.socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type && this.listeners[data.type]) {
            this.listeners[data.type].forEach(listener => listener(data.payload));
          }
        };
  
        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
  
        this.socket.onclose = () => {
          console.log('WebSocket disconnected');
          // Attempt to reconnect after 5 seconds
          setTimeout(() => this.connect(), 5000);
        };
      }
    }
  
    on(event: string, callback: (data: any) => void) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }
  
    off(event: string, callback: (data: any) => void) {
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
      }
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    }
  }
  
  export const socketService = new SocketService();