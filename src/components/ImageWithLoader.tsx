import { useRef, useState, type CSSProperties } from "react";
import styles from "./ImageWithLoader.module.css";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  objectPosition?: string;
  className?: string;
  eager?: boolean;
  style?: CSSProperties;
}

export function ImageWithLoader({ src, alt, objectPosition = "center", className, eager = false, style }: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState(false);
  const checked = useRef(false);

  // A cached image can already be `complete` by the time this ref attaches,
  // in which case the `load` event has already fired and never reaches us —
  // leaving the fade-in stuck at opacity 0. Check the cache state directly.
  const handleRef = (img: HTMLImageElement | null) => {
    if (img && !checked.current) {
      checked.current = true;
      if (img.complete && img.naturalWidth > 0) {
        setLoaded(true);
      }
    }
  };

  return (
    <div className={[styles.wrap, className ?? ""].join(" ")} style={style}>
      {!loaded && <div className={styles.skeleton} aria-hidden="true" />}
      <img
        ref={handleRef}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={[styles.img, loaded ? styles.loaded : ""].join(" ")}
        style={{ objectPosition }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
