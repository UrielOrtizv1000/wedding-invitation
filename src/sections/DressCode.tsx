import { CheckCircle2, Shirt } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { ParallaxImage } from "../components/ParallaxImage";
import { SectionHeading } from "../components/SectionHeading";
import { dressCodeImage } from "../data/images";
import { wedding } from "../data/wedding";
import styles from "./DressCode.module.css";

const COLOR_SWATCHES: Record<string, string> = {
  "Verde salvia": "#8CA184",
  Champagne: "#D9C9A8",
  Terracota: "#C1704C",
  "Azul noche": "#2B3A55",
  Burdeos: "#722F37",
};

export function DressCode() {
  const [open, setOpen] = useState(false);
  const { dressCode } = wedding;

  return (
    <section className={[styles.section, "section-pad"].join(" ")} aria-labelledby="dresscode-heading">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageBox}>
            <ParallaxImage image={dressCodeImage} strength={9} curtainColor="var(--color-background-alt)" />
          </div>

          <div className={styles.text}>
            <SectionHeading id="dresscode-heading" title="Dress code" />
            <p className={styles.level}>{dressCode.level}</p>
            <p className={styles.description}>{dressCode.description}</p>
            <Button variant="secondary" icon={<Shirt size={16} />} onClick={() => setOpen(true)}>
              Ver recomendaciones
            </Button>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Recomendaciones de vestimenta">
        <div className={styles.groups}>
          {dressCode.guidelines.map((group) => (
            <div key={group.audience}>
              <p className={styles.groupTitle}>{group.audience}</p>
              <ul className={styles.groupList}>
                {group.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className={styles.groupTitle}>Colores sugeridos</p>
        <div className={styles.colors}>
          {dressCode.suggestedColors.map((color) => (
            <span key={color} className={styles.colorChip}>
              <span className={styles.swatch} style={{ background: COLOR_SWATCHES[color] ?? "var(--color-border)" }} />
              {color}
            </span>
          ))}
        </div>

        <p className={styles.groupTitle}>Consideraciones</p>
        <ul className={styles.considerations}>
          {dressCode.considerations.map((item) => (
            <li key={item} className={styles.considerationItem}>
              <CheckCircle2 size={15} className={styles.considerationIcon} />
              {item}
            </li>
          ))}
        </ul>
      </Modal>
    </section>
  );
}
