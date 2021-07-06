import { Link } from 'react-router-dom';
import ChatRoomSelect from './ChatRoomSelect.jsx';

function ChatRoomsSelect( {rooms} ) {
    return <div className="ab-chat_rooms">
        {rooms.map((room, index) => (
            <Link key={index} to={room}>
                <ChatRoomSelect
                    title={room}
                    handleNewUserMessage={console.log}
                    //launcher={room}
                />
            </Link>
        ))}
    </div>;
}

export default ChatRoomsSelect;