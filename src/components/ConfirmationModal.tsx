import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { submitRsvp } from "../lib/submitRsvp";
import type { RsvpFormValues } from "../lib/validateRsvp";
import { useToast } from "./toast/useToast";
import { Button } from "./Button";
import { Modal } from "./Modal";
import styles from "../sections/Rsvp.module.css";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  values: RsvpFormValues;
  onSubmitted: () => void;
}

type Stage = "review" | "submitting" | "success" | "error";

export function ConfirmationModal({ open, onClose, values, onSubmitted }: ConfirmationModalProps) {
  const [stage, setStage] = useState<Stage>("review");
  const { showToast } = useToast();

  const handleConfirm = async () => {
    setStage("submitting");
    const result = await submitRsvp(values);
    if (result.ok) {
      setStage("success");
      showToast("success", "Confirmación enviada correctamente.");
    } else {
      setStage("error");
      showToast("error", "No fue posible completar la acción.");
    }
  };

  const handleClose = () => {
    onClose();
    if (stage === "success") onSubmitted();
    window.setTimeout(() => setStage("review"), 300);
  };

  return (
    <Modal open={open} onClose={handleClose} title={stage === "success" ? "Asistencia confirmada" : "¿Confirmas tu asistencia?"}>
      {stage === "success" ? (
        <div className={styles.success}>
          <span className={styles.successIcon}>
            <CheckCircle2 size={28} strokeWidth={1.75} />
          </span>
          <p className={styles.successTitle}>¡Gracias por confirmar!</p>
          <p className={styles.successText}>Hemos registrado tu respuesta.</p>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </div>
      ) : (
        <>
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Nombre</span>
              <span className={styles.summaryValue}>{values.fullName}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Número de invitados</span>
              <span className={styles.summaryValue}>{values.guestCount}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Asistencia</span>
              <span className={styles.summaryValue}>{values.attending === "yes" ? "Sí" : "No"}</span>
            </div>
          </div>

          {stage === "error" && <p className={styles.submitError}>No fue posible completar la acción. Intenta de nuevo.</p>}

          <div className={styles.confirmActions}>
            <Button variant="secondary" onClick={onClose} disabled={stage === "submitting"}>
              Volver
            </Button>
            <Button variant="primary" onClick={handleConfirm} loading={stage === "submitting"}>
              {stage === "submitting" ? "Enviando..." : "Confirmar"}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
