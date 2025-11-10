import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Menu, 
  X, 
  Home,
  Settings,
  Bell,
  User,
  Search,
  UserCircle,
  Lock,
  Mail,
  CreditCard,
  LogOut
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleSettingsClick = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/admin/login';
  };

  const settingsMenuItems = [
    { icon: UserCircle, label: "My Account", action: () => console.log('My Account') },
    { icon: User, label: "Profile", action: () => console.log('Profile') },
    { icon: Lock, label: "Change Password", action: () => console.log('Change Password') },
    { icon: Mail, label: "Email Configuration", action: () => console.log('Email Configuration') },
    { icon: CreditCard, label: "Stripe Configure", action: () => console.log('Stripe Configure') },
    { icon: LogOut, label: "Logout", action: handleLogout, danger: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { to: "/admin", icon: Home, label: "Dashboard", exact: true },
    { to: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { to: "/admin/customers", icon: Users, label: "Customers" },
    { to: "/admin/reports", icon: BarChart3, label: "Analytics" },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/admin"
            className="flex items-center gap-3 font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JP</span>
            </div>
            Admin Portal
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to, item.exact);
              return (
                <Link 
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-blue-50 text-blue-700 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search..." 
                className="pl-10 w-56 h-9 bg-gray-50/80 border border-gray-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative h-9 w-9 p-0 hover:bg-gray-100"
              onClick={handleNotificationClick}
            >
              <Bell className="h-4 w-4 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500 flex items-center justify-center">
                3
              </Badge>
            </Button>
            
            {/* Settings */}
            <div className="relative" ref={settingsRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 w-9 p-0 hover:bg-gray-100"
                onClick={handleSettingsClick}
              >
                <Settings className="h-4 w-4 text-gray-600" />
              </Button>
              
              {showSettingsMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {settingsMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setShowSettingsMenu(false);
                        }}
                        className={cn(
                          "flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors",
                          item.danger ? "text-red-600 hover:bg-red-50" : "text-gray-700"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Profile */}
            <div className="flex items-center gap-3 pl-3 ml-2 border-l border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@japanconnect.com</p>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-white border-b shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to, item.exact);
              return (
                <Link 
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            
            <div className="pt-3 mt-3 border-t border-gray-200">
              <div className="flex items-center gap-3 px-3 py-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@japanconnect.com</p>
                </div>
              </div>
              
              <div className="space-y-1">
                {settingsMenuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setIsMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-3 w-full px-3 py-2 text-sm text-left hover:bg-gray-50 rounded-lg transition-colors",
                        item.danger ? "text-red-600 hover:bg-red-50" : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;