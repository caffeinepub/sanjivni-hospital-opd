import { Phone, Heart, LogOut, User, LayoutDashboard, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { useNavigate } from "@tanstack/react-router";
import { useCallerUserRole } from "../../hooks/useQueries";
import { UserRole } from "../../backend.d";
import { toast } from "sonner";

export default function Header() {
  const { identity, clear, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: role } = useCallerUserRole();

  const handleLogout = () => {
    clear();
    toast.success("Logged out successfully");
    void navigate({ to: "/" });
  };

  const isLoggedIn = !!identity && !isInitializing;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Brand */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              void navigate({ to: "/" });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-medical-green flex items-center justify-center shadow-medical shrink-0">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-semibold text-foreground leading-tight text-base">
                Sanjivni Hospital
              </p>
              <p className="text-xs text-muted-foreground leading-none">
                OPD Services
              </p>
            </div>
          </a>

          {/* Support */}
          <div className="hidden md:flex items-center gap-2 bg-medical-green-pale px-3 py-1.5 rounded-full">
            <Phone className="w-3.5 h-3.5 text-medical-green shrink-0" />
            <span className="text-xs font-semibold text-medical-green">
              Support: 8757188299
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {/* Staff link — always visible */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void navigate({ to: "/staff" })}
              className="gap-1.5 text-sm hidden sm:flex text-muted-foreground hover:text-medical-green"
            >
              <Users className="w-4 h-4" />
              Our Staff
            </Button>

            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => void navigate({ to: "/dashboard" })}
                  className="gap-1.5 text-sm hidden sm:flex"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
                {role === UserRole.admin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => void navigate({ to: "/admin" })}
                    className="gap-1.5 text-sm hidden sm:flex"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-1.5 text-sm border-medical-green text-medical-green hover:bg-medical-green-pale"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => void navigate({ to: "/login" })}
                className="bg-medical-green hover:bg-medical-green/90 text-white gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
