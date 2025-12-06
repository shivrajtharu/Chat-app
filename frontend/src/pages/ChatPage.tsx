import { ChatWindow } from "../components/ChatWindow";
import { LogoutButton } from "../components/LogoutButton";
import { MessageInput } from "../components/MessageInput";
import { useChat } from "../hooks/useChat";
import Cookies from "js-cookie";

export const ChatPage = ({ room }: { room: string }) => {
  const userName = Cookies.get("userName") || "Anonymous";
  const { messages, sendMessage, sendTyping, typingUsers, totalMessages } =
    useChat(room, userName);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Chat Room: {room}</h1>
        <LogoutButton />
      </div>

      <h2 className="mb-4 text-gray-600">Total Messages: {totalMessages}</h2>

      <ChatWindow messages={messages} typingUsers={typingUsers} />

      <MessageInput
        onSend={(text) => sendMessage(text)}
        onTyping={sendTyping}
      />
    </div>
  );
};
