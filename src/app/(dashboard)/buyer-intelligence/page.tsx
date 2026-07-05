"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChevronDown, ChevronUp, Download } from "lucide-react";
import { api, BuyerRiskProfile } from "@/services/api";

export default function BuyerIntelligencePage() {
  const [buyers, setBuyers] = useState<BuyerRiskProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchBuyers = async () => {
      const res = await api.getBuyers();
      setBuyers(res);
    };
    fetchBuyers();
  }, []);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const filteredBuyers = buyers.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Buyer Intelligence</h1>
          <p className="text-muted-foreground mt-1">Comprehensive directory of all assessed buyers and their risk profiles.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div>
            <CardTitle>Enterprise Roster</CardTitle>
            <CardDescription>Click a row to expand timeline history.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search buyer or industry..." 
                className="w-[250px] bg-secondary/50 border-border pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-border">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow className="border-border hover:bg-secondary/30">
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead className="font-semibold text-foreground">Buyer</TableHead>
                  <TableHead className="font-semibold text-foreground">Industry</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Risk Score</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Leverage Score</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Avg Delay</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Recommendation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBuyers.length > 0 ? filteredBuyers.map((buyer) => (
                  <React.Fragment key={buyer.id}>
                    <TableRow 
                      className={`border-border hover:bg-secondary/50 cursor-pointer ${expandedRows.has(buyer.id) ? 'bg-secondary/20' : ''}`}
                      onClick={() => toggleRow(buyer.id)}
                    >
                      <TableCell>
                        {expandedRows.has(buyer.id) ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{buyer.name}</TableCell>
                      <TableCell className="text-muted-foreground">{buyer.industry}</TableCell>
                      <TableCell className="text-right font-medium">
                        <span className={buyer.riskScore > 60 ? 'text-destructive' : buyer.riskScore > 30 ? 'text-warning' : 'text-success'}>
                          {buyer.riskScore}/100
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">{buyer.leverageScore}/100</TableCell>
                      <TableCell className="text-right text-muted-foreground">{buyer.averageDelayDays} Days</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          buyer.riskLevel === 'High' ? 'border-destructive text-destructive' : 
                          buyer.riskLevel === 'Medium' ? 'border-warning text-warning' : 
                          'border-success text-success'
                        }>
                          {buyer.riskLevel} Risk
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground truncate max-w-[200px]">
                        {buyer.recommendation}
                      </TableCell>
                    </TableRow>
                    {expandedRows.has(buyer.id) && (
                      <TableRow className="border-border bg-secondary/10 hover:bg-secondary/10">
                        <TableCell colSpan={8} className="p-0">
                          <div className="p-6">
                            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Payment History Timeline</h4>
                            <div className="relative border-l border-muted-foreground ml-3 space-y-6">
                              <div className="relative pl-6">
                                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                                <p className="text-sm font-semibold text-foreground">Last Invoice Paid</p>
                                <p className="text-xs text-muted-foreground mt-1">Amount: ₹12,500 • Delayed by {buyer.averageDelayDays} days</p>
                              </div>
                              <div className="relative pl-6">
                                <div className="absolute w-3 h-3 bg-muted-foreground rounded-full -left-[6.5px] top-1"></div>
                                <p className="text-sm font-semibold text-foreground">Contract Renegotiated</p>
                                <p className="text-xs text-muted-foreground mt-1">Terms changed from Net 60 to Net 45</p>
                              </div>
                            </div>
                            <div className="mt-6">
                               <Button variant="outline" size="sm" className="border-border">View Full Profile</Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                )) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                      No buyers found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
