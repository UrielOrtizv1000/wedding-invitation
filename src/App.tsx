import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { ToastProvider } from "./components/toast/ToastProvider";
import { Intro } from "./sections/Intro";
import { Hero } from "./sections/Hero";
import { Welcome } from "./sections/Welcome";
import { Countdown } from "./sections/Countdown";
import { Story } from "./sections/Story";
import { Venues } from "./sections/Venues";
import { Itinerary } from "./sections/Itinerary";
import { DressCode } from "./sections/DressCode";
import { Gallery } from "./sections/Gallery";
import { Gifts } from "./sections/Gifts";
import { Rsvp } from "./sections/Rsvp";
import { GuestInfo } from "./sections/GuestInfo";
import { Footer } from "./sections/Footer";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <ToastProvider>
      <a href="#inicio" className="skip-link">
        Saltar al contenido
      </a>

      <Intro onDone={() => setIntroDone(true)} />

      <div inert={!introDone}>
        <Navbar />

        <main>
          <Hero />
          <Welcome />
          <Countdown />
          <Story />
          <Venues />
          <Itinerary />
          <DressCode />
          <Gallery />
          <Gifts />
          <Rsvp />
          <GuestInfo />
          <Footer />
        </main>
      </div>
    </ToastProvider>
  );
}
