import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chatService } from '../src/services/chat.service.ts';

test('responde consultas sobre ingreso al aula virtual', () => {
  const reply = chatService.respond('¿Cómo ingreso al aula virtual?');
  assert.match(reply, /aula virtual/i);
});

test('responde consultas sobre horarios', () => {
  const reply = chatService.respond('¿Dónde veo mis horarios?');
  assert.match(reply, /horarios/i);
});

test('responde consultas sobre materias', () => {
  const reply = chatService.respond('¿Dónde veo mis materias?');
  assert.match(reply, /materias/i);
});

test('responde consultas sobre material de estudio', () => {
  const reply = chatService.respond('¿Dónde encuentro el material de estudio?');
  assert.match(reply, /material/i);
});

test('responde consultas sobre contacto', () => {
  const reply = chatService.respond('¿Cómo contacto a la institución?');
  assert.match(reply, /contactar/i);
});

test('responde consultas sobre problemas con Moodle', () => {
  const reply = chatService.respond('Tengo un problema con Moodle, no puedo entrar');
  assert.match(reply, /Moodle/i);
});

test('responde el mensaje por defecto ante consultas desconocidas', () => {
  const reply = chatService.respond('qwerty asdfg 12345');
  assert.match(reply, /No tengo información suficiente/);
});

test('acepta mensajes con mayúsculas y acentos', () => {
  const reply = chatService.respond('DÓNDE VEO MIS HORARIOS?');
  assert.match(reply, /horarios/i);
});