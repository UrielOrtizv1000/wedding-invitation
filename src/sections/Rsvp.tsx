import { useState } from "react";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { RSVPForm } from "../components/RSVPForm";
import { SectionHeading } from "../components/SectionHeading";
import { emptyRsvpValues, type RsvpFormValues } from "../lib/validateRsvp";
import { wedding } from "../data/wedding";
import styles from "./Rsvp.module.css";

function formatDeadline(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
}

export function Rsvp() {
  const [pendingValues, setPendingValues] = useState<RsvpFormValues | null>(null);
  const [formKey, setFormKey] = useState(0);

  return (
    <section id="rsvp" className={[styles.section, "section-pad"].join(" ")} aria-labelledby="rsvp-heading">
      <div className="container">
        <div className={styles.layout}>
          <div>
            <SectionHeading id="rsvp-heading" title="¿Nos acompañas?" align="center" />
            <p className={styles.deadline}>Confirma tu asistencia antes del {formatDeadline(wedding.rsvpDeadline)}.</p>
          </div>

          <RSVPForm key={formKey} onValid={setPendingValues} />
        </div>
      </div>

      <ConfirmationModal
        open={pendingValues !== null}
        onClose={() => setPendingValues(null)}
        values={pendingValues ?? emptyRsvpValues}
        onSubmitted={() => setFormKey((k) => k + 1)}
      />
    </section>
  );
}
