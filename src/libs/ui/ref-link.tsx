import { Link, LinkProps, useLocation } from "react-router-dom";
import { useRefCode } from "@/hooks/use-ref-code";
import React from "react";

// A wrapper for Link that always appends ref_code if available
export const RefLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const refCode = useRefCode();
    const location = useLocation();
    let to = props.to;

    if (typeof to === "string" && refCode) {
      const url = new URL(to, window.location.origin);
      url.searchParams.set("ref_code", refCode);
      to = url.pathname + url.search + url.hash;
    }

    return <Link {...props} to={to} ref={ref} />;
  }
);
RefLink.displayName = "RefLink";
