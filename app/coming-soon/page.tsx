"use client"

import { useSearchParams } from "next/navigation"
import ComingSoon from "@/components/coming-soon"

export default function ComingSoonPage() {
  const searchParams = useSearchParams()
  const title = searchParams.get("title") || "Project"

  return <ComingSoon title={title} />
}

