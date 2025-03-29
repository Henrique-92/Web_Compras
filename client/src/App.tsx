import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Users from "@/pages/Users";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import DashboardLayout from "@/components/layout/DashboardLayout";

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        {/* Add pages below */}
        <Route path="/" component={Dashboard} />
        <Route path="/users" component={Users} />
        <Route path="/products" component={Products} />
        <Route path="/reports" component={Reports} />
        <Route path="/settings" component={Settings} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
