"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, DollarSign, Building2, Briefcase, Lightbulb } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Executive Insights</h1>
        <p className="text-muted-foreground mt-1">Consulting-style analysis of portfolio risks and opportunities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Insight 1 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-destructive/10 rounded-md">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <CardTitle className="text-base">Top Risky Buyers</CardTitle>
            </div>
            <CardDescription>Highest probability of default (&gt;80%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mt-2">
              <li className="flex justify-between items-center text-sm">
                <span className="font-medium text-foreground">Retail Giant</span>
                <span className="text-destructive font-bold">91% Risk</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="font-medium text-foreground">Acme Corp</span>
                <span className="text-destructive font-bold">82% Risk</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="font-medium text-foreground">MegaMart</span>
                <span className="text-destructive font-bold">81% Risk</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Insight 2 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-warning/10 rounded-md">
                <Building2 className="h-5 w-5 text-warning" />
              </div>
              <CardTitle className="text-base">Industry Exposure</CardTitle>
            </div>
            <CardDescription>Sectors with highest average delays</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mt-2">
              <li className="flex justify-between items-center text-sm">
                <span className="font-medium text-foreground">Retail</span>
                <span className="text-warning font-bold">65 Days</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="font-medium text-foreground">Manufacturing</span>
                <span className="text-warning font-bold">42 Days</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="font-medium text-foreground">Construction</span>
                <span className="text-warning font-bold">28 Days</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Insight 3 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-primary/10 rounded-md">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">Overdependence</CardTitle>
            </div>
            <CardDescription>Concentration risk analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2 text-sm text-muted-foreground leading-relaxed">
              <p className="mb-2">
                <strong className="text-foreground">Global Tech</strong> accounts for <strong className="text-primary">45%</strong> of your total accounts receivable. 
              </p>
              <p>
                While their payment risk is low (25%), losing this client would severely impact working capital. Diversification of the client base is highly recommended.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Insight 4 */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-success/10 rounded-md">
                <Lightbulb className="h-5 w-5 text-success" />
              </div>
              <CardTitle className="text-base">Valuable Negotiation Opportunities</CardTitle>
            </div>
            <CardDescription>Accounts where you possess high bargaining leverage.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                <h4 className="font-semibold text-foreground mb-1">Healthcare Partners</h4>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Leverage Score</span>
                  <span className="text-success font-bold">85/100</span>
                </div>
                <p className="text-xs text-muted-foreground">Current terms are Net 60. Given the high switching cost for the buyer, standardizing to Net 30 is highly achievable.</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                <h4 className="font-semibold text-foreground mb-1">Global Tech</h4>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Leverage Score</span>
                  <span className="text-success font-bold">78/100</span>
                </div>
                <p className="text-xs text-muted-foreground">Long-standing relationship (5+ years). Renegotiation of early payment discounts could yield significant cash flow.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insight 5 */}
        <Card className="bg-card border-border bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-success/10 rounded-md">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <CardTitle className="text-base">Potential Cash Recovery</CardTitle>
            </div>
            <CardDescription>Value trapped in delayed payments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mt-6">
              <span className="text-4xl font-bold text-foreground mb-2">₹12,500,000</span>
              <span className="text-sm font-medium text-muted-foreground text-center">Total Working Capital Unlocked</span>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Recoverable by transitioning all Net 60/90 contracts to Net 30 where Leverage Score &gt; 60.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
