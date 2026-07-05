"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, ShieldAlert, Activity, PieChart, Users, Zap, Network, Lock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const mockChartData = [
  { name: 'Jan', value: 300, color: '#2E5E4E' },
  { name: 'Feb', value: 450, color: '#2E5E4E' },
  { name: 'Mar', value: 650, color: '#2F855A' },
  { name: 'Apr', value: 800, color: '#2F855A' },
  { name: 'May', value: 500, color: '#2E5E4E' },
  { name: 'Jun', value: 200, color: '#B23A48' },
  { name: 'Jul', value: 550, color: '#2E5E4E' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#1F2933] flex flex-col items-center justify-start relative overflow-hidden font-sans">
      
      {/* Top Nav */}
      <header className="w-full h-16 flex justify-between items-center z-50 bg-[#FFFFFF] border-b border-[#E6E8EB] sticky top-0 px-6 xl:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#2E5E4E] text-white font-bold text-base shadow-sm">
            S
          </div>
          <span className="font-bold tracking-tight text-[#1F2933] text-lg">SME Leverage</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B7280]">
          <Link href="#platform" className="hover:text-[#2E5E4E] transition-colors">Platform</Link>
          <Link href="#solutions" className="hover:text-[#2E5E4E] transition-colors">Solutions</Link>
          <Link href="#methodology" className="hover:text-[#2E5E4E] transition-colors">Methodology</Link>
          <Link href="#security" className="hover:text-[#2E5E4E] transition-colors">Security</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-sm font-medium text-[#2E5E4E] hover:underline transition-colors">
            Client Portal
          </Link>
          <Link href="/login">
            <Button className="bg-[#2E5E4E] text-white hover:bg-[#254b3e] border-0 font-medium px-6 rounded-md h-9 shadow-sm">
              Request Access
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="z-10 text-center px-4 max-w-5xl mx-auto mt-20 md:mt-28 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#1F2933] mb-6 leading-[1.15]">
          Predict Payment Risk. <br className="hidden md:block" /> Quantify Negotiation Leverage.
        </h1>
        
        <p className="text-lg md:text-xl text-[#6B7280] mb-10 max-w-3xl mx-auto leading-relaxed">
          The enterprise decision-science platform for optimizing B2B working capital. Powered by synthetic machine learning models and rigorous financial methodology.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="h-12 px-8 text-base rounded-md bg-[#2E5E4E] hover:bg-[#254b3e] text-white font-semibold shadow-sm transition-colors group">
              View Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-md border-[#E6E8EB] bg-white text-[#1F2933] hover:bg-[#F7F6F3] transition-colors shadow-sm">
            Read Whitepaper
          </Button>
        </div>
      </main>

      {/* Trusted By Section */}
      <section className="w-full bg-[#FFFFFF] border-y border-[#E6E8EB] py-10 mt-20 z-10 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-150 fill-mode-both">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-6">Trusted by enterprise finance teams</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60">
            <div className="flex items-center gap-2 text-xl font-bold font-serif text-[#1F2933]"><Zap className="h-5 w-5" /> VertexInc</div>
            <div className="flex items-center gap-2 text-xl font-bold tracking-tighter text-[#1F2933]"><Network className="h-5 w-5" /> NEXUS</div>
            <div className="flex items-center gap-2 text-xl font-black italic text-[#1F2933]"><Activity className="h-5 w-5" /> PulseCorp</div>
            <div className="flex items-center gap-2 text-xl font-bold font-mono text-[#1F2933]"><Lock className="h-5 w-5" /> AURA</div>
          </div>
        </div>
      </section>

      {/* Realistic Dashboard Illustration - Light Mode */}
      <div className="w-full max-w-6xl mx-auto mt-20 px-4 z-10 relative pb-12 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300 fill-mode-both">
        <div className="rounded-[14px] border border-[#E6E8EB] bg-[#FFFFFF] shadow-sm relative overflow-hidden">
          
          <div className="p-0 grid grid-cols-1 md:grid-cols-12 gap-0">
            
            {/* Left Sidebar Mock */}
            <div className="hidden md:flex flex-col bg-[#23272F] col-span-3 border-r border-[#23272F] py-6">
              <div className="px-6 mb-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Analytics Hub
              </div>
              <div className="space-y-1 px-3">
                <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#2E5E4E] text-white shadow-sm">
                  <BarChart3 className="h-4 w-4" />
                  <span className="font-medium text-sm">Executive Dashboard</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-400">
                  <Users className="h-4 w-4" />
                  <span className="font-medium text-sm">Buyer Intelligence</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-400">
                  <Activity className="h-4 w-4" />
                  <span className="font-medium text-sm">Payment Risk</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-400">
                  <PieChart className="h-4 w-4" />
                  <span className="font-medium text-sm">Cash Flow Sim</span>
                </div>
              </div>
            </div>

            {/* Main Content Area Mock */}
            <div className="col-span-1 md:col-span-9 bg-[#F7F6F3] p-8 flex flex-col gap-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-[#1F2933] tracking-tight">Executive Dashboard</h2>
                  <p className="text-sm text-[#6B7280] mt-1">Portfolio overview and payment risk metrics.</p>
                </div>
                <Button className="bg-[#FFFFFF] text-[#1F2933] border border-[#E6E8EB] hover:bg-[#F7F6F3] shadow-sm rounded-md px-4 h-9 text-sm">
                  <ArrowRight className="mr-2 h-4 w-4" /> Export PDF
                </Button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="h-32 rounded-[14px] bg-[#FFFFFF] border border-[#E6E8EB] flex flex-col justify-between p-5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-[#6B7280]">Average Risk Score</span>
                    <ShieldAlert className="h-5 w-5 text-[#B23A48]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1F2933] mb-1">62<span className="text-[#6B7280] text-lg font-normal">/100</span></div>
                    <div className="text-xs font-medium text-[#B23A48] bg-[#B23A48]/10 px-2 py-0.5 rounded inline-block">High Exposure</div>
                  </div>
                </div>
                
                <div className="h-32 rounded-[14px] bg-[#FFFFFF] border border-[#E6E8EB] flex flex-col justify-between p-5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-[#6B7280]">Working Capital Recovery</span>
                    <TrendingUp className="h-5 w-5 text-[#2F855A]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1F2933] mb-1">₹12.5M</div>
                    <div className="text-xs font-medium text-[#2F855A] flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> +14% potential
                    </div>
                  </div>
                </div>
                
                <div className="h-32 rounded-[14px] bg-[#FFFFFF] border border-[#E6E8EB] flex flex-col justify-between p-5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-[#6B7280]">Leverage Index</span>
                    <BarChart3 className="h-5 w-5 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1F2933] mb-1">78.5</div>
                    <div className="text-xs font-medium text-[#6B7280]">Strong Position</div>
                  </div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="h-64 rounded-[14px] bg-[#FFFFFF] border border-[#E6E8EB] p-5 flex flex-col shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-[#1F2933] text-sm">Cash Flow Projection (6 Months)</h3>
                  <div className="flex gap-4">
                    <span className="flex items-center text-xs font-medium text-[#6B7280]"><div className="w-2 h-2 rounded bg-[#2E5E4E] mr-2"></div>Expected</span>
                    <span className="flex items-center text-xs font-medium text-[#6B7280]"><div className="w-2 h-2 rounded bg-[#2F855A] mr-2"></div>Optimized</span>
                  </div>
                </div>
                <div className="flex-1 w-full -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData}>
                      <XAxis dataKey="name" stroke="#A0A4A8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#A0A4A8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}k`} />
                      <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                        {mockChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <section id="platform" className="w-full max-w-7xl mx-auto px-6 py-20 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1F2933] tracking-tight mb-4">Enterprise Visibility & Control</h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">Leverage machine learning models to assess risk and structure contracts for maximum cash flow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFFFF] border border-[#E6E8EB] p-8 rounded-[14px] shadow-sm">
            <div className="h-12 w-12 rounded bg-[#F7F6F3] flex items-center justify-center mb-6">
              <ShieldAlert className="h-6 w-6 text-[#1F2933]" />
            </div>
            <h3 className="text-xl font-bold text-[#1F2933] mb-3">AI Payment Risk Prediction</h3>
            <p className="text-[#6B7280] leading-relaxed text-sm">
              Predict payment delays down to the day using synthetic historical invoice data and macroeconomic indicators. 
            </p>
          </div>
          
          <div className="bg-[#FFFFFF] border border-[#E6E8EB] p-8 rounded-[14px] shadow-sm">
            <div className="h-12 w-12 rounded bg-[#F7F6F3] flex items-center justify-center mb-6">
              <TrendingUp className="h-6 w-6 text-[#1F2933]" />
            </div>
            <h3 className="text-xl font-bold text-[#1F2933] mb-3">Negotiation Leverage Engine</h3>
            <p className="text-[#6B7280] leading-relaxed text-sm">
              Understand exactly how much bargaining power you hold over your buyers with a proprietary weighted index.
            </p>
          </div>
          
          <div className="bg-[#FFFFFF] border border-[#E6E8EB] p-8 rounded-[14px] shadow-sm">
            <div className="h-12 w-12 rounded bg-[#F7F6F3] flex items-center justify-center mb-6">
              <Activity className="h-6 w-6 text-[#1F2933]" />
            </div>
            <h3 className="text-xl font-bold text-[#1F2933] mb-3">Cash Flow Simulation</h3>
            <p className="text-[#6B7280] leading-relaxed text-sm">
              Run 'what-if' scenarios to instantly see how renegotiating payment terms frees up working capital.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-[#E6E8EB] bg-[#FFFFFF] py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#2E5E4E] text-white font-bold text-xs shadow-sm">
              S
            </div>
            <span className="font-bold tracking-tight text-[#1F2933] text-sm">SME Leverage</span>
          </div>
          <div className="text-[#6B7280] text-sm">
            © 2026 SME Leverage Inc. All rights reserved. Built for enterprise.
          </div>
          <div className="flex gap-6 text-sm font-medium text-[#6B7280]">
            <Link href="#" className="hover:text-[#1F2933] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#1F2933] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[#1F2933] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
