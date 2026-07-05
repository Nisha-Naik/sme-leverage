"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, FileIcon, Download, Presentation, Loader2, CheckCircle2 } from "lucide-react";

export default function ReportsPage() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string | null>(null);

  const handleDownload = (type: string) => {
    setDownloading(type);
    setCompleted(null);
    setTimeout(() => {
      // Create a dummy file and trigger browser download
      const content = type === 'csv' ? "Buyer,Risk,Delay\nAcme Corp,82,45\nRetail Giant,91,65" : `Executive Report Placeholder for ${type.toUpperCase()}`;
      const mimeType = type === 'csv' ? 'text/csv' : 'application/octet-stream';
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SME_Report_${new Date().toISOString().split('T')[0]}.${type}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(null);
      setCompleted(type);
      setTimeout(() => setCompleted(null), 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Reporting & Export</h1>
        <p className="text-muted-foreground mt-1">Generate executive summaries and export raw data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Export Options */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="bg-card border-border cursor-pointer hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2 gap-4">
              <div className="p-3 rounded-md bg-destructive/10">
                <FileText className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-lg">Executive Summary (PDF)</CardTitle>
                <CardDescription>C-level overview of risk & leverage.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Button 
                variant="outline"
                className="w-full bg-background hover:bg-accent text-foreground"
                onClick={() => handleDownload('pdf')}
                disabled={downloading !== null}
              >
                {downloading === 'pdf' ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating PDF...</>
                ) : completed === 'pdf' ? (
                  <><CheckCircle2 className="mr-2 h-4 w-4 text-success" /> Downloaded!</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" /> Download PDF</>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border cursor-pointer hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2 gap-4">
              <div className="p-3 rounded-md bg-warning/10">
                <Presentation className="h-6 w-6 text-warning" />
              </div>
              <div>
                <CardTitle className="text-lg">Deck (PowerPoint)</CardTitle>
                <CardDescription>Presentation ready slides.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Button 
                variant="outline"
                className="w-full bg-background hover:bg-accent text-foreground"
                onClick={() => handleDownload('pptx')}
                disabled={downloading !== null}
              >
                {downloading === 'pptx' ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating PPTX...</>
                ) : completed === 'pptx' ? (
                  <><CheckCircle2 className="mr-2 h-4 w-4 text-success" /> Downloaded!</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" /> Download PPTX</>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border cursor-pointer hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2 gap-4">
              <div className="p-3 rounded-md bg-success/10">
                <FileSpreadsheet className="h-6 w-6 text-success" />
              </div>
              <div>
                <CardTitle className="text-lg">Raw Data (Excel)</CardTitle>
                <CardDescription>Full dataset for custom analysis.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Button 
                variant="outline"
                className="w-full bg-background hover:bg-accent text-foreground"
                onClick={() => handleDownload('xlsx')}
                disabled={downloading !== null}
              >
                {downloading === 'xlsx' ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating XLSX...</>
                ) : completed === 'xlsx' ? (
                  <><CheckCircle2 className="mr-2 h-4 w-4 text-success" /> Downloaded!</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" /> Download XLSX</>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border cursor-pointer hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2 gap-4">
              <div className="p-3 rounded-md bg-muted">
                <FileIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">Raw Data (CSV)</CardTitle>
                <CardDescription>Machine readable format.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Button 
                variant="outline"
                className="w-full bg-background hover:bg-accent text-foreground"
                onClick={() => handleDownload('csv')}
                disabled={downloading !== null}
              >
                {downloading === 'csv' ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating CSV...</>
                ) : completed === 'csv' ? (
                  <><CheckCircle2 className="mr-2 h-4 w-4 text-success" /> Downloaded!</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" /> Download CSV</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Preview */}
        <div className="lg:col-span-8">
          <Card className="bg-card border-border h-full min-h-[600px] flex flex-col">
            <CardHeader className="border-b border-border bg-muted">
              <CardTitle>Executive Summary Preview</CardTitle>
              <CardDescription>Generated for July 2026</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-8 bg-background m-4 border border-border rounded shadow-sm overflow-y-auto">
              <div className="max-w-2xl mx-auto space-y-8 font-serif">
                <div className="text-center border-b border-muted pb-8">
                  <h2 className="text-3xl text-foreground font-bold mb-2">SME Financial Decision Report</h2>
                  <p className="text-muted-foreground italic">Prepared by TrustLens Analytics • July 5, 2026</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">1. Executive Overview</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    The overall portfolio payment risk stands at 62/100, indicating a moderate-to-high exposure to delayed payments, primarily concentrated in the Retail sector. The Negotiation Leverage Index is strong at 78.5, suggesting significant untapped bargaining power to enforce stricter payment terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">2. Key Risk Areas</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                    <li><strong className="text-foreground">Retail Giant</strong> presents the highest default risk (91%) with an average delay of 65 days.</li>
                    <li>Overdependence on <strong className="text-foreground">Global Tech</strong> (45% of AR) poses a concentration risk despite their low default probability.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">3. Cash Flow Opportunities</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Strategic renegotiation of terms from Net 60 to Net 30 for high-leverage clients (Score &gt; 60) can unlock approximately <strong>₹12,500,000</strong> in working capital, reducing borrowing requirements and saving an estimated ₹125,000 monthly in interest costs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
