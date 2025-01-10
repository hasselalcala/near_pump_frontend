import { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext(null);

const WS_RECONNECT_TIMEOUT = 3000;
const MAX_RECONNECT_ATTEMPTS = 5;

export function WebSocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [tokens, setTokens] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);

    const connectWebSocket = () => {
        // Añadimos /ws a la URL del WebSocket
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://127.0.0.1:8080/ws';
        console.log('Attempting to connect to WebSocket:', wsUrl);

        try {
            const ws = new WebSocket(wsUrl);

            ws.onopen = () => {
                console.log('WebSocket Connected Successfully');
                setIsConnected(true);
                setReconnectAttempts(0);

                // Enviar un mensaje inicial para establecer la conexión
                ws.send(JSON.stringify({ type: 'CONNECT' }));
            };

            ws.onmessage = (event) => {
                console.log('WebSocket message received:', event.data);
                try {
                    const token = JSON.parse(event.data);
                    // Como tu servidor envía directamente el TokenDTO, actualizamos el manejo
                    setTokens(prevTokens => {
                        const exists = prevTokens.some(t => t.id === token.id);
                        if (!exists) {
                            // Mostrar notificación para nuevo token
                            if (Notification.permission === 'granted') {
                                new Notification('New Token Created', {
                                    body: `Token "${token.name}" has been created!`,
                                    icon: '/near.svg'
                                });
                            }
                            return [...prevTokens, token];
                        }
                        return prevTokens;
                    });
                } catch (error) {
                    console.error('Error processing message:', error);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                setIsConnected(false);
            };

            ws.onclose = (event) => {
                console.log('WebSocket disconnected:', event.code, event.reason);
                setIsConnected(false);

                if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                    console.log(`Reconnecting... Attempt ${reconnectAttempts + 1} of ${MAX_RECONNECT_ATTEMPTS}`);
                    setTimeout(() => {
                        setReconnectAttempts(prev => prev + 1);
                        connectWebSocket();
                    }, WS_RECONNECT_TIMEOUT);
                } else {
                    console.log('Max reconnection attempts reached');
                }
            };

            setSocket(ws);
        } catch (error) {
            console.error('Error creating WebSocket:', error);
        }
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, []); // Solo se ejecuta una vez al montar el componente

    const sendMessage = (message) => {
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected. Current state:', socket?.readyState);
        }
    };

    return (
        <WebSocketContext.Provider value={{
            socket,
            tokens,
            isConnected,
            sendMessage,
            reconnectAttempts
        }}>
            {children}
        </WebSocketContext.Provider>
    );
}

export const useWebSocket = () => useContext(WebSocketContext);
