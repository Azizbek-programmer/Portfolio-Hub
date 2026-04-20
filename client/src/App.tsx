import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "./lib/i18n";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Contact from "./pages/Contact";
import InitialLoader from "@/components/InitialLoader";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      {/* <Route component={NotFound} /> */}
      <Route path="/contact" component={Contact} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <TooltipProvider>
          {loading && <InitialLoader onComplete={() => setLoading(false)} />}
          <Router />
          {/* <Toaster /> */}
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
