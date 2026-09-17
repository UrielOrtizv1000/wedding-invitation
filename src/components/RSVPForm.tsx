import { useRef, useState, type FormEvent } from "react";
import { Field } from "./Field";
import { Button } from "./Button";
import fieldStyles from "./Field.module.css";
import { emptyRsvpValues, validateRsvp, type RsvpFormErrors, type RsvpFormValues } from "../lib/validateRsvp";
import rsvpStyles from "../sections/Rsvp.module.css";

interface RSVPFormProps {
  onValid: (values: RsvpFormValues) => void;
}

export function RSVPForm({ onValid }: RSVPFormProps) {
  const [values, setValues] = useState<RsvpFormValues>(emptyRsvpValues);
  const [errors, setErrors] = useState<RsvpFormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateRsvp(values);
    setErrors(nextErrors);

    const firstErrorKey = Object.keys(nextErrors)[0];
    if (firstErrorKey) {
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${firstErrorKey}"]`);
      field?.focus();
      return;
    }

    onValid(values);
  };

  return (
    <form ref={formRef} className={rsvpStyles.form} onSubmit={handleSubmit} noValidate>
      <Field label="Nombre completo" error={errors.fullName}>
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            name="fullName"
            type="text"
            autoComplete="off"
            className={[fieldStyles.control, invalid ? fieldStyles.invalid : ""].join(" ")}
            placeholder="Tu nombre y apellidos"
            value={values.fullName}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(e) => setValues((v) => ({ ...v, fullName: e.target.value }))}
          />
        )}
      </Field>

      <div className={rsvpStyles.row}>
        <Field label="Número de invitados" error={errors.guestCount}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="guestCount"
              type="number"
              min={1}
              max={10}
              className={[fieldStyles.control, invalid ? fieldStyles.invalid : ""].join(" ")}
              value={values.guestCount}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              onChange={(e) => setValues((v) => ({ ...v, guestCount: e.target.value }))}
            />
          )}
        </Field>

        <Field label="¿Asistirás?" error={errors.attending}>
          {({ id, describedBy, invalid }) => (
            <div className={rsvpStyles.segmented} id={id} role="radiogroup" aria-invalid={invalid} aria-describedby={describedBy}>
              {(["yes", "no"] as const).map((option) => (
                <span key={option} className={rsvpStyles.segmentOption}>
                  <input
                    className={rsvpStyles.segmentInput}
                    type="radio"
                    name="attending"
                    id={`${id}-${option}`}
                    checked={values.attending === option}
                    onChange={() => setValues((v) => ({ ...v, attending: option }))}
                  />
                  <label className={rsvpStyles.segmentLabel} htmlFor={`${id}-${option}`}>
                    {option === "yes" ? "Sí" : "No"}
                  </label>
                </span>
              ))}
            </div>
          )}
        </Field>
      </div>

      <Field label="Restricciones alimentarias">
        {({ id }) => (
          <input
            id={id}
            name="dietaryRestrictions"
            type="text"
            className={fieldStyles.control}
            placeholder="Vegetariano, alergias, etc. (opcional)"
            value={values.dietaryRestrictions}
            onChange={(e) => setValues((v) => ({ ...v, dietaryRestrictions: e.target.value }))}
          />
        )}
      </Field>

      <Field label="Mensaje para los novios">
        {({ id }) => (
          <textarea
            id={id}
            name="message"
            className={fieldStyles.control}
            placeholder="Déjales unas palabras (opcional)"
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          />
        )}
      </Field>

      <label className={rsvpStyles.checkboxRow}>
        <input
          type="checkbox"
          name="infoConfirmed"
          checked={values.infoConfirmed}
          aria-invalid={Boolean(errors.infoConfirmed)}
          onChange={(e) => setValues((v) => ({ ...v, infoConfirmed: e.target.checked }))}
        />
        <span className={rsvpStyles.checkboxLabel}>Confirmo que la información es correcta.</span>
      </label>
      {errors.infoConfirmed && <span className={fieldStyles.error}>{errors.infoConfirmed}</span>}

      <Button type="submit" variant="primary" className={rsvpStyles.submit}>
        Confirmar asistencia
      </Button>
    </form>
  );
}
