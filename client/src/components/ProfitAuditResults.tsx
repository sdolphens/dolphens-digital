import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Target } from "lucide-react";
import { ProfitCalculation, formatCurrency, getBenchmark } from "@/lib/profitCalculator";

interface ProfitAuditResultsProps {
  calculation: ProfitCalculation;
  onBookCall: () => void;
  calendlyUrl?: string;
}

export default function ProfitAuditResults({ calculation, onBookCall, calendlyUrl }: ProfitAuditResultsProps) {
  const benchmark = getBenchmark(calculation.businessType.toLowerCase().replace(/\s+/g, ""));
  const isUserRateHigher = calculation.userMissRate > calculation.industryMissRate;
  const difference = Math.abs(calculation.userAnnualLoss - calculation.industryAnnualLoss);

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-primary">Your Free AI Profit Audit</h3>
        <p className="text-foreground/70">
          Based on {calculation.monthlyCallsInput} monthly calls in {calculation.businessType}
        </p>
      </div>

      {/* Industry Average Scenario */}
      <Card className="p-6 border-2 border-border bg-muted/30">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <TrendingDown className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-1">Industry Average Scenario</h4>
            <p className="text-sm text-foreground/60">
              Based on {calculation.industryMissRate}% missed call rate (industry average for {calculation.businessType})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-foreground/60 mb-1">Monthly Loss</p>
            <p className="text-2xl font-bold text-destructive">
              {formatCurrency(calculation.industryMonthlyLoss)}
            </p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-foreground/60 mb-1">Annual Loss</p>
            <p className="text-2xl font-bold text-destructive">
              {formatCurrency(calculation.industryAnnualLoss)}
            </p>
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <p className="text-sm text-foreground/70 mb-2">Potential Annual Recovery with AI</p>
          <p className="text-3xl font-bold text-primary">
            {formatCurrency(calculation.industryPotentialRecovery)}
          </p>
          <p className="text-xs text-foreground/60 mt-2">
            (60% recovery rate - conservative estimate)
          </p>
        </div>
      </Card>

      {/* User Perceived Scenario */}
      <Card className="p-6 border-2 border-accent bg-accent/5">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-accent/10 rounded-lg">
            <Target className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-1">Your Perceived Scenario</h4>
            <p className="text-sm text-foreground/60">
              Based on your estimated {calculation.userMissRate}% missed call rate
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-foreground/60 mb-1">Monthly Loss</p>
            <p className="text-2xl font-bold text-destructive">
              {formatCurrency(calculation.userMonthlyLoss)}
            </p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-foreground/60 mb-1">Annual Loss</p>
            <p className="text-2xl font-bold text-destructive">
              {formatCurrency(calculation.userAnnualLoss)}
            </p>
          </div>
        </div>

        <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
          <p className="text-sm text-foreground/70 mb-2">Potential Annual Recovery with AI</p>
          <p className="text-3xl font-bold text-accent">
            {formatCurrency(calculation.userPotentialRecovery)}
          </p>
          <p className="text-xs text-foreground/60 mt-2">
            (60% recovery rate - conservative estimate)
          </p>
        </div>

        {/* Comparison Note */}
        {isUserRateHigher && (
          <div className="mt-4 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
            <p className="text-sm text-destructive font-medium">
              ⚠️ Your perceived miss rate is {calculation.userMissRate - calculation.industryMissRate}% higher than industry average.
              That's an additional {formatCurrency(difference)} in annual losses.
            </p>
          </div>
        )}
      </Card>

      {/* Key Insight */}
      <Card className="p-6 border border-primary/30 bg-primary/5">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-primary mb-1">Key Insight</p>
            <p className="text-sm text-foreground/80">
              Even with a conservative 60% recovery rate, you could recover between{" "}
              <span className="font-bold text-primary">
                {formatCurrency(Math.min(calculation.industryPotentialRecovery, calculation.userPotentialRecovery))}
              </span>{" "}
              and{" "}
              <span className="font-bold text-primary">
                {formatCurrency(Math.max(calculation.industryPotentialRecovery, calculation.userPotentialRecovery))}
              </span>{" "}
              annually. That's real money left on the table every single day.
            </p>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div className="space-y-3 pt-4 bg-primary/5 rounded-lg p-4 border border-primary/20">
        <p className="text-sm font-semibold text-primary mb-2">Ready to recover this revenue?</p>
        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg"
          onClick={onBookCall}
        >
          Continue to Contact Form
        </Button>
        <p className="text-xs text-center text-foreground/60">
          Provide your contact info and we will reach out within 24 hours to book your strategy call.
        </p>
      </div>
    </div>
  );
}
