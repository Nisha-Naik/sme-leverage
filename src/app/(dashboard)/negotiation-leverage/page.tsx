"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { TrendingUp, FileText, ArrowRight, Lightbulb, Loader2, CheckCircle2 } from "lucide-react";
import { api } from "@/services/api";

export default function NegotiationLeveragePage() {
  const [data, setData] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadComplete(false);
    setTimeout(() => {
      const content = "Negotiation Leverage Index\n\nScore: 78\nStatus: Strong\n\nRecommendation: Push for Net 30 terms.";
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Leverage_Report_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsDownloading(false);
      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 2000);
    }, 1500);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getNegotiationLeverage();
      setData(res);
    };
    fetchData();
  }, []);

  if (!data) return <div className="p-8 text-muted-foreground animate-pulse">Loading leverage data...</div>;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Negotiation Leverage</h1>
          <p className="text-muted-foreground mt-1">Quantify your bargaining power to secure better payment terms.</p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[170px]"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
          ) : downloadComplete ? (
            <><CheckCircle2 className="mr-2 h-4 w-4" /> Downloaded!</>
          ) : (
            <><FileText className="mr-2 h-4 w-4" /> Download Report</>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leverage Gauge */}
        <Card className="bg-card border-border flex flex-col justify-center items-center py-10 lg:col-span-1 w-full">
          <CardHeader className="text-center pb-2 w-full px-2 sm:px-6">
            <CardTitle className="whitespace-nowrap text-xl">Leverage Index</CardTitle>
            <CardDescription className="mx-auto text-sm leading-snug">
              Your overall negotiation power (0-100)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-4">
            <div className="relative flex items-center justify-center h-48 w-48 rounded-full border-[12px] border-secondary">
              <svg className="absolute inset-0 h-full w-full transform -rotate-135">
                <circle 
                  cx="50%" cy="50%" r="44%" 
                  fill="none" 
                  stroke="var(--primary)" 
                  strokeWidth="12%" 
                  strokeDasharray="276" 
                  strokeDashoffset={276 - (276 * (data.index * 0.75)) / 100} 
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out" 
                />
              </svg>
              <div className="text-center">
                <span className="text-5xl font-bold text-foreground">{data.index}</span>
                <p className="text-sm font-medium text-primary mt-1">Strong</p>
              </div>
            </div>
            
            <div className="mt-8 space-y-3 w-full">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Market Average</span>
                <span className="font-medium">42</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-muted-foreground h-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Factor Breakdown</CardTitle>
            <CardDescription>Multi-dimensional analysis of your bargaining position.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.factors}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="name" stroke="#A0A4A8" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#E5E7EB" tick={false} />
                <Radar name="Score" dataKey="score" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <h3 className="text-xl font-bold text-foreground mt-4">Strategic Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-primary" /> Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Your high Switching Cost score (85) indicates the buyer is highly reliant on your specific services. Use this as leverage to demand better terms rather than accepting standard Net 60.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border border-l-4 border-l-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-success" /> Suggested Term
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Push for <strong>Net 30</strong> terms. The buyer's historical delay is low, meaning they have the liquidity to pay early if pressured.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border border-l-4 border-l-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-warning" /> Expected Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Moving from Net 60 to Net 30 will free up approximately <strong>₹24,500</strong> in working capital, reducing borrowing costs by 4.2% annually.
            </p>
            <Button variant="link" className="px-0 text-primary mt-2 flex items-center h-auto">
              Simulate in Cash Flow <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
