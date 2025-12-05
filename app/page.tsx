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
      <section className="py-20 bg-transparent dark:bg-black/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Starter */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">£10</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>50 content generations/month</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>1 brand profile</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>All content types</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional */}
            <Card className="border-2 border-blue-600 shadow-xl scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">£29</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>200 content generations/month</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>3 brand profiles</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>All content types</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Business */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Business</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">£49</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Unlimited generations</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>10 brand profiles</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>All content types</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join hundreds of small businesses generating professional content with AI
          </p>
          <Link href="/signup">
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>© 2024 KnutHub AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

