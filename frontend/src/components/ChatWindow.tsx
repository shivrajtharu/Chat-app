import type { Message } from "../types/chat.types";
import Cookies from "js-cookie";

interface Props {
  messages: Message[];
  typingUsers?: string[];
}

export const ChatWindow = ({ messages, typingUsers = [] }: Props) => {
  const userName = Cookies.get("userName") || "Anonymous";

  return (
    <div className="h-[70vh] overflow-y-auto bg-gray-100 p-4 rounded-lg mb-4 flex flex-col gap-2">
      {messages.map((msg, i) => {
        const senderName =
          typeof msg.sender === "string" ? msg.sender : msg.sender.name;

        // System messages in center
        if (msg.system) {
          return (
            <div key={i} className="text-center text-gray-500 my-1 italic">
              {msg.content}
            </div>
          );
        }

        const isOwnMessage = senderName === userName;

        return (
          <div
            key={i}
            className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] word-break ${
                isOwnMessage
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-300 text-gray-800 rounded-bl-none"
              }`}
            >
              {!isOwnMessage && (
                <div className="text-sm font-semibold mb-1">{senderName}</div>
              )}
              <div>{msg.content}</div>
            </div>
          </div>
        );
      })}

      {typingUsers.length > 0 && (
        <p className="text-sm text-gray-500 mt-auto italic">
          {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}{" "}
          typing...
        </p>
      )}
    </div>
  );
};
