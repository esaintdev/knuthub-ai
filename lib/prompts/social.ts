import type { BrandNiche, BrandTone } from '@/types'

interface BrandContext {
    name: string
    niche: BrandNiche
    tone: BrandTone
    targetAudience: string
    usps: string
    services: string
    values?: string
}

export function createSocialPrompt(
    brand: BrandContext,
    platform: 'instagram' | 'facebook' | 'linkedin' | 'twitter',
    additionalContext?: string
): string {
    const baseContext = `
You are a social media expert specializing in ${brand.niche}.
Create an engaging social media post for ${brand.name}.

Brand Details:
- Business: ${brand.name}
- Industry: ${brand.niche}
- Tone: ${brand.tone}
- Target Audience: ${brand.targetAudience}
- Unique Selling Points: ${brand.usps}
- Services/Products: ${brand.services}

${additionalContext ? `Post Context: ${additionalContext}` : ''}
`

    const platformSpecs = {
        instagram: {
            charLimit: 2200,
            style: 'Visual storytelling with emojis, line breaks for readability',
            hashtags: 'Include 10-15 relevant hashtags'
        },
        facebook: {
            charLimit: 63206,
            style: 'Conversational and community-focused',
            hashtags: 'Include 3-5 relevant hashtags'
        },
        linkedin: {
            charLimit: 3000,
            style: 'Professional and value-driven',
            hashtags: 'Include 3-5 professional hashtags'
        },
        twitter: {
            charLimit: 280,
            style: 'Concise and punchy',
            hashtags: 'Include 2-3 hashtags'
        }
    }

    const spec = platformSpecs[platform]

    return `${baseContext}

Platform: ${platform.charAt(0).toUpperCase() + platform.slice(1)}
Character Limit: ${spec.charLimit}
Style: ${spec.style}

Create a ${brand.tone} post that:
1. Captures attention in the first line
2. Provides value or entertainment to ${brand.targetAudience}
3. Includes a clear call-to-action
4. ${spec.hashtags}
5. Stays within ${spec.charLimit} characters

Make it authentic, engaging, and aligned with the brand voice.`
}
