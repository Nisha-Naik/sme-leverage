"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Loader2, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { api } from "@/services/api";

export default function PaymentRiskPage() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    try {
      const res = await api.predictPaymentRisk({});
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Payment Risk Predictor</h1>
        <p className="text-muted-foreground mt-1">AI-driven analysis of payment delay probability.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Buyer Details</CardTitle>
              <CardDescription>Enter contract and buyer information for risk assessment.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePredict} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Buyer Name</label>
                  <Input placeholder="e.g. Acme Corp" required className="bg-secondary/50 border-border" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Industry</label>
                    <Input placeholder="e.g. Manufacturing" required className="bg-secondary/50 border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Invoice Value (₹)</label>
                    <Input type="number" placeholder="5000000" required className="bg-secondary/50 border-border" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Credit Rating</label>
                    <Input placeholder="e.g. BBB" required className="bg-secondary/50 border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Previous Delays</label>
                    <Input type="number" placeholder="Days (avg)" required className="bg-secondary/50 border-border" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Contract Duration</label>
                    <Input type="number" placeholder="Months" required className="bg-secondary/50 border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Payment Terms</label>
                    <Input placeholder="e.g. Net 45" required className="bg-secondary/50 border-border" />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" disabled={isPredicting}>
                  {isPredicting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                  ) : (
                    <><ShieldAlert className="mr-2 h-4 w-4" /> Predict Risk</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Results */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-card border-border flex flex-col justify-center items-center py-8">
                  <div className="text-sm font-medium text-muted-foreground mb-4">Risk Score (Probability of Default)</div>
                  <div className="relative flex items-center justify-center h-40 w-40 rounded-full border-8 border-secondary">
                    <svg className="absolute inset-0 h-full w-full transform -rotate-90">
                      <circle cx="50%" cy="50%" r="46%" fill="none" stroke={result.probability > 60 ? "var(--destructive)" : "var(--primary)"} strokeWidth="8%" strokeDasharray="290" strokeDashoffset={290 - (290 * result.probability) / 100} className="transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="text-center">
                      <span className="text-4xl font-bold text-foreground">{result.probability}%</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={`mt-6 text-sm px-4 py-1 ${result.probability > 60 ? "border-destructive text-destructive" : "border-primary text-primary"}`}>
                    {result.probability > 60 ? "HIGH RISK" : "MODERATE RISK"}
                  </Badge>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Recommendation</CardTitle>
                    <CardDescription>Actionable next steps based on risk profile.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-secondary/30 border border-border rounded-lg">
                      <h4 className="font-semibold flex items-center text-foreground mb-2">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-success" />
                        Suggested Action
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {result.probability > 60 
                          ? "High probability of default. Consider requiring 50% upfront payment or utilizing invoice factoring services to guarantee cash flow."
                          : "Moderate risk. Standard Net 30 terms are acceptable, but monitor closely for early indicators of delay."}
                      </p>
                    </div>
                    <Button variant="outline" className="w-full border-border">
                      Explore Invoice Factoring <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Feature Importance (SHAP)</CardTitle>
                  <CardDescription>Key factors contributing to the predicted risk score.</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={result.shapValues} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
                      <XAxis type="number" stroke="#A0A4A8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis dataKey="feature" type="category" stroke="#A0A4A8" fontSize={12} tickLine={false} axisLine={false} width={100} />
                      <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{backgroundColor: '#fff', borderColor: '#E5E7EB', color: '#111827'}} />
                      <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
                        {result.shapValues.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.impact > 0 ? "var(--destructive)" : "var(--primary)"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="bg-card border-border border-dashed h-full min-h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground flex flex-col items-center">
                <ShieldAlert className="h-12 w-12 mb-4 opacity-20" />
                <p>Fill out the buyer details and predict risk to view the analysis.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
