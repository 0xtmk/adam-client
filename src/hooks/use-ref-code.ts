import { useEffect, useState } from "react";

// Hook to get and persist ref_code from URL
export function useRefCode() {
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("ref_code");
    if (code) {
      setRefCode(code);
      localStorage.setItem("ref_code", code);
    } else {
      // const stored = localStorage.getItem("ref_code");
      // if (stored) setRefCode(stored);
    }
  }, []);

  return refCode;
}
