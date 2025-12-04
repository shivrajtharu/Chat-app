import { ChatWindow } from "../components/ChatWindow";
import { MessageInput } from "../components/MessageInput";
import { useChat } from "../hooks/useChat";

export const ChatPage = ({ room }: { room: string }) => {
  const { messages, sendMessage, sendTyping, typingUsers, totalMessages } =
    useChat(room);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Chat Room: {room} | Total Messages: {totalMessages}
      </h1>

      <ChatWindow messages={messages} />

      {typingUsers.length > 0 && (
        <p className="text-sm text-gray-500 mb-2">
          {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}
          typing...
        </p>
      )}

      <MessageInput
        onSend={(text) => {
          sendMessage(text);
          sendTyping();
        }}
      />
    </div>
  );
};
