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

export function createEmailPrompt(
    brand: BrandContext,
    emailType: 'welcome-series' | 'promotional' | 'nurture',
    additionalContext?: string
): string {
    const baseContext = `
You are an email marketing expert specializing in ${brand.niche}.
Create compelling email copy for ${brand.name}.

Brand Details:
- Business: ${brand.name}
- Industry: ${brand.niche}
- Tone: ${brand.tone}
- Target Audience: ${brand.targetAudience}
- Unique Selling Points: ${brand.usps}
- Services/Products: ${brand.services}

${additionalContext ? `Email Context: ${additionalContext}` : ''}
`

    const prompts = {
        'welcome-series': `${baseContext}

Create a welcome email (Email #1 of a series) that:

1. **Subject Line** (max 50 characters):
   - Warm and inviting
   - Sets expectations

2. **Preview Text** (max 90 characters):
   - Complements the subject line
   - Adds intrigue

3. **Email Body**:
   - Thank them for joining/subscribing
   - Introduce ${brand.name} and what they do
   - Set expectations for future emails
   - Include a soft call-to-action (explore services, follow on social, etc.)
   - Sign off warmly

Keep the tone ${brand.tone} and make them feel welcomed and valued.`,

        'promotional': `${baseContext}

Create a promotional email that drives action:

1. **Subject Line** (max 50 characters):
   - Create urgency or excitement
   - Highlight the offer/benefit

2. **Preview Text** (max 90 characters):
   - Expand on the subject line
   - Add value

3. **Email Body**:
   - Open with a compelling hook
   - Present the offer clearly
   - Explain the benefits to ${brand.targetAudience}
   - Create urgency (limited time, limited spots, etc.)
   - Strong call-to-action button text
   - Close with reassurance

Keep the tone ${brand.tone} and focus on conversion.`,

        'nurture': `${baseContext}

Create a nurture email that builds relationships:

1. **Subject Line** (max 50 characters):
   - Intriguing and value-focused
   - Not salesy

2. **Preview Text** (max 90 characters):
   - Hints at the value inside

3. **Email Body**:
   - Provide valuable information or tips related to ${brand.niche}
   - Share a story or insight
   - Subtly reference ${brand.name}'s expertise
   - Soft call-to-action (read more, book a consultation, etc.)
   - Build trust and authority

Keep the tone ${brand.tone} and focus on providing value, not selling.`
    }

    return prompts[emailType]
}
