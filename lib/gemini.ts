import { GoogleGenAI } from '@google/genai'

if (!process.env.GOOGLE_AI_API_KEY) {
    throw new Error('GOOGLE_AI_API_KEY is not defined in environment variables')
}

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY })

export async function generateContent(prompt: string): Promise<string> {
    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt
        })

        return result.text || ''
    } catch (error) {
        console.error('Error generating content with Gemini:', JSON.stringify(error, null, 2))
        if (error instanceof Error) {
            console.error('Error message:', error.message)
            console.error('Error stack:', error.stack)
        }
        throw new Error('Failed to generate content. Please try again.')
    }
}

export async function generateContentWithRetry(
    prompt: string,
    maxRetries: number = 3
): Promise<string> {
    let lastError: Error | null = null

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await generateContent(prompt)
        } catch (error) {
            lastError = error as Error
            if (i < maxRetries - 1) {
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
            }
        }
    }

    throw lastError || new Error('Failed to generate content after retries')
}
