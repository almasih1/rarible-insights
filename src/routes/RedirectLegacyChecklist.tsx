// src/routes/RedirectLegacyChecklist.tsx
import { useEffect } from "react";

export default function RedirectLegacyChecklist() {
  useEffect(() => {
    window.location.replace(
      "/digital-nomad-relocation/relocation-checklist-for-digital-nomads"
    );
  }, []);

  return null;
}
