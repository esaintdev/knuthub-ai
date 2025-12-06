import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from '@/components/layout/navbar'
import { FiZap, FiTarget, FiTrendingUp, FiDollarSign, FiGlobe, FiMail, FiInstagram, FiCheck } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-in">
              AI-Powered Content
              <br />
              <span className="bg-gradient-to-r from-purple-500 to-orange-300 bg-clip-text text-transparent">
                For Your Business
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-300 mb-10">
              Generate professional website content, social media posts, ads, and email sequences in seconds.
              Perfect for churches, restaurants, salons, and chauffeur services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-orange-300">
                  <FiZap className="mr-2" />
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Market Your Business
            </h2>
            <p className="text-xl text-gray-300">
              Powerful AI tools designed for small businesses
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gray-800/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <FiGlobe className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Website Content</h3>
              <p className="text-gray-400 leading-relaxed">
                Professional copy for your homepage, about page, services, and more
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gray-800/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <FiInstagram className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Social Media</h3>
              <p className="text-gray-400 leading-relaxed">
                Engaging posts for Instagram, Facebook, LinkedIn, and Twitter
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gray-800/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <FiTarget className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Ad Copy</h3>
              <p className="text-gray-400 leading-relaxed">
                High-converting ads for Google and Facebook campaigns
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gray-800/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <FiMail className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Email Sequences</h3>
              <p className="text-gray-400 leading-relaxed">
                Welcome series, promotions, and nurture campaigns
              </p>
            </div>

            {/* Card 5 */}
            <div className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gray-800/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <FiTrendingUp className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Performance Tracking</h3>
              <p className="text-gray-400 leading-relaxed">
                Monitor key metrics with real-time dashboards and actionable insights
              </p>
            </div>

            {/* Card 6 */}
            <div className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gray-800/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <FiZap className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Workflow</h3>
              <p className="text-gray-400 leading-relaxed">
                Streamline day-to-day operations by automating repetitive tasks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {/* Starter */}
            <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-orange-300 bg-clip-text text-transparent">£10</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <FiCheck className="text-purple-400 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>15 content generations/month</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <FiCheck className="text-purple-400 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>1 brand profile</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <FiCheck className="text-purple-400 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>All content types</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button variant="outline" className="w-full border-purple-500/50 text-white hover:bg-purple-500/10">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Professional */}
            <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-orange-300 bg-clip-text text-transparent">£29</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <FiCheck className="text-purple-400 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>35 content generations/month</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <FiCheck className="text-purple-400 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>3 brand profiles</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <FiCheck className="text-purple-400 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>Priority support</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button variant="outline" className="w-full border-purple-500/50 text-white hover:bg-purple-500/10">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Business */}
            <div className="relative bg-gradient-to-br from-purple-900/40 to-orange-900/40 backdrop-blur-sm border-2 border-purple-500 rounded-2xl p-6 transform md:scale-105 z-10 shadow-2xl shadow-purple-500/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-orange-300 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  Most Popular
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Business</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-orange-300 bg-clip-text text-transparent">£49</span>
                  <span className="text-gray-300 text-sm">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-200">
                  <FiCheck className="text-orange-300 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>85 content generations/month</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-200">
                  <FiCheck className="text-orange-300 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>25 brand profiles</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-200">
                  <FiCheck className="text-orange-300 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>Priority support</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-orange-300 hover:from-purple-500 hover:to-orange-300 text-white font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Gold */}
            <div className="relative bg-gradient-to-br from-yellow-900/40 to-amber-900/40 backdrop-blur-sm border border-yellow-500/50 rounded-2xl p-6 hover:border-yellow-400 transaction-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Gold</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-yellow-400">£99</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <FiCheck className="text-yellow-500 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>Unlimited generations</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <FiCheck className="text-yellow-500 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>Unlimited brand profiles</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <FiCheck className="text-yellow-500 mt-1 flex-shrink-0 w-4 h-4" />
                  <span>24/7 Dedicated Support</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button variant="outline" className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300">
                  Get Ultimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-black">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6 font-manrope">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of small businesses generating professional content
            <span className="text-purple-400 font-semibold"> 10x faster</span> with AI.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-orange-400 hover:from-purple-500 hover:to-orange-300 text-white text-xl px-12 py-8 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
            >
              Start Your Free Trial
              <FiZap className="ml-2 w-6 h-6" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">No credit card required · 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>© 2025 <span className="font-bold bg-gradient-to-r from-purple-500 to-orange-300 bg-clip-text text-transparent">KnutHub AI</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

