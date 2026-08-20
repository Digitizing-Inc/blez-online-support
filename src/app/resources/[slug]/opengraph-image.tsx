import { ImageResponse } from 'next/og'
import { resources, getResource, CATEGORY_LABELS } from '@/lib/resources'

export const alt = 'Blez Online Resources'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }))
}

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const resource = getResource(slug)
  const title = resource?.title ?? 'Blez Online Resources'
  const kicker = resource ? CATEGORY_LABELS[resource.category] : 'Resources'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'linear-gradient(135deg, #0a1f33 0%, #005c99 55%, #0099ff 100%)',
          color: '#FAFAFA',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: 'uppercase',
            opacity: 0.9,
          }}
        >
          <span>BLEZ ONLINE</span>
          <span style={{ opacity: 0.6 }}>·</span>
          <span>{kicker.toUpperCase()}</span>
        </div>
        <div
          style={{
            fontSize: title.length > 60 ? 60 : 76,
            fontWeight: 800,
            letterSpacing: -1,
            lineHeight: 1.05,
            maxWidth: 1040,
            display: 'flex',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: 20,
            opacity: 0.7,
          }}
        >
          <span>blezonline.com</span>
          <span>Rip a Pack, Score Big.</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
