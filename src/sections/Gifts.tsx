import { Check, Copy, CreditCard, Gift, ShoppingBag, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { Modal } from "../components/Modal";
import { SectionHeading } from "../components/SectionHeading";
import { useToast } from "../components/toast/useToast";
import { copyToClipboard } from "../lib/clipboard";
import { wedding } from "../data/wedding";
import styles from "./Gifts.module.css";

const OPTION_ICONS: Record<string, LucideIcon> = {
  liverpool: ShoppingBag,
  amazon: Gift,
  bank: CreditCard,
};

interface CopyRowProps {
  label: string;
  value: string;
  toastMessage: string;
}

function CopyRow({ label, value, toastMessage }: CopyRowProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      showToast("success", toastMessage);
      window.setTimeout(() => setCopied(false), 2500);
    } else {
      showToast("error", "No fue posible copiar. Selecciona el texto manualmente.");
    }
  };

  return (
    <div className={styles.bankRow}>
      <div className={styles.bankRowLabels}>
        <span className={styles.bankLabel}>{label}</span>
        <span className={styles.bankValue}>{value}</span>
      </div>
      <button
        className={[styles.copyButton, copied ? styles.copyButtonDone : ""].join(" ")}
        onClick={handleCopy}
        aria-label={`Copiar ${label}`}
      >
        {copied ? (
          <>
            <Check size={14} /> Copiado
          </>
        ) : (
          <>
            <Copy size={14} /> Copiar
          </>
        )}
      </button>
    </div>
  );
}

export function Gifts() {
  const [bankOpen, setBankOpen] = useState(false);
  const { bankDetails } = wedding;

  return (
    <section className={[styles.section, "section-pad"].join(" ")} aria-labelledby="gifts-heading">
      <div className="container">
        <SectionHeading id="gifts-heading" title="Mesa de regalos" align="center" />
        <p className={styles.intro}>{wedding.giftRegistry.intro}</p>

        <div className={styles.options}>
          {wedding.giftRegistry.options.map((option, i) => {
            const Icon = OPTION_ICONS[option.id] ?? Gift;
            const handleSelect = () => {
              if (option.id === "bank") {
                setBankOpen(true);
              } else if (option.href) {
                window.open(option.href, "_blank", "noopener,noreferrer");
              }
            };
            return (
              <AnimatedSection key={option.id} kind="rise" delay={i * 0.08}>
                <button className={styles.option} onClick={handleSelect}>
                  <span className={styles.iconBadge}>
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className={styles.optionLabel}>{option.label}</span>
                  <span className={styles.optionDesc}>{option.description}</span>
                </button>
              </AnimatedSection>
            );
          })}
        </div>
      </div>

      <Modal open={bankOpen} onClose={() => setBankOpen(false)} title="Datos bancarios">
        <div className={styles.bankRows}>
          <div className={styles.bankRow}>
            <div className={styles.bankRowLabels}>
              <span className={styles.bankLabel}>Banco</span>
              <span className={styles.bankValue}>{bankDetails.bankName}</span>
            </div>
          </div>
          <div className={styles.bankRow}>
            <div className={styles.bankRowLabels}>
              <span className={styles.bankLabel}>Titular</span>
              <span className={styles.bankValue}>{bankDetails.accountHolder}</span>
            </div>
          </div>
          <CopyRow label="CLABE" value={bankDetails.clabe} toastMessage="CLABE copiada al portapapeles" />
          <CopyRow label="Número de cuenta" value={bankDetails.accountNumber} toastMessage="Número de cuenta copiado al portapapeles" />
        </div>
      </Modal>
    </section>
  );
}
