import { NavLink } from "@/components/NavLink";
import { Home, TrendingUp, BarChart3, Brain, GitBranch } from "lucide-react";

export const Navigation = () => {
  const navItems = [
    { to: "/", label: "Inicio", icon: Home },
    { to: "/prediction", label: "Predicción", icon: TrendingUp },
    { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { to: "/models", label: "Modelos", icon: Brain },
    { to: "/pipeline", label: "Pipeline", icon: GitBranch },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground hidden sm:inline">Sistema de Predicción</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                activeClassName="text-primary bg-primary/10"
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
