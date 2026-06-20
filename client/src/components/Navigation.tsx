import { useState } from 'react';
import { Menu, X, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, switchable } = useTheme();
  const [location, navigate] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const isOnDashboard = location === '/dashboard';
  const isOnHome = location === '/';

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 ease-out">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663384572712/cmFMDcVdbmkj63oMVbQ4ma/taskflow-logo-k9mZPesxFEFCuyWsEV4DYC.webp"
            alt="TaskFlow Pro"
            className="w-8 h-8"
          />
          <span className="font-bold text-lg hidden sm:inline bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            TaskFlow Pro
          </span>
        </button>

        {/* Desktop Navigation */}
        {isOnHome && (
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300 ease-out"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {switchable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-lg"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
          )}

          {isOnDashboard && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Logout"
              className="rounded-lg"
              title="Back to Home"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          )}

          {isOnHome && (
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={handleGetStarted}
                className="rounded-lg font-semibold text-foreground/80 hover:text-foreground"
              >
                Log in
              </Button>
              <Button
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden rounded-lg"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && isOnHome && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md animate-fade-in-down">
          <div className="container py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-secondary transition-all duration-300 ease-out"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  handleGetStarted();
                  setIsOpen(false);
                }}
                className="w-full rounded-lg font-semibold"
              >
                Log in
              </Button>
              <Button
                onClick={() => {
                  handleGetStarted();
                  setIsOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
