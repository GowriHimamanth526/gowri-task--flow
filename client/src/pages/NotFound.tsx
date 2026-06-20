import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* 404 Display */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-bold" style={{ fontFamily: 'Geist' }}>
            Page Not Found
          </h2>
          <p className="text-foreground/60 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Illustration */}
        <div className="py-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
            <span className="text-6xl">🔍</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
