import { useState } from "react";

export const MessageInput = ({
  onSend,
}: {
  onSend: (text: string) => void;
}) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return; 
    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="flex-1 border rounded-lg px-3 py-2"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  );
};
