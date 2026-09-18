export interface ChatResponse {
  success: boolean;
  reply: string;
}

const DEV_API_URL = 'http://localhost:3000';

function resolveApiUrl(): string {
  const configured = import.meta.env.VITE_API_URL?.trim();
  if (configured) {
    return configured.replace(/\/+$/, '');
  }
  return import.meta.env.DEV ? DEV_API_URL : '';
}

export const API_URL = resolveApiUrl();

export async function sendMessage(message: string): Promise<ChatResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
  } catch {
    throw new Error('No se pudo conectar con el asistente. Verificá tu conexión e intentá nuevamente.');
  }

  if (!response.ok) {
    let detail = `El servidor respondió con un error (${response.status}).`;
    try {
      const body: { error?: string } = await response.json();
      if (body?.error) {
        detail = body.error;
      }
    } catch {
      // Si el cuerpo no es JSON, se conserva el mensaje genérico.
    }
    throw new Error(detail);
  }

  const data: ChatResponse = await response.json();
  if (!data.success || typeof data.reply !== 'string') {
    throw new Error('La respuesta del asistente tiene un formato inesperado.');
  }

  return data;
}