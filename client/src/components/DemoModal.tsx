import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Play } from 'lucide-react';

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DemoModal({ open, onOpenChange }: DemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl" style={{ fontFamily: 'Geist' }}>
            TaskFlow Pro Demo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Container */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">
            {!isPlaying ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-500">
                <Button
                  onClick={() => setIsPlaying(true)}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center"
                >
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </Button>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="TaskFlow Pro Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Demo Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Task Management',
                description: 'Organize tasks with custom fields, priorities, and dependencies.'
              },
              {
                title: 'Team Collaboration',
                description: 'Work together seamlessly with real-time updates and comments.'
              },
              {
                title: 'Analytics & Reports',
                description: 'Track progress with detailed insights into team productivity.'
              },
            ].map((feature, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/50 border border-border">
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-foreground/60">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-lg"
            >
              Close
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              onClick={() => {
                onOpenChange(false);
                // Navigate to dashboard would happen here
              }}
            >
              Try It Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
