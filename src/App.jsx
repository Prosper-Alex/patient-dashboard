import Dashboard from "./pages/Dashboard";
import PremiumOverview from "./pages/PremiumOverview";

function App() {
  const path = window.location.pathname;

  if (path === "/premium-overview") {
    return <PremiumOverview />;
  }

  return <Dashboard />;
}

export default App;
