import type { FormEvent } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (text: string) => void;
  disabled: boolean;
}

const MAX_LENGTH = 500;

export default function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const trimmed = value.trim();
  const canSend = trimmed.length > 0 && !disabled;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSend) {
      onSend(trimmed);
    }
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-input__field"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Escribí tu consulta..."
        aria-label="Escribí tu consulta"
        maxLength={MAX_LENGTH}
        autoComplete="off"
        disabled={disabled}
      />
      <button type="submit" className="chat-input__send" disabled={!canSend}>
        Enviar
      </button>
    </form>
  );
}