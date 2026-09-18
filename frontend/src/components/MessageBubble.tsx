import type { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`message message--${message.role}`}>
      {!isUser && (
        <div className="message__avatar" aria-hidden="true">
          🤖
        </div>
      )}
      <div className="message__content">
        <p className="message__author">{isUser ? 'Vos' : 'Asistente virtual'}</p>
        <div className="message__bubble">{message.content}</div>
      </div>
    </div>
  );
}