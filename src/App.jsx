import { useEffect } from "react";
import { volt } from "./data/volt";
import { applyTheme } from "./theme";
import { useScrollExperience } from "./hooks/useScrollExperience";
import VoltLanding from "./components/VoltLanding";
import { ScrollProgress } from "./components/bits";

export default function App() {
  useEffect(() => {
    applyTheme(volt.theme);
    document.title = `${volt.name} · ${volt.tagline}`;
    window.scrollTo(0, 0);
  }, []);

  useScrollExperience(volt.slug);

  return (
    <>
      <ScrollProgress />
      <VoltLanding gym={volt} />
    </>
  );
}
