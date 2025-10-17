import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./ui/theme-toggle";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Menu, Search, X, LogIn, UserPlus, LogOut, User } from "lucide-react";
import { useState } from "react";
import { MainNavigationMenu } from "./NavigationMenu";
import { SearchBar } from "./SearchBar";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [_location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-border">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Solvezyo logo" className="h-8 w-8" />
          <Link href="/" className="text-xl font-bold cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Solvezyo
          </Link>
        </div>
        
        <div className="hidden lg:block">
          <MainNavigationMenu />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden lg:block">
            <SearchBar onSearchSubmit={() => setMobileMenuOpen(false)} />
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  data-testid="button-user-profile"
                >
                  <User className="h-4 w-4" />
                  {user.displayName || user.email}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    data-testid="button-login"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2"
                    data-testid="button-signup"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <Button 
            variant={mobileMenuOpen ? "default" : "outline"}
            size="icon" 
            className="lg:hidden rounded-full transition-all duration-300 ease-in-out hover:scale-105 shadow-sm hover:shadow"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? 
              <X className="h-5 w-5 transition-transform animate-in fade-in-50 zoom-in-95" /> : 
              <Menu className="h-5 w-5 transition-transform animate-in fade-in-50 zoom-in-95" />
            }
          </Button>
        </div>
      </div>

      {/* Navigation Menu below header */}

      {/* Mobile menu - with animation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border py-4 bg-background/95 backdrop-blur-sm animate-in slide-in-from-top-5 duration-300">
          <div className="container mx-auto px-4 space-y-4">
            <SearchBar onSearchSubmit={() => setMobileMenuOpen(false)} />

            <div className="grid grid-cols-2 gap-3">
              {/* <Button 
                variant="outline" 
                className="w-full justify-start shadow-sm hover:shadow hover:bg-primary/5 border-border"
                onClick={() => {
                  setLocation("/popular");
                  setMobileMenuOpen(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                Popular
              </Button> */}
              <Button 
                variant="outline" 
                className="w-full justify-start shadow-sm hover:shadow hover:bg-primary/5 border-border"
                onClick={() => {
                  setLocation("/categories");
                  setMobileMenuOpen(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
                Categories
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start shadow-sm hover:shadow hover:bg-primary/5 border-border col-span-2"
                onClick={() => {
                  setLocation("/about");
                  setMobileMenuOpen(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                About Us
              </Button>
            </div>
        
            
            <div className="pt-2 pb-1">
              <Button
                variant="default"
                className="w-full justify-center shadow-sm bg-primary/90 hover:bg-primary"
                onClick={() => {
                  setLocation("/");
                  setMobileMenuOpen(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                Home
              </Button>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-3 border-t border-border">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-md">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{user.displayName || user.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2"
                    onClick={handleLogout}
                    data-testid="button-mobile-logout"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2"
                    onClick={() => {
                      setLocation("/login");
                      setMobileMenuOpen(false);
                    }}
                    data-testid="button-mobile-login"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                  <Button
                    variant="default"
                    className="w-full justify-center gap-2"
                    onClick={() => {
                      setLocation("/signup");
                      setMobileMenuOpen(false);
                    }}
                    data-testid="button-mobile-signup"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            
            {/* Mobile Category Navigation */}
            <div className="pt-4 border-t border-border">
              <h3 className="font-medium text-sm mb-2">Browse Categories</h3>
              <MainNavigationMenu />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
