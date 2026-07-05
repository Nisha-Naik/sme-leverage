// API Service layer for SME Payment Risk Dashboard

// --- Types ---
export interface BuyerRiskProfile {
  id: string;
  name: string;
  industry: string;
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High";
  averageDelayDays: number;
  leverageScore: number;
  invoicesCount: number;
  recommendation: string;
}

export interface CashFlowScenario {
  scenario: string;
  paymentDays: number;
  workingCapitalSaved: number;
  interestSaved: number;
}

// --- Mock Data ---
const mockBuyers: BuyerRiskProfile[] = [
  { id: "B001", name: "Acme Corp", industry: "Manufacturing", riskScore: 82, riskLevel: "High", averageDelayDays: 42, leverageScore: 35, invoicesCount: 12, recommendation: "Invoice Factoring" },
  { id: "B002", name: "Global Tech", industry: "Technology", riskScore: 25, riskLevel: "Low", averageDelayDays: 5, leverageScore: 78, invoicesCount: 34, recommendation: "Standard Terms" },
  { id: "B003", name: "BuildIt Right", industry: "Construction", riskScore: 65, riskLevel: "Medium", averageDelayDays: 28, leverageScore: 45, invoicesCount: 8, recommendation: "Renegotiate Terms" },
  { id: "B004", name: "Healthcare Partners", industry: "Healthcare", riskScore: 12, riskLevel: "Low", averageDelayDays: 2, leverageScore: 85, invoicesCount: 45, recommendation: "Standard Terms" },
  { id: "B005", name: "Retail Giant", industry: "Retail", riskScore: 91, riskLevel: "High", averageDelayDays: 65, leverageScore: 20, invoicesCount: 56, recommendation: "Require Upfront Payment" },
];

// --- API Methods ---
export const api = {
  // Get all buyers for intelligence table
  getBuyers: async (): Promise<BuyerRiskProfile[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockBuyers;
  },

  // Predict risk for a specific buyer
  predictPaymentRisk: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      probability: Math.floor(Math.random() * 100),
      riskLevel: "Medium",
      shapValues: [
        { feature: "Contract Duration", impact: 0.35 },
        { feature: "Credit Rating", impact: -0.25 },
        { feature: "Previous Delays", impact: 0.6 },
        { feature: "Industry", impact: 0.15 },
      ]
    };
  },

  // Get cash flow scenarios based on input
  getCashFlowSimulations: async (invoiceAmount: number, currentDays: number, interestRate: number): Promise<CashFlowScenario[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const dailyInterest = interestRate / 365 / 100;
    
    return [
      { scenario: "30 Days", paymentDays: 30, workingCapitalSaved: invoiceAmount * ((currentDays - 30)/currentDays || 0), interestSaved: invoiceAmount * (currentDays - 30) * dailyInterest },
      { scenario: "45 Days", paymentDays: 45, workingCapitalSaved: invoiceAmount * ((currentDays - 45)/currentDays || 0), interestSaved: invoiceAmount * (currentDays - 45) * dailyInterest },
      { scenario: "60 Days", paymentDays: 60, workingCapitalSaved: invoiceAmount * ((currentDays - 60)/currentDays || 0), interestSaved: invoiceAmount * (currentDays - 60) * dailyInterest },
      { scenario: "90 Days", paymentDays: 90, workingCapitalSaved: invoiceAmount * ((currentDays - 90)/currentDays || 0), interestSaved: invoiceAmount * (currentDays - 90) * dailyInterest },
    ];
  },
  
  // Get Negotiation Leverage Index
  getNegotiationLeverage: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      index: 64,
      factors: [
        { name: "Revenue Dependency", score: 40 },
        { name: "Switching Cost", score: 85 },
        { name: "Market Competition", score: 55 },
        { name: "Relationship Years", score: 90 },
      ],
      recommendation: "Strong position. Push for 30-day terms."
    }
  }
};
