import Dashboard from "./pages/Dashboard";
import PremiumOverview from "./pages/PremiumOverview";
import Schedule from "./pages/Schedule";
import Messages from "./pages/Messages";
import Transactions from "./pages/Transactions";

function App() {
  const path = window.location.pathname;

  if (path === "/premium-overview") {
    return <PremiumOverview />;
  }
  if (path === "/schedule") {
    return <Schedule />;
  }
  if (path === "/messages") {
    return <Messages />;
  }
  if (path === "/transactions") {
    return <Transactions />;
  }

  return <Dashboard />;
}

export default App;
