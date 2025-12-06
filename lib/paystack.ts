export const initializePayment = async (email: string, amount: number, callbackUrl: string, metadata: any = {}) => {
    try {
        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                amount, // in kobo
                callback_url: callbackUrl,
                metadata,
                channels: ['card'] // limit to card if needed, or leave open
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('Paystack initialization error:', errorData)
            throw new Error(errorData.message || 'Payment initialization failed')
        }

        return await response.json()
    } catch (error) {
        console.error('Paystack error:', error)
        throw error
    }
}

export const verifyPayment = async (reference: string) => {
    try {
        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
        })

        if (!response.ok) {
            throw new Error('Payment verification failed')
        }

        return await response.json()
    } catch (error) {
        console.error('Paystack verify error:', error)
        throw error
    }
}
