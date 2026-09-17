export interface RsvpFormValues {
  fullName: string;
  guestCount: string;
  attending: "yes" | "no" | "";
  dietaryRestrictions: string;
  message: string;
  infoConfirmed: boolean;
}

export type RsvpFormErrors = Partial<Record<keyof RsvpFormValues, string>>;

export const emptyRsvpValues: RsvpFormValues = {
  fullName: "",
  guestCount: "1",
  attending: "",
  dietaryRestrictions: "",
  message: "",
  infoConfirmed: false,
};

export function validateRsvp(values: RsvpFormValues): RsvpFormErrors {
  const errors: RsvpFormErrors = {};

  if (values.fullName.trim().length < 3) {
    errors.fullName = "Escribe tu nombre completo.";
  }

  const guestCount = Number(values.guestCount);
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
    errors.guestCount = "Indica un número de invitados válido (1–10).";
  }

  if (values.attending !== "yes" && values.attending !== "no") {
    errors.attending = "Confirma si asistirás.";
  }

  if (!values.infoConfirmed) {
    errors.infoConfirmed = "Confirma que la información es correcta.";
  }

  return errors;
}

export function isRsvpValid(values: RsvpFormValues): boolean {
  return Object.keys(validateRsvp(values)).length === 0;
}
