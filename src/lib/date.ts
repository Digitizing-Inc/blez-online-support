const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

/**
 * Formats an ISO date (YYYY-MM-DD) as "Aug 12, 2026" without relying on
 * locale/timezone (parses the parts directly so it's stable across the
 * build server and the client).
 */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('T')[0].split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${MONTHS[m - 1]} ${d}, ${y}`
}
