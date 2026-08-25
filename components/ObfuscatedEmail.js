'use client';

import { useEffect, useState } from 'react';

// Renders a mailto link without exposing the address as plain text in the
// server-rendered HTML, so it isn't picked up by scrapers/spam bots.
export default function ObfuscatedEmail({ user, domain, className, label }) {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    setAddress(`${user}@${domain}`);
  }, [user, domain]);

  if (!address) {
    return <span className={className}>{label || 'Email Us'}</span>;
  }

  return (
    <a href={`mailto:${address}`} className={className}>
      {label || address}
    </a>
  );
}
