import { AnimatePresence, motion } from "framer-motion";
import { AnimatedSection } from "../components/AnimatedSection";
import { SectionHeading } from "../components/SectionHeading";
import { useCountdown } from "../hooks/useCountdown";
import { useMotionSafe } from "../hooks/useMotionSafe";
import { wedding } from "../data/wedding";
import styles from "./Countdown.module.css";

interface UnitProps {
  value: number;
  label: string;
}

function Unit({ value, label }: UnitProps) {
  const reduced = useMotionSafe();
  const display = String(value).padStart(2, "0");

  return (
    <div className={styles.unit}>
      <div className={styles.numberFrame}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            className={styles.number}
            initial={reduced ? { opacity: 0 } : { y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: -18, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(wedding.weddingDate);

  return (
    <section className={[styles.section, "section-pad"].join(" ")} aria-label="Cuenta regresiva para la boda">
      <div className="container">
        <SectionHeading title="La cuenta regresiva" align="center" />

        {isPast ? (
          <AnimatedSection kind="fade" className={styles.todayMessage}>
            <p>¡Hoy es el gran día!</p>
          </AnimatedSection>
        ) : (
          <AnimatedSection kind="rise" className={styles.units}>
            <Unit value={days} label="Días" />
            <Unit value={hours} label="Horas" />
            <Unit value={minutes} label="Minutos" />
            <Unit value={seconds} label="Segundos" />
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
