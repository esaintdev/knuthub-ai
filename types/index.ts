// Brand types
export type BrandNiche = 'churches' | 'restaurants' | 'salons' | 'chauffeurs'
export type BrandTone = 'professional' | 'casual' | 'friendly' | 'formal' | 'enthusiastic'

// Content types
export type ContentType = 'website' | 'social' | 'ads' | 'email'
export type ContentStatus = 'draft' | 'published' | 'archived'

// Website content subtypes
export type WebsiteSubType = 'homepage' | 'about' | 'services' | 'contact'

// Social media subtypes
export type SocialSubType = 'instagram' | 'facebook' | 'linkedin' | 'twitter'

// Ad subtypes
export type AdSubType = 'google-ads' | 'facebook-ads'

// Email subtypes
export type EmailSubType = 'welcome-series' | 'promotional' | 'nurture'

// Subscription types
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'past_due'
export type PlanName = 'Starter' | 'Professional' | 'Business'

// Form types
export interface BrandFormData {
    name: string
    niche: BrandNiche
    tone: BrandTone
    targetAudience: string
    usps: string
    services: string
    values?: string
}

export interface ContentGenerationRequest {
    brandId: string
    type: ContentType
    subType: string
    additionalContext?: string
}

export interface GeneratedContent {
    id: string
    title: string
    content: string
    type: ContentType
    subType: string
    createdAt: Date
}

// API Response types
export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface UsageStats {
    current: number
    limit: number
    percentage: number
}
