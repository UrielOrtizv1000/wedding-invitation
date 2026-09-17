import { MapPin } from "lucide-react";
import { useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { Button } from "../components/Button";
import { LocationModal } from "../components/LocationModal";
import { ParallaxImage } from "../components/ParallaxImage";
import { SectionHeading } from "../components/SectionHeading";
import { ceremonyImage, receptionImage } from "../data/images";
import { wedding } from "../data/wedding";
import type { VenueInfo } from "../data/types";
import type { WeddingImage } from "../data/images";
import styles from "./Venues.module.css";

interface VenueCardProps {
  kicker: string;
  venue: VenueInfo;
  image: WeddingImage;
  onViewLocation: () => void;
  delay: number;
}

function VenueCard({ kicker, venue, image, onViewLocation, delay }: VenueCardProps) {
  return (
    <AnimatedSection kind="rise" delay={delay} className={styles.card}>
      <div className={styles.imageBox}>
        <ParallaxImage image={image} strength={7} curtainColor="var(--color-surface)" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{kicker}</h3>
        <p className={styles.detail}>
          {venue.name} · {venue.time}
          <br />
          {venue.address}, {venue.city}
        </p>
        <Button variant="secondary" size="sm" icon={<MapPin size={15} />} className={styles.button} onClick={onViewLocation}>
          Ver ubicación
        </Button>
      </div>
    </AnimatedSection>
  );
}

export function Venues() {
  const [modal, setModal] = useState<"ceremony" | "reception" | null>(null);

  return (
    <section id="detalles" className={[styles.section, "section-pad"].join(" ")} aria-labelledby="venues-heading">
      <div className="container">
        <SectionHeading id="venues-heading" title="Ceremonia y recepción" align="center" />

        <div className={styles.grid}>
          <VenueCard
            kicker="Ceremonia"
            venue={wedding.ceremony}
            image={ceremonyImage}
            onViewLocation={() => setModal("ceremony")}
            delay={0}
          />
          <VenueCard
            kicker="Recepción"
            venue={wedding.reception}
            image={receptionImage}
            onViewLocation={() => setModal("reception")}
            delay={0.12}
          />
        </div>
      </div>

      <LocationModal
        open={modal === "ceremony"}
        onClose={() => setModal(null)}
        venueLabel="la ceremonia"
        venueName={wedding.ceremony.name}
        mapsUrl={wedding.ceremony.mapsUrl}
      />
      <LocationModal
        open={modal === "reception"}
        onClose={() => setModal(null)}
        venueLabel="la recepción"
        venueName={wedding.reception.name}
        mapsUrl={wedding.reception.mapsUrl}
      />
    </section>
  );
}
