import { motion } from "framer-motion";
import { Gem, Martini, Music2, PartyPopper, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { useMotionSafe } from "../hooks/useMotionSafe";
import { wedding } from "../data/wedding";
import type { ItineraryEvent } from "../data/types";
import styles from "./Itinerary.module.css";

const ICONS: Record<ItineraryEvent["icon"], LucideIcon> = {
  rings: Gem,
  cocktail: Martini,
  utensils: UtensilsCrossed,
  music: Music2,
  party: PartyPopper,
};

export function Itinerary() {
  const reduced = useMotionSafe();

  return (
    <section className={[styles.section, "section-pad"].join(" ")} aria-labelledby="itinerary-heading">
      <div className="container">
        <SectionHeading id="itinerary-heading" title="Itinerario" align="center" />

        <div className={styles.track}>
          <motion.div
            className={styles.lineMobile}
            initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className={styles.lineDesktop}
            initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          {wedding.itinerary.map((event, index) => {
            const Icon = ICONS[event.icon];
            return (
              <motion.div
                key={event.title}
                className={styles.event}
                tabIndex={0}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
              >
                <span className={styles.iconBadge}>
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <p className={styles.time}>{event.time}</p>
                  <p className={styles.title}>{event.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
