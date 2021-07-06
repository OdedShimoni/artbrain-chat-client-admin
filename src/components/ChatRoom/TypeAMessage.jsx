import { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { ChatContext } from './../SupportChat.jsx';
/* TDL: Refactor- this component should only be style */

function TypeAMessage() {
    const context = useContext(ChatContext);
    const { sendMessage } = context;
    const [ message, setMessage ] = useState('');

    function sendIfEnter(e) {
        if(e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    }

    function handleSend() {
        sendMessage(message);
    }

    function setMessageToThisValue(e) {
        setMessage(e.target.value);
    }

    return <form className="ab-chat_type-a-message">
        <TextField
            id="ab-your-message"
            label="Your message..."
            value={message}
            onChange={setMessageToThisValue}
            onKeyPress={sendIfEnter}
        />
        <SendIcon onClick={handleSend} />
    </form>
}

export default TypeAMessage;