/**
 * Servicio de conversación basado en reglas simples.
 *
 * Esta primera versión responde con respuestas predefinidas según palabras
 * clave detectadas en el mensaje del usuario. Es el punto único de contacto
 * entre el controlador y la lógica de respuestas: en una fase posterior este
 * servicio podrá reemplazarse internamente por un modelo de IA (RAG + LLM)
 * sin modificar el resto de la aplicación.
 */

const MAX_MESSAGE_LENGTH = 500;

interface ChatRule {
  keywords: string[];
  reply: string;
}

const DEFAULT_REPLY =
  'No tengo información suficiente para responder esa consulta en esta versión de prueba. En una próxima versión podré consultar la base de conocimiento institucional.';

const rules: ChatRule[] = [
  {
    keywords: ['hola', 'buenas', 'buen dia', 'buenas tardes', 'buenas noches', 'hey'],
    reply:
      '¡Hola! 👋 Soy el asistente virtual de la institución.\nEstoy para ayudarte a resolver tus primeras dudas sobre la carrera, la cursada y el aula virtual.\n¿En qué puedo ayudarte?',
  },
  {
    keywords: [
      'problema con moodle',
      'problema con el aula',
      'no puedo entrar',
      'no puedo ingresar',
      'no carga el aula',
      'no funciona moodle',
      'olvide mi contraseña',
      'olvidé mi contraseña',
      'no recuerdo mi contraseña',
      'no and',
      'falla moodle',
    ],
    reply:
      'Si tenés un problema con Moodle (por ejemplo, no podés ingresar o el aula no carga), probá primero lo siguiente:\n• Ingresá con otro navegador o desde una ventana de incógnito.\n• Borrá las cookies y el caché del navegador.\n• Verificá que estés usando tu usuario (DNI) y la contraseña correctos.\nSi el problema continúa, comunicate con el área de sistemas indicando tu nombre, comisión, y una captura de pantalla del error.',
  },
  {
    keywords: [
      'aula virtual',
      'moodle',
      'plataforma',
      'entrar al aula',
      'ingresar al aula',
      'acceder al aula',
      'como entro',
      'como ingreso',
    ],
    reply:
      'Para ingresar al aula virtual, entrá a la plataforma con tu usuario (DNI) y la contraseña que te fueron asignados al momento de la inscripción.\nSi no recordás tu contraseña, usá la opción "¿Olvidaste tu contraseña?" en la página de inicio de sesión y seguí los pasos indicados.\nSi el problema continúa, comunicate con el área de sistemas.',
  },
  {
    keywords: [
      'materia',
      'materias',
      'que voy a cursar',
      'que curso',
      'plan de estudios',
      'cursada',
      'primera materia',
      'correlativas',
    ],
    reply:
      'El detalle de las materias de tu carrera está disponible en la página web institucional y dentro del aula virtual.\nAl inicio de la cursada, tu comisión queda inscripta en las materias del primer cuatrimestre.\nSi tenés dudas sobre tu inscripción o el plan de estudios, consultá con la coordinación académica de tu carrera.',
  },
  {
    keywords: [
      'horario',
      'horarios',
      'comision',
      'comisión',
      'turno',
      'a que hora tengo clases',
      'cuando tengo clases',
      'cuando empiezan las clases',
      'dias de clase',
      'días de clase',
    ],
    reply:
      'Podés consultar los horarios correspondientes a tu comisión desde el aula virtual, dentro del espacio correspondiente a tu comisión.\nSi no encontrás la información, te recomiendo comunicarte con el área correspondiente.',
  },
  {
    keywords: [
      'material',
      'materiales',
      'apunte',
      'apuntes',
      'bibliografia',
      'bibliografía',
      'guia de estudio',
      'guía de estudio',
      'recursos',
      'descargar material',
      'contenido',
      'texto de estudio',
    ],
    reply:
      'El material de estudio de cada materia se publica en el aula virtual, dentro del espacio de la materia correspondiente, en la sección de recursos.\nAllí los docentes comparten guías, apuntes y presentaciones que podés descargar.\nSi en alguna materia no aparece el material, esperá a que el docente lo habilite o consultá con él al comienzo de la cursada.',
  },
  {
    keywords: [
      'contacto',
      'contactar',
      'contactarte',
      'telefono',
      'teléfono',
      'mail',
      'email',
      'correo',
      'comunicarme',
      'comunicar',
      'me comunico',
      'donde estan',
      'direccion',
      'dirección',
      'en donde queda',
      'horario de atencion',
      'horario de atención',
      'secretaria',
      'secretaría',
      'mesa de entradas',
    ],
    reply:
      'Podés contactar a la institución por los canales oficiales que se publican en la página web institucional (teléfono, correo electrónico y redes).\nTambién podés acercarte a la sede en el horario de atención, en la mesa de entradas o en el área de coordinación de tu carrera.',
  },
  {
    keywords: ['gracias', 'muchas gracias', 'te agradezco'],
    reply:
      '¡De nada! 😊 Si tenés más dudas, acá estoy para ayudarte. ¡Éxitos en la cursada!',
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function findRule(message: string): string {
  const normalized = normalize(message);

  let bestReply: string | null = null;
  let bestScore = 0;

  for (const rule of rules) {
    const score = rule.keywords.reduce((total, keyword) => {
      return normalized.includes(normalize(keyword)) ? total + keyword.length : total;
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestReply = rule.reply;
    }
  }

  return bestReply ?? DEFAULT_REPLY;
}

export const chatService = {
  maxMessageLength: MAX_MESSAGE_LENGTH,
  respond(message: string): string {
    const trimmed = message.trim();
    if (!trimmed) {
      return DEFAULT_REPLY;
    }
    return findRule(trimmed);
  },
};