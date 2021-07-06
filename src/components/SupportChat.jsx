import { useState, useEffect, createContext } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import ChatRoomsSelect from './ChatRoomsSelect.jsx';
import ChatRoom from './ChatRoom/ChatRoom.jsx';
import './../styles/support-chat.css';

let ChatContext;
let io;
function SupportChat() {
    ChatContext = createContext();
    const chatIp = useLocation().pathname.substring(1);
    
    function sendMessage(text) {
        const messageToSend = {
            ip: chatIp,
            text: text,
            sentBySupport: true
        }

        setMessages(
            prevState => [...prevState, messageToSend]
        ); // adds message to current client

        io.emit('support sent message', messageToSend); // sends message to server
    }

    const [messages, setMessages] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const ENDPOINT = process.env.REACT_APP_CHAT_SERVER_URI;
        io = socketIOClient(ENDPOINT);
        io.emit('support entered', ''); /* + auth logic */

        io.on('previous messages downloaded', messages => {
            setMessages(messages
                .map(message => (
                    {
                        ip: message.visitor_ip,
                        text: message.text,
                        sentBySupport: message.sent_by_support
                    }
            )))
        });
        io.on('visitor sent message',
            message => {
                setMessages(prevState => {
                    return [...prevState, message];
                });
            }
        )
    }, []);

    useEffect(() => {
        setChatRooms(
            getChatRoomsOfMessaages()
        );
    }, [messages]);

    function getChatRoomsOfMessaages() {
        return [...new Set(messages.map(msg => msg.ip))];
    }


    return (
        <div className="ab-support-chat">
            <ChatContext.Provider value={ 
                {
                    messages: messages,
                    setMessages: setMessages,
                    sendMessage: sendMessage
                }
             }>
                <Switch>
                    <Route path="/:ip">
                        <ChatRoomsSelect rooms={chatRooms} />
                        <ChatRoom messages={messages} setMessages={setMessages} />
                    </Route>
                    <Route path="/">
                        <ChatRoomsSelect rooms={chatRooms} />
                    </Route>
                </Switch>
            </ChatContext.Provider>
        </div>
    );
}

export default SupportChat;
export { io, ChatContext };