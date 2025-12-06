import { useState, useCallback } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
  onTyping: () => void;
}

export const MessageInput = ({ onSend, onTyping }: MessageInputProps) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleTyping = useCallback(() => {
    onTyping();
  }, [onTyping]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    handleTyping();
  };

  return (
    <div className="flex gap-2">
      <input
        value={text}
        onChange={handleChange}
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
