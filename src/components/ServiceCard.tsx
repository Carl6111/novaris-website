import Link from "next/link";
import type { Service } from "@/lib/site";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/leistungen/${service.slug}`} className="service-card">
      <div className="service-icon" aria-hidden>
        {service.icon}
      </div>
      <div className="service-name">{service.name}</div>
      <p className="service-desc">{service.short}</p>
      <span className="service-tag">{service.tag}</span>
    </Link>
  );
}
