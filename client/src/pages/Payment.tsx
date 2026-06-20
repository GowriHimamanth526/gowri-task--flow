import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Payment() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [plan, setPlan] = useState('Professional');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('plan');
    if (p) setPlan(p);
  }, []);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Redirect after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold">Payment Successful!</h2>
          <p className="text-muted-foreground">
            Welcome to the {plan} tier. You now have access to advanced features.
          </p>
          <p className="text-sm text-muted-foreground animate-pulse">Redirecting to your dashboard...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 py-12">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-start">
        {/* Payment Form */}
        <Card className="p-6 md:p-8 space-y-8 order-2 md:order-1">
          <div>
            <h2 className="text-2xl font-bold mb-2">Secure Checkout</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              256-bit SSL encryption
            </p>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email address</label>
                <Input required type="email" placeholder="sarah@example.com" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">Card information</label>
                <Input required placeholder="1234 5678 9101 1121" className="mb-2" maxLength={19} />
                <div className="grid grid-cols-2 gap-4">
                  <Input required placeholder="MM/YY" maxLength={5} />
                  <Input required placeholder="CVC" maxLength={4} />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">Cardholder name</label>
                <Input required placeholder="Sarah Chen" />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Subscribe to ${plan}`}
            </Button>
          </form>
        </Card>

        {/* Order Summary */}
        <div className="space-y-6 order-1 md:order-2">
          <Card className="p-6 bg-blue-600 text-white border-blue-600">
            <h3 className="text-xl font-bold mb-2">{plan} Plan</h3>
            <p className="text-blue-100 mb-6">Upgrade to advanced features and take your productivity to the next level.</p>
            
            <div className="space-y-4 pt-6 border-t border-blue-500">
              <div className="flex justify-between items-center">
                <span>Billed monthly</span>
                <span className="text-2xl font-bold">{plan === 'Enterprise' ? '$99' : '$29'}</span>
              </div>
            </div>
          </Card>
          
          <div className="px-4 text-sm text-muted-foreground text-center">
            By confirming your subscription, you allow TaskFlow Pro to charge you for future payments in accordance with their terms.
          </div>
        </div>
      </div>
    </div>
  );
}
