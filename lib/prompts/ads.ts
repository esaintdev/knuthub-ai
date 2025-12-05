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

export function createAdPrompt(
    brand: BrandContext,
    adType: 'google-ads' | 'facebook-ads',
    additionalContext?: string
): string {
    const baseContext = `
You are an advertising copywriter specializing in ${brand.niche}.
Create high-converting ad copy for ${brand.name}.

Brand Details:
- Business: ${brand.name}
- Industry: ${brand.niche}
- Tone: ${brand.tone}
- Target Audience: ${brand.targetAudience}
- Unique Selling Points: ${brand.usps}
- Services/Products: ${brand.services}

${additionalContext ? `Campaign Context: ${additionalContext}` : ''}
`

    if (adType === 'google-ads') {
        return `${baseContext}

Create Google Ads copy with the following components:

1. **Headlines** (3 variations, max 30 characters each):
   - Include the main benefit or offer
   - Use action words
   - Include keywords related to ${brand.niche}

2. **Descriptions** (2 variations, max 90 characters each):
   - Expand on the value proposition
   - Include a clear call-to-action
   - Highlight what makes ${brand.name} unique

Keep the tone ${brand.tone} and focus on what matters to ${brand.targetAudience}.
Format your response clearly with labeled sections.`
    }

    // Facebook Ads
    return `${baseContext}

Create Facebook Ad copy with the following components:

1. **Primary Text** (max 125 characters for best performance):
   - Hook the reader immediately
   - Speak to a pain point or desire of ${brand.targetAudience}
   - Keep it ${brand.tone}

2. **Headline** (max 40 characters):
   - Clear, benefit-focused
   - Action-oriented

3. **Description** (max 30 characters):
   - Supporting detail or call-to-action

Make it scroll-stopping and conversion-focused.
Format your response clearly with labeled sections.`
}
