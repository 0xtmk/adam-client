import { useRefCode } from "@/hooks/use-ref-code";
import { useLocation, useNavigate } from "react-router-dom";

// Custom hook: returns a navigate function that always appends ref_code if available
export function useRefNavigate() {
  const refCode = useRefCode();
  const navigate = useNavigate();
  const location = useLocation();

  function refNavigate(to: string, options?: { replace?: boolean; state?: any }) {
    if (refCode) {
      const url = new URL(to, window.location.origin);
      url.searchParams.set("ref_code", refCode);
      to = url.pathname + url.search + url.hash;
    }
    navigate(to, options);
  }

  return refNavigate;
}
