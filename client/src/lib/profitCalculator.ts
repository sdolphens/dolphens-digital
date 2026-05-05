/**
 * Profit Audit Calculator
 * Industry benchmarks for Omaha, NE region and 400-mile radius
 */

export interface IndustryBenchmark {
  name: string;
  avgServiceValue: number;
  industryMissRate: number;
  avgCallsPerMonth: number;
  description: string;
}

export interface ProfitCalculation {
  businessType: string;
  monthlyCallsInput: number;
  industryMissRate: number;
  userMissRate: number;
  avgServiceValue: number;
  
  // Industry average calculations
  industryMonthlyLoss: number;
  industryAnnualLoss: number;
  industryPotentialRecovery: number;
  
  // User perceived calculations
  userMonthlyLoss: number;
  userAnnualLoss: number;
  userPotentialRecovery: number;
}

// Industry benchmarks based on Omaha region research
export const INDUSTRY_BENCHMARKS: Record<string, IndustryBenchmark> = {
  plumbing: {
    name: "Plumbing",
    avgServiceValue: 350,
    industryMissRate: 68, // 62-74% range, using 68% average
    avgCallsPerMonth: 60,
    description: "Service calls, repairs, installations"
  },
  hvac: {
    name: "HVAC",
    avgServiceValue: 275,
    industryMissRate: 45,
    avgCallsPerMonth: 50,
    description: "Heating, cooling, maintenance, repairs"
  },
  electrical: {
    name: "Electrical",
    avgServiceValue: 300,
    industryMissRate: 55,
    avgCallsPerMonth: 40,
    description: "Residential and commercial electrical work"
  },
  dental: {
    name: "Dental",
    avgServiceValue: 150,
    industryMissRate: 35,
    avgCallsPerMonth: 100,
    description: "Cleanings, exams, preventative care"
  },
  realEstate: {
    name: "Real Estate",
    avgServiceValue: 13432, // Average commission per sale
    industryMissRate: 45,
    avgCallsPerMonth: 35,
    description: "Agent inquiries, showings, negotiations"
  },
  lawFirm: {
    name: "Law Firm",
    avgServiceValue: 2500, // Average case value / consultation value
    industryMissRate: 35,
    avgCallsPerMonth: 40,
    description: "Consultations, case inquiries, client calls"
  },
  roofing: {
    name: "Roofing",
    avgServiceValue: 400,
    industryMissRate: 60,
    avgCallsPerMonth: 30,
    description: "Inspections, repairs, replacements"
  },
  homeServices: {
    name: "Home Services",
    avgServiceValue: 250,
    industryMissRate: 55,
    avgCallsPerMonth: 50,
    description: "Landscaping, cleaning, pest control, etc."
  }
};

/**
 * Calculate profit loss and recovery potential
 * @param businessType - Key from INDUSTRY_BENCHMARKS
 * @param monthlyCallsInput - User's estimated monthly calls
 * @param userMissRate - User's perceived missed call rate (0-100)
 * @returns Profit calculation object with industry and user-perceived scenarios
 */
export function calculateProfitLoss(
  businessType: string,
  monthlyCallsInput: number,
  userMissRate: number
): ProfitCalculation | null {
  const benchmark = INDUSTRY_BENCHMARKS[businessType];
  
  if (!benchmark || monthlyCallsInput <= 0 || userMissRate < 0 || userMissRate > 100) {
    return null;
  }

  const avgServiceValue = benchmark.avgServiceValue;
  const industryMissRate = benchmark.industryMissRate;
  
  // Industry average scenario
  const industryMissedCalls = monthlyCallsInput * (industryMissRate / 100);
  const industryMonthlyLoss = industryMissedCalls * avgServiceValue;
  const industryAnnualLoss = industryMonthlyLoss * 12;
  const industryPotentialRecovery = industryAnnualLoss * 0.6; // 60% recovery rate
  
  // User perceived scenario
  const userMissedCalls = monthlyCallsInput * (userMissRate / 100);
  const userMonthlyLoss = userMissedCalls * avgServiceValue;
  const userAnnualLoss = userMonthlyLoss * 12;
  const userPotentialRecovery = userAnnualLoss * 0.6; // 60% recovery rate

  return {
    businessType: benchmark.name,
    monthlyCallsInput,
    industryMissRate,
    userMissRate,
    avgServiceValue,
    industryMonthlyLoss,
    industryAnnualLoss,
    industryPotentialRecovery,
    userMonthlyLoss,
    userAnnualLoss,
    userPotentialRecovery
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Get industry benchmark for a business type
 */
export function getBenchmark(businessType: string): IndustryBenchmark | null {
  return INDUSTRY_BENCHMARKS[businessType] || null;
}
