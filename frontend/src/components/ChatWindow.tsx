import type { Message } from "../types/chat.types";


export const ChatWindow = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="h-[70vh] overflow-y-auto bg-gray-100 p-4 rounded-lg mb-4">
      {messages.map((msg, i) => (
        <div key={i} className={msg.system ? "text-center text-gray-500" : ""}>
          {msg.system ? (
            msg.content
          ) : (
            <>
              <b>
                {typeof msg.sender === "string" ? msg.sender : msg.sender.name}:
              </b>
              {msg.content}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
