import { AnimatedSection } from "../components/AnimatedSection";
import { ParallaxImage } from "../components/ParallaxImage";
import { coupleImage } from "../data/images";
import { wedding } from "../data/wedding";
import styles from "./Welcome.module.css";

export function Welcome() {
  return (
    <section className={[styles.section, "section-pad"].join(" ")} aria-labelledby="welcome-heading">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageBox}>
            <ParallaxImage image={coupleImage} strength={9} />
          </div>

          <div className={styles.text}>
            <AnimatedSection kind="rise">
              <p id="welcome-heading" className={styles.quote}>
                “{wedding.welcomeQuote}”
              </p>
            </AnimatedSection>
            <AnimatedSection kind="rise" delay={0.08}>
              <p className={styles.body}>{wedding.welcomeText}</p>
            </AnimatedSection>
            <AnimatedSection kind="fade" delay={0.14}>
              <p className={styles.closing}>{wedding.welcomeClosing}</p>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
