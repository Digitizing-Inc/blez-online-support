import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/config'

export const alt = 'Blez Online Support'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Default OG image generated at build time. Per-route OG images can
 * override by exporting their own `opengraph-image.tsx` in their route
 * folder, or returning an `openGraph.images` from `generateMetadata`.
 */
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'linear-gradient(135deg, #005c99 0%, #0099ff 50%, #005c99 100%)',
          color: '#FAFAFA',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            letterSpacing: 4,
            textTransform: 'uppercase',
            opacity: 0.9,
          }}
        >
          <span>BLEZ ONLINE</span>
          <span style={{ opacity: 0.6 }}>·</span>
          <span>SUPPORT</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -1,
              lineHeight: 1,
            }}
          >
            Real answers, instant.
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.85,
              maxWidth: 900,
            }}
          >
            Search the help center or ask the BlezBot anything about packs,
            payments, shipping, ripping, and your account.
          </div>
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
          <span>{siteConfig.siteUrl.replace(/^https?:\/\//, '')}</span>
          <span>Rip a Pack, Score Big.</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
