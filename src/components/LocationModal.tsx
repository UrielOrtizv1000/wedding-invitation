import { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { useToast } from "./toast/useToast";
import styles from "./LocationModal.module.css";

interface LocationModalProps {
  open: boolean;
  onClose: () => void;
  venueLabel: string;
  venueName: string;
  mapsUrl: string;
}

export function LocationModal({ open, onClose, venueLabel, venueName, mapsUrl }: LocationModalProps) {
  const [opening, setOpening] = useState(false);
  const { showToast } = useToast();

  const handleConfirm = () => {
    setOpening(true);
    showToast("info", "Abriendo ubicación…");
    window.setTimeout(() => {
      window.open(mapsUrl, "_blank", "noopener,noreferrer");
      setOpening(false);
      onClose();
    }, 650);
  };

  return (
    <Modal open={open} onClose={onClose} title={`Ubicación de ${venueLabel.toLowerCase()}`}>
      <p className={styles.text}>
        ¿Quieres abrir la ubicación de {venueLabel.toLowerCase()} en Google Maps
        {venueName ? ` (${venueName})` : ""}?
      </p>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onClose} disabled={opening}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm} loading={opening}>
          {opening ? "Abriendo ubicación…" : "Abrir ubicación"}
        </Button>
      </div>
    </Modal>
  );
}
