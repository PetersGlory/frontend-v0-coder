import { useEffect, useState } from 'react'
import { Check, Star, CreditCard, X } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import { getBillingPlans, subscribeToPlan, getMySubscription, cancelMySubscription, BillingPlan, SubscriptionInfo } from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

export default function PricingPage() {
  const { isAuthenticated } = useAuth()
  const [plans, setPlans] = useState<BillingPlan[]>([])
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [plansRes, subscriptionRes] = await Promise.all([
        getBillingPlans(),
        isAuthenticated ? getMySubscription() : Promise.resolve({ success: true, data: { subscription: null } })
      ])

      if (plansRes.success) {
        setPlans(plansRes.data?.plans || [])
      } else {
        setError(plansRes.error || 'Failed to load plans')
      }

      if (subscriptionRes.success) {
        setSubscription(subscriptionRes.data?.subscription || null)
      }
    } catch (err) {
      setError('Failed to load pricing information')
    }
    
    setLoading(false)
  }

  const handleSubscribe = async (planCode: string) => {
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }

    setActionLoading(planCode)
    try {
      const res = await subscribeToPlan(planCode)
      if (res.success) {
        setSubscription(res.data?.subscription || null)
        // Show success message or redirect
      } else {
        setError(res.error || 'Failed to subscribe')
      }
    } catch (err) {
      setError('Failed to subscribe to plan')
    }
    setActionLoading(null)
  }

  const handleCancel = async () => {
    setActionLoading('cancel')
    try {
      const res = await cancelMySubscription()
      if (res.success) {
        setSubscription(res.data?.subscription || null)
      } else {
        setError(res.error || 'Failed to cancel subscription')
      }
    } catch (err) {
      setError('Failed to cancel subscription')
    }
    setActionLoading(null)
  }

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`
  }

  const isCurrentPlan = (planCode: string) => {
    return subscription?.plan_code === planCode && subscription?.status === 'active'
  }

  const canSubscribe = (planCode: string) => {
    return !isCurrentPlan(planCode) && subscription?.status !== 'active'
  }

  return (
    <AppLayout
      title="Pricing"
      subtitle="Choose the perfect plan for your backend generation needs"
    >
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-neutral-500">Loading pricing plans...</div>
        </div>
      ) : error ? (
        <div className="card text-center">
          <h3 className="text-xl font-display font-semibold text-red-700 mb-2">Error</h3>
          <p className="text-neutral-600 mb-4">{error}</p>
          <button onClick={loadData} className="btn-primary">Try Again</button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Current Subscription Status */}
          {subscription && subscription.status === 'active' && (
            <div className="card bg-green-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Current Plan: {subscription.plan_code}</h3>
                  <p className="text-green-600">
                    {subscription.current_period_end 
                      ? `Renews on ${new Date(subscription.current_period_end).toLocaleDateString()}`
                      : 'Active subscription'
                    }
                  </p>
                </div>
                <button
                  onClick={handleCancel}
                  disabled={actionLoading === 'cancel'}
                  className="btn-sm bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                >
                  {actionLoading === 'cancel' ? 'Canceling...' : 'Cancel Subscription'}
                </button>
              </div>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.code}
                className={`card relative ${
                  plan.code === 'pro' 
                    ? 'ring-2 ring-primary-500 shadow-lg scale-105' 
                    : 'hover:shadow-lg transition-shadow duration-200'
                }`}
              >
                {plan.code === 'pro' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-neutral-900">
                      {formatPrice(plan.price_cents)}
                    </span>
                    <span className="text-neutral-500 ml-2">/{plan.interval}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-neutral-700">
                      {plan.request_limit} requests per {plan.interval}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-neutral-700">
                      {plan.priority_support ? 'Priority support' : 'Standard support'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-neutral-700">Full API access</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-neutral-700">History tracking</span>
                  </div>
                </div>

                <div className="mt-auto">
                  {isCurrentPlan(plan.code) ? (
                    <div className="w-full py-3 px-4 bg-green-100 text-green-800 rounded-xl text-center font-medium">
                      Current Plan
                    </div>
                  ) : canSubscribe(plan.code) ? (
                    <button
                      onClick={() => handleSubscribe(plan.code)}
                      disabled={actionLoading === plan.code}
                      className={`w-full py-3 px-4 rounded-xl font-medium transition-colors duration-200 ${
                        plan.code === 'pro'
                          ? 'bg-primary-600 hover:bg-primary-700 text-white'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                      } disabled:opacity-50`}
                    >
                      {actionLoading === plan.code ? (
                        <span className="inline-flex items-center">
                          <span className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                          Processing...
                        </span>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 inline mr-2" />
                          Subscribe
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="w-full py-3 px-4 bg-neutral-100 text-neutral-500 rounded-xl text-center font-medium">
                      {subscription?.status === 'active' ? 'Upgrade required' : 'Login to subscribe'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="card">
            <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-neutral-900 mb-2">Can I change my plan anytime?</h4>
                <p className="text-neutral-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div>
                <h4 className="font-medium text-neutral-900 mb-2">What happens if I exceed my request limit?</h4>
                <p className="text-neutral-600">You'll be notified when approaching your limit. Additional requests can be purchased or you can upgrade your plan.</p>
              </div>
              <div>
                <h4 className="font-medium text-neutral-900 mb-2">Is there a free trial?</h4>
                <p className="text-neutral-600">Yes! The Free plan includes 10 requests per month to get you started.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
