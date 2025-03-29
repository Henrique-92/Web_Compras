import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { HomeIcon, Users, ShoppingBag, BarChart2, Settings, LogOut } from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ href, icon, children, active }: NavItemProps) => {
  return (
    <div className="block">
      <Link href={href}>
        <div className={cn(
          "flex items-center px-4 py-3 rounded-md group cursor-pointer",
          active 
            ? "bg-neutral-700 text-white" 
            : "text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
        )}>
          <span className={cn(
            "h-5 w-5 mr-3",
            active ? "text-blue-500" : "text-neutral-400 group-hover:text-blue-500"
          )}>
            {icon}
          </span>
          <span className={active ? "font-medium" : ""}>{children}</span>
        </div>
      </Link>
    </div>
  );
};

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="bg-neutral-800 text-white w-64 py-6 flex flex-col hidden md:flex">
      <div className="px-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
          CompreAqui
        </h1>
      </div>
      
      <nav className="mt-6 flex-1">
        <div className="px-4 space-y-1">
          <NavItem href="/" icon={<HomeIcon />} active={location === "/"}>
            Início
          </NavItem>
          
          <NavItem href="/users" icon={<Users />} active={location === "/users"}>
            Usuários
          </NavItem>
          
          <NavItem href="/products" icon={<ShoppingBag />} active={location === "/products"}>
            Produtos
          </NavItem>
          
          <NavItem href="/reports" icon={<BarChart2 />} active={location === "/reports"}>
            Relatórios
          </NavItem>
          
          <NavItem href="/settings" icon={<Settings />} active={location === "/settings"}>
            Configurações
          </NavItem>
        </div>
      </nav>
      
      <div className="px-6 pt-4 pb-6 border-t border-neutral-700">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-neutral-600 flex items-center justify-center">
            <span className="text-white text-sm">JS</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">João Silva</p>
            <p className="text-xs text-neutral-400">admin@exemplo.com</p>
          </div>
        </div>
        <button className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm text-white bg-neutral-700 rounded-md hover:bg-neutral-600 transition-colors">
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </button>
      </div>
    </div>
  );
}
