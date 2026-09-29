import React, { forwardRef, useEffect, useRef } from "react";
import { drawCertificate } from "../lib/certificate";

/**
 * Renders a certificate onto a <canvas> for the given template + name.
 * Accepts a forwarded ref so a parent can grab the canvas (e.g. to download
 * it); falls back to an internal ref when none is passed.
 */
const CertificatePreview = forwardRef(function CertificatePreview(
  { template, name, className, onReady },
  ref
) {
  const localRef = useRef(null);

  useEffect(() => {
    const canvas = (ref && ref.current) || localRef.current;
    if (!canvas) return;
    let cancelled = false;
    drawCertificate(canvas, template, name).then(() => {
      if (!cancelled && onReady) onReady();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, name]);

  return <canvas ref={ref || localRef} className={className} />;
});

export default CertificatePreview;
