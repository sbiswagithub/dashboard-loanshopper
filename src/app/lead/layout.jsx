import { Suspense } from "react";

export default function LeadLayout({ children }) {
  return <Suspense>{children}</Suspense>;
}
