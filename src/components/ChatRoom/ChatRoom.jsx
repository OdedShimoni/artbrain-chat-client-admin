import { useLocation } from 'react-router-dom';
import Conversation from './Conversation';
import TypeAMessage from './TypeAMessage.jsx';

function ChatRoom( {messages, setMessages} ) {
    const location = useLocation();
    const chatIpToDisplay = location.pathname.substring(1); // Refactor
    const thisRoomMessages = messages.filter(
        msg => msg.ip === chatIpToDisplay
    );
    return (
        <div className="ab-chat-room">
            <Conversation messages={thisRoomMessages} />
            <TypeAMessage />
        </div>
    );
}

export default ChatRoom;