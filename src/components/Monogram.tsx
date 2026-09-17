interface MonogramProps {
  size?: number;
  tone?: "dark" | "light";
  framed?: boolean;
}

/**
 * Monograma S · A como composición SVG real: dos glifos posicionados a mano,
 * un punto central vectorial (no un carácter "·") y un filete circular
 * opcional — nunca texto con letter-spacing simulando separación.
 */
export function Monogram({ size = 40, tone = "dark", framed = false }: MonogramProps) {
  const ink = tone === "dark" ? "#22221f" : "#fbf8f3";

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Monograma Sofía y Alejandro" focusable="false">
      {framed && <circle cx="32" cy="32" r="30.5" fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="1" />}
      <text
        x="18"
        y="40"
        fontFamily="'Instrument Serif', serif"
        fontSize="30"
        textAnchor="middle"
        fill={ink}
      >
        S
      </text>
      <circle cx="32" cy="34.5" r="1.8" fill={ink} />
      <text
        x="46"
        y="40"
        fontFamily="'Instrument Serif', serif"
        fontSize="30"
        textAnchor="middle"
        fill={ink}
      >
        A
      </text>
    </svg>
  );
}
