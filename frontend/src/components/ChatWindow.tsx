import type { Message } from "../types/chat.types";

interface Props {
  messages: Message[];
  typingUsers?: string[];
}

export const ChatWindow = ({ messages, typingUsers = [] }: Props) => {
  return (
    <div className="h-[70vh] overflow-y-auto bg-gray-100 p-4 rounded-lg mb-4 flex flex-col">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={msg.system ? "text-center text-gray-500 my-1" : "my-1"}
        >
          {msg.system ? (
            <em>{msg.content}</em>
          ) : (
            <>
              <b>
                {typeof msg.sender === "string" ? msg.sender : msg.sender.name}:
              </b>{" "}
              {msg.content}
            </>
          )}
        </div>
      ))}

      {typingUsers.length > 0 && (
        <p className="text-sm text-gray-500 mt-auto italic">
          {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}{" "}
          typing...
        </p>
      )}
    </div>
  );
};
