import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Collection — Fjordleather',
  description: 'Browse our full catalog of handmade leather goods.',
}

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
