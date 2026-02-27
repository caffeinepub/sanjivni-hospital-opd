import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import OPDFormPage from "./pages/OPDFormPage";
import SuccessPage from "./pages/SuccessPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";

// Root layout
function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  );
}

// Auth guard component
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-medical-green border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-body text-sm">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!identity) {
    window.location.href = "/login";
    return null;
  }

  return <>{children}</>;
}

// Route definitions
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const opdFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/opd-form",
  component: () => (
    <AuthGuard>
      <OPDFormPage />
    </AuthGuard>
  ),
});

const successRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/success",
  component: SuccessPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <AuthGuard>
      <DashboardPage />
    </AuthGuard>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AuthGuard>
      <AdminPage />
    </AuthGuard>
  ),
});

const staffRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/staff",
  component: StaffPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  opdFormRoute,
  successRoute,
  dashboardRoute,
  adminRoute,
  staffRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
