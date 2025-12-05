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

export function createWebsitePrompt(
    brand: BrandContext,
    pageType: 'homepage' | 'about' | 'services' | 'contact',
    additionalContext?: string
): string {
    const baseContext = `
You are a professional copywriter specializing in ${brand.niche}. 
Write compelling website content for ${brand.name}.

Brand Details:
- Business: ${brand.name}
- Industry: ${brand.niche}
- Tone: ${brand.tone}
- Target Audience: ${brand.targetAudience}
- Unique Selling Points: ${brand.usps}
- Services/Products: ${brand.services}
${brand.values ? `- Brand Values: ${brand.values}` : ''}

${additionalContext ? `Additional Context: ${additionalContext}` : ''}
`

    const prompts = {
        homepage: `${baseContext}

Create engaging homepage copy that includes:
1. A compelling headline (H1) that captures attention
2. A subheadline that explains the value proposition
3. 3-4 benefit statements highlighting what makes this business special
4. A strong call-to-action

Keep the tone ${brand.tone} and speak directly to ${brand.targetAudience}.
Format the output with clear sections and headings.`,

        about: `${baseContext}

Write an "About Us" page that tells the brand story and builds trust. Include:
1. The business's origin story or mission
2. What makes them different from competitors
3. Their commitment to customers
4. A personal touch that connects with ${brand.targetAudience}

Keep the tone ${brand.tone} and make it authentic and relatable.`,

        services: `${baseContext}

Create a services/products page that showcases what they offer. For each service/product:
1. A clear, benefit-focused title
2. A description that explains the value
3. Who it's perfect for
4. Why choose this service

Keep the tone ${brand.tone} and focus on benefits, not just features.`,

        contact: `${baseContext}

Write compelling contact page copy that encourages visitors to get in touch. Include:
1. A welcoming headline
2. Reasons to contact them (consultations, bookings, questions)
3. What to expect when they reach out
4. A friendly call-to-action

Keep the tone ${brand.tone} and make it inviting.`
    }

    return prompts[pageType]
}
