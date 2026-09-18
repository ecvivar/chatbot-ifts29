export default function TypingIndicator() {
  return (
    <div className="message message--assistant">
      <div className="message__avatar" aria-hidden="true">
        🤖
      </div>
      <div className="message__content">
        <p className="message__author">Asistente virtual</p>
        <div className="message__bubble typing-indicator" role="status" aria-live="polite">
          <span className="typing-indicator__dot" />
          <span className="typing-indicator__dot" />
          <span className="typing-indicator__dot" />
          <span className="typing-indicator__text">El asistente está escribiendo...</span>
        </div>
      </div>
    </div>
  );
}