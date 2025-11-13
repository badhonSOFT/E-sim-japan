import { Link } from "react-router-dom";
import { Waves } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="font-semibold text-xl">Connectra</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Premium eSIM service for seamless connectivity worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">About</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/philosophy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/mission" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/vision" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Vision
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Connectra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
