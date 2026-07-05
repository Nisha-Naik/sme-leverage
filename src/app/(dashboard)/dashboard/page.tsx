"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts";
import { Download, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, CheckCircle2, Loader2 } from "lucide-react";

const riskDistributionData = [
  { name: 'Low Risk', value: 400, color: 'var(--chart-2)' },
  { name: 'Medium Risk', value: 300, color: 'var(--chart-3)' },
  { name: 'High Risk', value: 300, color: 'var(--chart-1)' },
];

const cashFlowTrend = [
  { month: 'Jan', expected: 4000, recovered: 2400 },
  { month: 'Feb', expected: 3000, recovered: 1398 },
  { month: 'Mar', expected: 2000, recovered: 9800 },
  { month: 'Apr', expected: 2780, recovered: 3908 },
  { month: 'May', expected: 1890, recovered: 4800 },
  { month: 'Jun', expected: 2390, recovered: 3800 },
];

const recentAnalyses = [
  { id: 'AN-001', buyer: 'Global Tech', riskScore: 25, status: 'Low Risk', date: '2026-07-01' },
  { id: 'AN-002', buyer: 'Acme Corp', riskScore: 82, status: 'High Risk', date: '2026-07-02' },
  { id: 'AN-003', buyer: 'BuildIt Right', riskScore: 65, status: 'Medium Risk', date: '2026-07-03' },
  { id: 'AN-004', buyer: 'Retail Giant', riskScore: 91, status: 'High Risk', date: '2026-07-04' },
];

export default function DashboardPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setExportComplete(false);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Executive Dashboard</h1>
          <p className="text-muted-foreground mt-1">Portfolio overview and payment risk metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border" onClick={() => alert("Filter options will appear here.")}>
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[140px]"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Exporting...</>
            ) : exportComplete ? (
              <><CheckCircle2 className="mr-2 h-4 w-4" /> Complete!</>
            ) : (
              <><Download className="mr-2 h-4 w-4" /> Export Report</>
            )}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Payment Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">62/100</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1 text-warning">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Negotiation Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">78.5</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1 text-success">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +5.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expected Cash Recovery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹1.24M</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1 text-success">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +14% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Payment Delay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24 Days</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1 text-success">
              <ArrowDownRight className="h-3 w-3 mr-1" /> -3 days from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Payment Risk Distribution</CardTitle>
            <CardDescription className="text-muted-foreground">Portfolio risk profiling across all active buyers.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="name" stroke="#A0A4A8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A0A4A8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{fill: '#F1F5F9'}} contentStyle={{backgroundColor: '#fff', borderColor: '#E5E7EB', color: '#111827'}} />
                <Bar dataKey="value" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Cash Flow Trend</CardTitle>
            <CardDescription className="text-muted-foreground">Expected vs Recovered cash flow over 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowTrend}>
                <defs>
                  <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" stroke="#A0A4A8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A0A4A8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{backgroundColor: '#fff', borderColor: '#E5E7EB', color: '#111827'}} />
                <Area type="monotone" dataKey="recovered" stroke="var(--chart-2)" fillOpacity={1} fill="url(#colorRecovered)" />
                <Line type="monotone" dataKey="expected" stroke="#A0A4A8" strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Analyses Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Analyses</CardTitle>
          <CardDescription className="text-muted-foreground">Latest buyer risk and leverage assessments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-secondary/50">
                <TableHead className="text-muted-foreground">Analysis ID</TableHead>
                <TableHead className="text-muted-foreground">Buyer</TableHead>
                <TableHead className="text-muted-foreground">Risk Score</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAnalyses.map((analysis) => (
                <TableRow key={analysis.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-medium text-foreground">{analysis.id}</TableCell>
                  <TableCell className="text-foreground">{analysis.buyer}</TableCell>
                  <TableCell className="text-foreground">{analysis.riskScore}/100</TableCell>
                  <TableCell>
                    <Badge variant={analysis.status === 'High Risk' ? 'destructive' : analysis.status === 'Medium Risk' ? 'outline' : 'default'}
                           className={analysis.status === 'Medium Risk' ? 'border-warning text-warning' : analysis.status === 'Low Risk' ? 'bg-success hover:bg-success/80' : ''}>
                      {analysis.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{analysis.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
