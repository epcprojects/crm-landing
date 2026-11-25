// The WhatsApp logo (public/whatsapp.svg), used wherever WhatsApp is shown.
// Size it with a size-* class. Extra props such as `weight` are accepted and
// ignored, so it can stand in for a Phosphor icon.

export default function WhatsappIcon({ className = "" }: { className?: string; weight?: string; "aria-hidden"?: boolean | "true" | "false" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/whatsapp.svg" alt="" aria-hidden="true" className={`inline-block flex-none ${className}`} />
  );
}
