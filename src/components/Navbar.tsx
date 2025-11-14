import { Link, useLocation, useNavigate } from "react-router-dom";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const scrollToFaq = () => scrollToSection('faq');
  const scrollToPlans = () => scrollToSection('plans');

  return (
    <nav className="sticky top-0 z-50 w-full py-3 px-4 md:px-8 bg-background border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center"
        >
          <img 
            src="/images/logo/logo.svg" 
            alt="Connectra" 
            className="h-8 w-auto"
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/plans" 
            className={`text-sm transition-colors ${
              location.pathname === '/plans' ? 'text-black font-bold' : 'text-black hover:text-primary font-medium'
            }`}
          >
            Regional Plans
          </Link>
          <Link 
            to="/global-plans" 
            className={`text-sm transition-colors ${
              location.pathname === '/global-plans' ? 'text-black font-bold' : 'text-black hover:text-primary font-medium'
            }`}
          >
            Global Plans
          </Link>
          <Link 
            to="/devices" 
            className={`text-sm transition-colors ${
              location.pathname === '/devices' ? 'text-black font-bold' : 'text-black hover:text-primary font-medium'
            }`}
          >
            Compatible Devices
          </Link>
          <button 
            onClick={scrollToFaq}
            className="text-sm text-black hover:text-primary transition-colors font-medium"
          >
            FAQ
          </button>
          <Link 
            to="/contact" 
            className={`text-sm transition-colors ${
              location.pathname === '/contact' ? 'text-black font-bold' : 'text-black hover:text-primary font-medium'
            }`}
          >
            Contact
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <RainbowButton 
            onClick={scrollToPlans}
            className="h-9 px-4 text-sm"
          >
            Get eSIM
          </RainbowButton>
          
          <button 
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="md:hidden p-2 hover:bg-muted rounded transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-background border-b shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <Link 
              to="/plans" 
              className={`block py-2 text-sm transition-colors ${
                location.pathname === '/plans' 
                  ? 'text-black font-bold' 
                  : 'text-black hover:text-primary font-medium'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Regional Plans
            </Link>
            <Link 
              to="/global-plans" 
              className={`block py-2 text-sm transition-colors ${
                location.pathname === '/global-plans' 
                  ? 'text-black font-bold' 
                  : 'text-black hover:text-primary font-medium'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Global Plans
            </Link>
            <Link 
              to="/devices" 
              className={`block py-2 text-sm transition-colors ${
                location.pathname === '/devices' 
                  ? 'text-black font-bold' 
                  : 'text-black hover:text-primary font-medium'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Compatible Devices
            </Link>
            <button 
              onClick={scrollToFaq}
              className="block w-full text-left py-2 text-sm font-medium text-black hover:text-primary transition-colors"
            >
              FAQ
            </button>
            <Link 
              to="/contact" 
              className={`block py-2 text-sm transition-colors ${
                location.pathname === '/contact' 
                  ? 'text-black font-bold' 
                  : 'text-black hover:text-primary font-medium'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-3 border-t">
              <RainbowButton 
                onClick={scrollToPlans}
                className="w-full"
              >
                Get eSIM
              </RainbowButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
