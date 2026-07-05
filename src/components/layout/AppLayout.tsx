"use client";

import { Sidebar } from "./Sidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-sans text-foreground">
      {/* Sidebar Container */}
      <div className="z-20 h-full border-r border-border">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden z-10 relative">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-8">
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                type="search" 
                placeholder="Search analytics, buyers, or scenarios..." 
                className="w-full bg-background border border-border pl-10 h-10 rounded-md text-sm focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-accent rounded-md h-9 w-9 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive shadow-sm"></span>
            </Button>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-background">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
