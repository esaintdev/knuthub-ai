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

        // Get or create Starter plan
        let { data: starterPlan } = await supabase
            .from('subscription_plans')
            .select('*')
            .eq('name', 'Starter')
            .single()

        if (!starterPlan) {
            const { data: newPlan } = await supabase
                .from('subscription_plans')
                .insert({
                    name: 'Starter',
                    price: 1000,
                    currency: 'GBP',
                    interval: 'month',
                    generation_limit: 50,
                    brand_limit: 1,
                    features: JSON.stringify([
                        '50 content generations per month',
                        '1 brand profile',
                        'All content types',
                        'Email support'
                    ])
                })
                .select()
                .single()

            starterPlan = newPlan
        }

        // Create 14-day trial subscription
        const trialEnd = new Date()
        trialEnd.setDate(trialEnd.getDate() + 14)

        await supabase
            .from('subscriptions')
            .insert({
                user_id: user.id,
                plan_id: starterPlan!.id,
                status: 'active',
                current_period_start: new Date().toISOString(),
                current_period_end: trialEnd.toISOString(),
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
