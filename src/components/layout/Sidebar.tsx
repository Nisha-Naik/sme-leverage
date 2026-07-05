"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShieldAlert, 
  TrendingUp, 
  Calculator, 
  Briefcase, 
  FileText,
  Settings,
  Lightbulb,
  LogOut
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Payment Risk", href: "/payment-risk", icon: ShieldAlert },
  { name: "Negotiation Leverage", href: "/negotiation-leverage", icon: TrendingUp },
  { name: "Cash Flow Simulator", href: "/cash-flow", icon: Calculator },
  { name: "Buyer Intelligence", href: "/buyer-intelligence", icon: Briefcase },
  { name: "Insights", href: "/insights", icon: Lightbulb },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-[260px] flex-col bg-[#23272F] border-r border-[#23272F] overflow-hidden transition-all text-slate-300">
      <div className="flex h-16 items-center px-6 bg-[#23272F]">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#2E5E4E] text-white font-bold text-base shadow-sm">
            S
          </div>
          <span className="font-bold tracking-tight text-white text-lg">SME Leverage</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        <div className="px-6 mb-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">
          Analytics Hub
        </div>
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-[#2E5E4E] text-white font-medium shadow-sm"
                    : "text-slate-400 hover:bg-white/10 hover:text-white",
                  "group flex items-center rounded-md px-3 py-2 text-sm transition-all duration-150 ease-in-out"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200",
                    "mr-3 h-4 w-4 flex-shrink-0 transition-colors"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <Link href="/login" className="border-t border-white/10 p-4 bg-[#23272F] hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between group">
        <div className="flex items-center gap-3 w-full">
          <div className="h-9 w-9 rounded bg-[#2E5E4E] flex items-center justify-center text-sm font-bold text-white shadow-sm border border-white/10">
            NR
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-medium text-slate-200 truncate">Nithin R</span>
            <span className="text-xs text-slate-400 truncate">Admin Profile</span>
          </div>
        </div>
        <LogOut className="h-4 w-4 text-slate-500 group-hover:text-slate-300 transition-colors flex-shrink-0" />
      </Link>
    </div>
  );
}
