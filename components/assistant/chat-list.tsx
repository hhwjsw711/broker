"use client";

interface ChatMessage {
  id: string;
  display?: React.ReactNode;
}

type Props = {
  messages: ChatMessage[];
};

export function ChatList({ messages }: Props) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="flex flex-col  p-4 pb-8">
      {messages
        .filter((tool: ChatMessage) => tool.display !== undefined)
        .map((message: ChatMessage, index: number) => (
          <div key={message.id}>
            {message.display}
            {index < messages.length - 1 && <div className="my-6" />}
          </div>
        ))}
    </div>
  );
}
