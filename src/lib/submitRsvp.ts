import type { RsvpFormValues } from "./validateRsvp";

export interface SubmitRsvpResult {
  ok: boolean;
  message: string;
}

/**
 * Punto único de envío del RSVP. Hoy simula una petición asíncrona; conectar
 * Supabase/Firebase/REST más adelante es cambiar esta función, no el
 * componente que la llama.
 */
export async function submitRsvp(values: RsvpFormValues): Promise<SubmitRsvpResult> {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  // Simulación: en producción esto sería el resultado real de la API.
  void values;

  return { ok: true, message: "Hemos registrado tu respuesta." };
}
