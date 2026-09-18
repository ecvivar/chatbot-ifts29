import { useCallback, useEffect, useRef, useState } from 'react';
import ChatInput from '../components/ChatInput';
import MessageBubble from '../components/MessageBubble';
import QuickQuestions from '../components/QuickQuestions';
import TypingIndicator from '../components/TypingIndicator';
import { WELCOME_MESSAGE } from '../config/chat';
import { sendMessage } from '../services/api';
import type { ChatMessage } from '../types';

const ERROR_ASSISTANT_REPLY =
  'Hubo un problema al obtener mi respuesta. Por favor, intentá nuevamente en unos segundos.';

function createMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage('assistant', WELCOME_MESSAGE),
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) {
        return;
      }

      setError(null);
      setMessages((prev) => [...prev, createMessage('user', trimmed)]);
      setInput('');
      setLoading(true);

      try {
        const reply = await sendMessage(trimmed);
        setMessages((prev) => [...prev, createMessage('assistant', reply.reply)]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
        setMessages((prev) => [...prev, createMessage('assistant', ERROR_ASSISTANT_REPLY)]);
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  return (
    <div className="chat">
      <div className="chat__messages" ref={messagesRef}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {loading && <TypingIndicator />}
      </div>

      {error && (
        <div className="error-banner" role="alert">
          <p className="error-banner__text">{error}</p>
          <button
            type="button"
            className="error-banner__close"
            onClick={() => setError(null)}
            aria-label="Cerrar aviso"
          >
            ✕
          </button>
        </div>
      )}

      <div className="chat__footer">
        <QuickQuestions onSelect={handleSend} />
        <ChatInput value={input} onChange={setInput} onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}