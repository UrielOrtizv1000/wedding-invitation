import { AnimatedSection } from "../components/AnimatedSection";
import { ParallaxImage } from "../components/ParallaxImage";
import { SectionHeading } from "../components/SectionHeading";
import { Timeline } from "../components/Timeline";
import { storyImage } from "../data/images";
import { wedding } from "../data/wedding";
import styles from "./Story.module.css";

export function Story() {
  return (
    <section id="historia" className={[styles.section, "section-pad"].join(" ")} aria-labelledby="story-heading">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageBox}>
            <ParallaxImage image={storyImage} strength={9} />
          </div>

          <div className={styles.text}>
            <div>
              <SectionHeading id="story-heading" title={wedding.story.heading} />
              <AnimatedSection kind="rise" delay={0.1}>
                <p className={styles.intro}>{wedding.story.text}</p>
              </AnimatedSection>
            </div>
            <Timeline events={wedding.story.timeline} />
          </div>
        </div>
      </div>
    </section>
  );
}
