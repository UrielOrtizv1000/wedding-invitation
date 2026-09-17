import { Menu } from "lucide-react";
import { useState } from "react";
import { NAV_ITEMS, SECTION_IDS } from "../data/navigation";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrolled } from "../hooks/useScrolled";
import { Monogram } from "./Monogram";
import { MobileMenu } from "./MobileMenu";
import styles from "./Navbar.module.css";

export function Navbar() {
  const scrolled = useScrolled(48);
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className={[styles.nav, scrolled ? styles.scrolled : ""].join(" ")}>
        <div className={styles.inner}>
          <a href="#inicio" className={styles.brand} aria-label="Ir al inicio">
            <Monogram size={30} tone={scrolled ? "dark" : "light"} />
          </a>

          <ul className={styles.links}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={[styles.link, active === item.id ? styles.linkActive : ""].join(" ")}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú de navegación"
            aria-haspopup="dialog"
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeId={active} />
    </>
  );
}
