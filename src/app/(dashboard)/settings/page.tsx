"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Bell, Database, DownloadCloud, Sliders, Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("model");

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your platform preferences and integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('model')}
            className={`w-full justify-start ${activeTab === 'model' ? 'bg-secondary/50 text-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}
          >
            <Sliders className="mr-2 h-4 w-4" /> Model Settings
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('data')}
            className={`w-full justify-start ${activeTab === 'data' ? 'bg-secondary/50 text-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}
          >
            <Database className="mr-2 h-4 w-4" /> Data Sources
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('notifications')}
            className={`w-full justify-start ${activeTab === 'notifications' ? 'bg-secondary/50 text-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}
          >
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('export')}
            className={`w-full justify-start ${activeTab === 'export' ? 'bg-secondary/50 text-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}
          >
            <DownloadCloud className="mr-2 h-4 w-4" /> Export Preferences
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('appearance')}
            className={`w-full justify-start ${activeTab === 'appearance' ? 'bg-secondary/50 text-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}
          >
            <Moon className="mr-2 h-4 w-4" /> Appearance
          </Button>
        </div>

        {/* Content */}
        <div className="md:col-span-3 space-y-6">
          {activeTab === 'model' && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Model Settings</CardTitle>
                <CardDescription>Configure the risk prediction and negotiation leverage models.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Default Risk Threshold (%)</label>
                    <p className="text-sm text-muted-foreground">Any prediction above this value will be flagged as High Risk.</p>
                    <Input type="number" defaultValue={60} className="max-w-md bg-secondary/50 border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Leverage Weighting Strategy</label>
                    <p className="text-sm text-muted-foreground">Select how factors are weighted in the Leverage Index.</p>
                    <select className="flex h-10 w-full max-w-md items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="balanced">Balanced (Default)</option>
                      <option value="revenue-heavy">Revenue Dependency Focused</option>
                      <option value="market-heavy">Market Competition Focused</option>
                    </select>
                  </div>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'data' && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>Connect external ERP and credit bureau APIs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="border-border w-full justify-start text-muted-foreground" disabled>
                  <Database className="mr-2 h-4 w-4" /> Connect QuickBooks Online
                </Button>
                <Button variant="outline" className="border-border w-full justify-start text-muted-foreground" disabled>
                  <Database className="mr-2 h-4 w-4" /> Connect Experian Business
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage how you receive alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Notification settings are currently disabled in this demo.</p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'export' && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Export Preferences</CardTitle>
                <CardDescription>Configure default formats and layouts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Export preferences are currently disabled in this demo.</p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Theme toggle is disabled; Enterprise Dark Mode is forced.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
