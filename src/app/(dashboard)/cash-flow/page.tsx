"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { DollarSign, ArrowDownToLine, TrendingUp, Wallet } from "lucide-react";
import { api, CashFlowScenario } from "@/services/api";

export default function CashFlowSimulatorPage() {
  const [invoiceAmount, setInvoiceAmount] = useState<number>(5000000);
  const [currentDays, setCurrentDays] = useState<number>(90);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [scenarios, setScenarios] = useState<CashFlowScenario[]>([]);

  useEffect(() => {
    const fetchSimulations = async () => {
      const results = await api.getCashFlowSimulations(invoiceAmount, currentDays, interestRate);
      setScenarios(results);
    };
    fetchSimulations();
  }, [invoiceAmount, currentDays, interestRate]);

  // Waterfall Chart Data Prep
  const currentWorkingCapitalGap = (invoiceAmount / 30) * currentDays;
  const targetDays = 30; // Assuming we want to negotiate down to 30
  const improvedGap = (invoiceAmount / 30) * targetDays;
  const cashFreed = currentWorkingCapitalGap - improvedGap;
  
  const waterfallData = [
    { name: 'Current Gap', base: 0, value: currentWorkingCapitalGap, color: '#2E5E4E' },
    { name: 'Cash Freed', base: improvedGap, value: cashFreed, color: '#2F855A' },
    { name: 'New Gap', base: 0, value: improvedGap, color: '#2E5E4E' },
  ];
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 1, notation: 'compact' }).format(val);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Cash Flow Simulator</h1>
        <p className="text-muted-foreground mt-1">Visualize the impact of payment terms on your working capital.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Simulation Parameters</CardTitle>
              <CardDescription>Adjust values to recalculate scenarios.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Invoice Amount (₹)</label>
                <Input 
                  type="number" 
                  value={invoiceAmount} 
                  onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                  className="bg-secondary/50 border-border" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Current Payment Terms (Days)</label>
                <Input 
                  type="number" 
                  value={currentDays} 
                  onChange={(e) => setCurrentDays(Number(e.target.value))}
                  className="bg-secondary/50 border-border" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Annual Borrowing Rate (%)</label>
                <Input 
                  type="number" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="bg-secondary/50 border-border" 
                />
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Real-Time Calculations</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground flex items-center"><Wallet className="w-4 h-4 mr-2 text-muted-foreground"/> Current WC Gap</span>
                    <span className="font-semibold">{formatCurrency(currentWorkingCapitalGap)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-muted-foreground"/> Daily Interest Cost</span>
                    <span className="font-semibold text-warning">{formatCurrency((invoiceAmount * (interestRate/100)) / 365)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Scenarios & Chart */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenarios.map((scenario) => {
              const isCurrent = scenario.paymentDays === currentDays;
              const isBetter = scenario.paymentDays < currentDays;
              return (
                <Card key={scenario.scenario} className={`bg-card border-border ${isCurrent ? 'opacity-50' : isBetter ? 'border-success/50 bg-success/5' : ''}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-center">{scenario.scenario}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    {isCurrent ? (
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Baseline</span>
                    ) : (
                      <>
                        <div className="text-xl font-bold text-success mb-1">
                          +{formatCurrency(scenario.workingCapitalSaved)}
                        </div>
                        <p className="text-xs text-muted-foreground">Cash Freed</p>
                        
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <div className="text-sm font-semibold text-foreground">
                            {formatCurrency(scenario.interestSaved)}
                          </div>
                          <p className="text-xs text-muted-foreground">Interest Saved</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Working Capital Waterfall (Net 90 → Net 30)</CardTitle>
              <CardDescription>Visualizing the liquidity improvement of a successful negotiation.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterfallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="name" stroke="#A0A4A8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A0A4A8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip 
                    cursor={{fill: '#F1F5F9'}} 
                    contentStyle={{backgroundColor: '#fff', borderColor: '#E5E7EB', color: '#111827'}}
                    itemStyle={{color: '#1F2933'}}
                    formatter={(val: any) => formatCurrency(Number(val) || 0)}
                  />
                  <Bar dataKey="base" stackId="a" fill="transparent" />
                  <Bar dataKey="value" stackId="a" radius={[4, 4, 0, 0]}>
                     {waterfallData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
