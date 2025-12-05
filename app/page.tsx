import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from '@/components/layout/navbar'
import { FiZap, FiTarget, FiTrendingUp, FiDollarSign, FiGlobe, FiMail, FiInstagram, FiCheck } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/5 dark:to-purple-600/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 animate-fade-in">
              AI-Powered Content
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                For Your Business
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400 mb-10">
              Generate professional website content, social media posts, ads, and email sequences in seconds.
              Perfect for churches, restaurants, salons, and chauffeur services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-6">
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
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Market Your Business
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Powerful AI tools designed for small businesses
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <FiGlobe className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Website Content</CardTitle>
                <CardDescription>
                  Professional copy for your homepage, about page, services, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <FiInstagram className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>
                  Engaging posts for Instagram, Facebook, LinkedIn, and Twitter
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-pink-500 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <FiTarget className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Ad Copy</CardTitle>
                <CardDescription>
                  High-converting ads for Google and Facebook campaigns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                  <FiMail className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Email Sequences</CardTitle>
                <CardDescription>
                  Welcome series, promotions, and nurture campaigns
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
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
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>© 2024 ContentAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

