import { ChevronDown, Home, Info, MapPinned, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { SectionHeading } from "../components/SectionHeading";
import { wedding } from "../data/wedding";
import styles from "./GuestInfo.module.css";

const ICONS: Record<string, LucideIcon> = {
  hospedaje: Home,
  transporte: MapPinned,
  informacion: Info,
};

export function GuestInfo() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className={[styles.section, "section-pad"].join(" ")} aria-labelledby="guestinfo-heading">
      <div className="container">
        <SectionHeading id="guestinfo-heading" title="Información para invitados" align="center" />

        <div className={styles.grid}>
          {wedding.guestInformation.map((block, index) => {
            const Icon = ICONS[block.id] ?? Info;
            const isOpen = openId === block.id;
            const panelId = `${block.id}-panel`;

            return (
              <AnimatedSection key={block.id} kind="rise" delay={index * 0.08} className={styles.card}>
                <button
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : block.id)}
                >
                  <span className={styles.iconBadge}>
                    <Icon size={19} strokeWidth={1.75} />
                  </span>
                  <span className={styles.triggerText}>
                    <span className={styles.title}>{block.title}</span>
                    <span className={styles.summary}>{block.summary}</span>
                  </span>
                  <ChevronDown className={[styles.chevron, isOpen ? styles.chevronOpen : ""].join(" ")} size={18} />
                </button>

                <div id={panelId} className={[styles.collapse, isOpen ? styles.collapseOpen : ""].join(" ")}>
                  <div className={styles.collapseInner}>
                    <ul className={styles.details}>
                      {block.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
