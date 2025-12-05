'use client'

export default function PremiumBackground() {
    return (
        <div
            className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url(/bgkn.jpg)',
            }}
        >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />
        </div>
    )
}
