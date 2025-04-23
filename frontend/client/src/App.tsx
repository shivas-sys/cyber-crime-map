import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import CrimeMap from "./pages/CrimeMap";
import Analytics from "./pages/Analytics";
import BehavioralAnalysis from "./pages/BehavioralAnalysis";
import DataImport from "./pages/DataImport";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function Router() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/map" component={CrimeMap} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/behavioral" component={BehavioralAnalysis} />
          <Route path="/import" component={DataImport} />
          <Route path="/reports" component={Reports} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
