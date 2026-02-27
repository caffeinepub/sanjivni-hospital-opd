import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Heart, Eye, EyeOff, Loader2, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useRegisterPatient } from "../hooks/useQueries";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggingIn, isLoginSuccess, identity } = useInternetIdentity();
  const registerMutation = useRegisterPatient();

  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // If already logged in, redirect
  if (identity) {
    void navigate({ to: "/dashboard" });
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error("Please fill all fields");
      return;
    }
    login();
    toast.info("Opening secure login...");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      toast.error("Please fill all fields");
      return;
    }
    // First login with Internet Identity, then register
    login();
    toast.info("Opening secure login to complete registration...");
  };

  // After login succeeds, register the patient
  const handlePostLoginRegister = async () => {
    try {
      await registerMutation.mutateAsync({
        name: registerForm.name,
        email: registerForm.email,
      });
      toast.success("Account created successfully!");
      void navigate({ to: "/dashboard" });
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo area */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-medical-green flex items-center justify-center mx-auto mb-4 shadow-medical-lg">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Sanjivni Hospital
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Patient Portal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="shadow-medical-lg border-border">
              <CardContent className="p-0">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 rounded-t-lg rounded-b-none h-12 bg-muted/50">
                    <TabsTrigger
                      value="login"
                      className="gap-2 rounded-none rounded-tl-lg data-[state=active]:bg-white data-[state=active]:text-medical-green data-[state=active]:font-semibold"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="register"
                      className="gap-2 rounded-none rounded-tr-lg data-[state=active]:bg-white data-[state=active]:text-medical-green data-[state=active]:font-semibold"
                    >
                      <UserPlus className="w-4 h-4" />
                      Register
                    </TabsTrigger>
                  </TabsList>

                  {/* Login Tab */}
                  <TabsContent value="login" className="p-6 pt-5">
                    <div className="mb-5">
                      <h2 className="font-display text-xl font-bold text-foreground">
                        Welcome Back
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Login to access your OPD appointments
                      </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email Address</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="patient@example.com"
                          autoComplete="email"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm((p) => ({ ...p, email: e.target.value }))
                          }
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            value={loginForm.password}
                            onChange={(e) =>
                              setLoginForm((p) => ({
                                ...p,
                                password: e.target.value,
                              }))
                            }
                            className="h-11 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-11 bg-medical-green hover:bg-medical-green/90 text-white font-semibold gap-2"
                        disabled={isLoggingIn}
                      >
                        {isLoggingIn ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <LogIn className="w-4 h-4" />
                        )}
                        {isLoggingIn ? "Connecting..." : "Login to Account"}
                      </Button>
                    </form>

                    <div className="mt-4 p-3 bg-medical-green-pale rounded-lg">
                      <p className="text-xs text-muted-foreground text-center">
                        Secured by{" "}
                        <span className="font-semibold text-medical-green">
                          Internet Identity
                        </span>{" "}
                        — no passwords stored
                      </p>
                    </div>
                  </TabsContent>

                  {/* Register Tab */}
                  <TabsContent value="register" className="p-6 pt-5">
                    <div className="mb-5">
                      <h2 className="font-display text-xl font-bold text-foreground">
                        Create Account
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Register as a new patient at Sanjivni Hospital
                      </p>
                    </div>

                    <form
                      onSubmit={handleRegister}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="reg-name">Full Name</Label>
                        <Input
                          id="reg-name"
                          type="text"
                          placeholder="Rahul Kumar"
                          autoComplete="name"
                          value={registerForm.name}
                          onChange={(e) =>
                            setRegisterForm((p) => ({
                              ...p,
                              name: e.target.value,
                            }))
                          }
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-email">Email Address</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="patient@example.com"
                          autoComplete="email"
                          value={registerForm.email}
                          onChange={(e) =>
                            setRegisterForm((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-password">Create Password</Label>
                        <div className="relative">
                          <Input
                            id="reg-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            autoComplete="new-password"
                            value={registerForm.password}
                            onChange={(e) =>
                              setRegisterForm((p) => ({
                                ...p,
                                password: e.target.value,
                              }))
                            }
                            className="h-11 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-11 bg-medical-green hover:bg-medical-green/90 text-white font-semibold gap-2"
                        disabled={isLoggingIn || registerMutation.isPending}
                      >
                        {isLoggingIn || registerMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <UserPlus className="w-4 h-4" />
                        )}
                        {isLoggingIn || registerMutation.isPending
                          ? "Processing..."
                          : "Create Account"}
                      </Button>
                    </form>

                    {/* Post-login register button */}
                    {isLoginSuccess && registerForm.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4"
                      >
                        <Button
                          onClick={handlePostLoginRegister}
                          className="w-full h-11 bg-medical-teal hover:bg-medical-teal/90 text-white font-semibold"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          ) : null}
                          Complete Registration
                        </Button>
                      </motion.div>
                    )}

                    <div className="mt-4 p-3 bg-medical-green-pale rounded-lg">
                      <p className="text-xs text-muted-foreground text-center">
                        Secured by{" "}
                        <span className="font-semibold text-medical-green">
                          Internet Identity
                        </span>{" "}
                        — no passwords stored
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-muted-foreground mt-6"
          >
            Need help?{" "}
            <a
              href="tel:8757188299"
              className="text-medical-green font-semibold hover:underline"
            >
              Call 8757188299
            </a>
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
