import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabase } from '@/lib/supabase'
import { generateContentWithRetry } from '@/lib/gemini'
import { createWebsitePrompt } from '@/lib/prompts/website'
import { createSocialPrompt } from '@/lib/prompts/social'
import { createAdPrompt } from '@/lib/prompts/ads'
import { createEmailPrompt } from '@/lib/prompts/email'
import { canGenerateContent, incrementUsage } from '@/lib/usage'

export async function POST(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { brandId, type, subType, additionalContext } = await request.json()

        if (!brandId || !type || !subType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Check if user can generate content
        const usageCheck = await canGenerateContent(session.user.id)

        if (!usageCheck.canGenerate) {
            return NextResponse.json(
                {
                    error: usageCheck.reason,
                    currentUsage: usageCheck.currentUsage,
                    limit: usageCheck.limit
                },
                { status: 403 }
            )
        }

        // Get brand details
        const { data: brand, error: brandError } = await supabase
            .from('brands')
            .select('*')
            .eq('id', brandId)
            .eq('user_id', session.user.id)
            .single()

        if (brandError || !brand) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 })
        }

        // Generate prompt based on content type
        let prompt = ''

        switch (type) {
            case 'website':
                prompt = createWebsitePrompt(brand, subType as any, additionalContext)
                break
            case 'social':
                prompt = createSocialPrompt(brand, subType as any, additionalContext)
                break
            case 'ads':
                prompt = createAdPrompt(brand, subType as any, additionalContext)
                break
            case 'email':
                prompt = createEmailPrompt(brand, subType as any, additionalContext)
                break
            default:
                return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
        }

        // Add strict formatting instructions
        prompt += `
        
        CRITICAL FORMATTING INSTRUCTIONS:
        1. OUTPUT RAW TEXT ONLY. Do NOT use Markdown characters like asterisks (**) for bolding, hashtags (#) for headers, or brackets.
        2. Use emojis SPARINGLY (max 2-3 total) and only if clearly appropriate for the platform/tone.
        3. Structure the text with clear paragraph breaks for readability. 
        4. Do NOT include any meta-commentary (e.g. "Here is the content:", "Title:"). Return ONLY the final content body.
        `

        // Generate content using Gemini
        const generatedText = await generateContentWithRetry(prompt)

        // Create a title based on type and subtype
        const title = `${type.charAt(0).toUpperCase() + type.slice(1)} - ${subType}`

        // Save generated content
        const { data: content, error: contentError } = await supabase
            .from('contents')
            .insert({
                user_id: session.user.id,
                brand_id: brandId,
                type,
                sub_type: subType,
                title,
                content: generatedText,
                metadata: {
                    additionalContext,
                    generatedAt: new Date().toISOString()
                },
                status: 'draft'
            })
            .select()
            .single()

        if (contentError || !content) {
            return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
        }

        // Increment usage
        await incrementUsage(session.user.id)

        return NextResponse.json({
            success: true,
            content: {
                id: content.id,
                title: content.title,
                content: content.content,
                type: content.type,
                subType: content.sub_type,
                createdAt: content.created_at
            }
        })
    } catch (error) {
        console.error('Error generating content:', error)
        return NextResponse.json(
            { error: 'Failed to generate content. Please try again.' },
            { status: 500 }
        )
    }
}
