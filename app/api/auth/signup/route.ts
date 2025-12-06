import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        // Check if user already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single()

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const { data: user, error: userError } = await supabase
            .from('users')
            .insert({
                name,
                email,
                password: hashedPassword,
            })
            .select()
            .single()

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Failed to create user' },
                { status: 500 }
            )
        }

        // Get or create Free plan
        let { data: freePlan } = await supabase
            .from('subscription_plans')
            .select('*')
            .eq('name', 'Free')
            .single()

        if (!freePlan) {
            // This should have been created by our setup script, but fallback just in case
            const { data: newPlan } = await supabase
                .from('subscription_plans')
                .insert({
                    name: 'Free',
                    price: 0,
                    currency: 'GBP',
                    interval: 'month',
                    generation_limit: 3,
                    brand_limit: 1,
                    features: JSON.stringify([
                        '3 content generations per day',
                        '1 brand profile',
                        'Basic Templates'
                    ])
                })
                .select()
                .single()

            freePlan = newPlan
        }

        // Create active Free subscription (no expiry)
        // Set period end to far future or handle logic elsewhere. 
        // For monthly intervals, we can just set current period end to 1 month from now for renewal logic, 
        // but for Free it implies indefinite access until upgrade. 
        // Let's set it to recurring monthly.
        const periodEnd = new Date()
        periodEnd.setMonth(periodEnd.getMonth() + 1)

        await supabase
            .from('subscriptions')
            .insert({
                user_id: user.id,
                plan_id: freePlan!.id,
                status: 'active',
                current_period_start: new Date().toISOString(),
                current_period_end: periodEnd.toISOString(),
            })

        return NextResponse.json(
            {
                message: 'User created successfully',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Signup error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
