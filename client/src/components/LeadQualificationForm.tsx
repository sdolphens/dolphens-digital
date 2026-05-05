import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { calculateProfitLoss, INDUSTRY_BENCHMARKS, ProfitCalculation } from "@/lib/profitCalculator";

// Map display names to benchmark keys
const INDUSTRY_NAME_TO_KEY: Record<string, string> = {
  "Plumbing": "plumbing",
  "HVAC": "hvac",
  "Electrical": "electrical",
  "Dental": "dental",
  "Real Estate": "realEstate",
  "Law Firm": "lawFirm",
  "Roofing": "roofing",
  "Home Services": "homeServices"
};
import ProfitAuditResults from "./ProfitAuditResults";

// Initialize EmailJS
emailjs.init("vzUBNcpgVzMCogBrI");

interface LeadQualificationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LeadQualificationForm({ open, onOpenChange }: LeadQualificationFormProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    monthlyCallVolume: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculation, setCalculation] = useState<ProfitCalculation | null>(null);
  const [userMissRate, setUserMissRate] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBusinessTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      businessType: value
    }));
  };

  const handleShowCalculator = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.businessName || !formData.businessType || !formData.monthlyCallVolume) {
      alert("Please fill in all business information fields");
      return;
    }

    const estimatedCalls = parseInt(formData.monthlyCallVolume);
    if (isNaN(estimatedCalls) || estimatedCalls <= 0) {
      alert("Please enter a valid number for monthly calls");
      return;
    }

    const missRate = userMissRate ? parseInt(userMissRate) : 50; // Default to 50% if not provided

    // Calculate profit loss
    const businessTypeKey = INDUSTRY_NAME_TO_KEY[formData.businessType] || formData.businessType.toLowerCase().replace(/\s+/g, "");
    const result = calculateProfitLoss(businessTypeKey, estimatedCalls, missRate);

    if (result) {
      setCalculation(result);
      setShowCalculator(true);
    } else {
      alert("Unable to calculate. Please check your inputs.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.businessName || !formData.businessType || !formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare email parameters for EmailJS
      const templateParams = {
        to_email: "hello@dolphensdigital.com",
        business_name: formData.businessName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        business_type: formData.businessType,
        monthly_calls: formData.monthlyCallVolume,
        industry_miss_rate: calculation?.industryMissRate || 0,
        user_miss_rate: calculation?.userMissRate || 0,
        industry_monthly_loss: calculation?.industryMonthlyLoss.toFixed(0) || 0,
        industry_annual_loss: calculation?.industryAnnualLoss.toFixed(0) || 0,
        user_monthly_loss: calculation?.userMonthlyLoss.toFixed(0) || 0,
        user_annual_loss: calculation?.userAnnualLoss.toFixed(0) || 0,
        potential_recovery: calculation?.industryPotentialRecovery.toFixed(0) || 0,
        name: `${formData.firstName} ${formData.lastName}`
      };

      // Send email using EmailJS
      await emailjs.send("service_grl2sp8", "template_8m9ghvh", templateParams);
      
      console.log("Lead captured and email sent:", formData);
      console.log("Calculation:", calculation);
      
      setIsSuccess(true);
      
      // Reset after 5 seconds (gives users time to see success message)
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          businessName: "",
          businessType: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          monthlyCallVolume: ""
        });
        setShowCalculator(false);
        setCalculation(null);
        setUserMissRate("");
        onOpenChange(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to submit. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {!showCalculator && !isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Get Your Free AI Profit Audit</DialogTitle>
              <DialogDescription>
                Tell us about your business and we'll show you exactly how much revenue you're leaving on the table.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleShowCalculator} className="space-y-4">
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm font-medium">
                  Business Name *
                </Label>
                <Input
                  id="businessName"
                  name="businessName"
                  placeholder="e.g., ABC Plumbing"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="border-border"
                />
              </div>

              {/* Business Type */}
              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-sm font-medium">
                  Business Type *
                </Label>
                <Select value={formData.businessType} onValueChange={handleBusinessTypeChange} disabled={isSubmitting}>
                  <SelectTrigger className="border-border">
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(INDUSTRY_BENCHMARKS).map((key) => (
                      <SelectItem key={key} value={INDUSTRY_BENCHMARKS[key as keyof typeof INDUSTRY_BENCHMARKS].name}>
                        {INDUSTRY_BENCHMARKS[key as keyof typeof INDUSTRY_BENCHMARKS].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Monthly Call Volume */}
              <div className="space-y-2">
                <Label htmlFor="monthlyCallVolume" className="text-sm font-medium">
                  Estimated Monthly Calls *
                </Label>
                <Input
                  id="monthlyCallVolume"
                  name="monthlyCallVolume"
                  type="number"
                  placeholder="e.g., 150"
                  value={formData.monthlyCallVolume}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="border-border"
                />
              </div>

              {/* User's Perceived Miss Rate */}
              <div className="space-y-2">
                <Label htmlFor="userMissRate" className="text-sm font-medium">
                  Your Perceived Miss Rate (Optional)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="userMissRate"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g., 45"
                    value={userMissRate}
                    onChange={(e) => setUserMissRate(e.target.value)}
                    disabled={isSubmitting}
                    className="border-border flex-1"
                  />
                  <span className="text-sm text-foreground/60 pb-2">%</span>
                </div>
                <p className="text-xs text-foreground/60">
                  Leave blank to use industry average
                </p>
              </div>

              {/* Next Step Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
              >
                See Your Profit Audit <ArrowRight className="w-4 h-4" />
              </Button>

              <p className="text-xs text-foreground/60 text-center">
                Next: See your personalized profit loss calculation
              </p>
            </form>
          </>
        ) : showCalculator && calculation ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Your Profit Audit Results</DialogTitle>
              <DialogDescription>
                See how much revenue you're leaving on the table
              </DialogDescription>
            </DialogHeader>
            <ProfitAuditResults
              calculation={calculation}
              onBookCall={() => {}}
            />
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Ready to recover this revenue?</h3>
              <p className="text-sm text-foreground/70">Provide your contact information and we will reach out within 24 hours to book your strategy call.</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="border-border"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="border-border"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="border-border"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="border-border"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Confirm & Book My Strategy Call"
                  )}
                </Button>
              </form>
            </div>
          </>
        ) : isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Success!</h3>
            <p className="text-center text-foreground/70">
              We've received your information and sent you a confirmation email. We'll reach out within 24 hours to book your 15-minute strategy call.
            </p>
            <p className="text-sm text-foreground/60 text-center">
              Check your email at <span className="font-semibold">{formData.email}</span>
            </p>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
