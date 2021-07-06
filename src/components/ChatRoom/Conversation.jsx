function Conversation( {messages} ) {
    return <div>
        {messages.map((msg, i) => {
            return <div key={i} className={msg.sentBySupport ? 'ab-chat_message_support' : 'ab-chat_message_visitor'}>
                {msg.text}
            </div>;
        })}
    </div>
}

export default Conversation;