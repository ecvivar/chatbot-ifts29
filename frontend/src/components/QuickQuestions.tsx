import { QUICK_QUESTIONS } from '../config/chat';

interface QuickQuestionsProps {
  onSelect: (question: string) => void;
}

export default function QuickQuestions({ onSelect }: QuickQuestionsProps) {
  return (
    <section className="quick-questions" aria-label="Preguntas frecuentes">
      {QUICK_QUESTIONS.map((question) => (
        <button
          key={question}
          type="button"
          className="quick-question"
          onClick={() => onSelect(question)}
        >
          {question}
        </button>
      ))}
    </section>
  );
}