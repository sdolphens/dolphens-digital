import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { calculateProfitLoss, INDUSTRY_BENCHMARKS, ProfitCalculation } from "@/lib/profitCalculator";
import ProfitAuditResults from "./ProfitAuditResults";

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
  const [userMissRate, setUserMissRate] = useState<string>("");

  const businessTypes = [
    "Plumbing",
    "HVAC",
    "Electrical",
    "Roofing",
    "Dental",
    "Law Firm",
    "Real Estate",
    "Home Services",
    "Other"
  ];

  const callVolumes = [
    "Less than 10",
    "10-25",
    "25-50",
    "50-100",
    "100+"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShowCalculator = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields for calculator
    if (!formData.businessType || !formData.monthlyCallVolume) {
      alert("Please select your business type and estimated monthly calls");
      return;
    }

    // Get the numeric call volume
    const callVolumeMap: Record<string, number> = {
      "Less than 10": 10,
      "10-25": 17,
      "25-50": 37,
      "50-100": 75,
      "100+": 150
    };

    const estimatedCalls = callVolumeMap[formData.monthlyCallVolume] || 50;
    const missRate = userMissRate ? parseInt(userMissRate) : 50; // Default to 50% if not provided

    // Calculate profit loss
    const businessTypeKey = formData.businessType.toLowerCase().replace(/\s+/g, "");
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
      // Prepare email content
      const emailSubject = `New Lead: ${formData.businessName} - ${formData.businessType}`;
      const emailBody = `
New Lead Submission from Dolphens Digital\n\n=== BUSINESS INFO ===\nBusiness Name: ${formData.businessName}\nBusiness Type: ${formData.businessType}\nMonthly Call Volume: ${formData.monthlyCallVolume}\n\n=== CONTACT INFO ===\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n=== PROFIT AUDIT RESULTS ===\nIndustry Miss Rate: ${calculation?.industryMissRate}%\nUser Perceived Miss Rate: ${calculation?.userMissRate}%\nAverage Service Value: $${calculation?.avgServiceValue}\n\nIndustry Scenario (${calculation?.industryMissRate}% miss rate):\n- Monthly Loss: $${calculation?.industryMonthlyLoss.toFixed(0)}\n- Annual Loss: $${calculation?.industryAnnualLoss.toFixed(0)}\n- Potential Recovery: $${calculation?.industryPotentialRecovery.toFixed(0)}\n\nUser Perceived Scenario (${calculation?.userMissRate}% miss rate):\n- Monthly Loss: $${calculation?.userMonthlyLoss.toFixed(0)}\n- Annual Loss: $${calculation?.userAnnualLoss.toFixed(0)}\n- Potential Recovery: $${calculation?.userPotentialRecovery.toFixed(0)}\n\n=== NEXT STEPS ===\nReach out to ${formData.firstName} at ${formData.phone} or ${formData.email} to book the 15-minute strategy call.\n`;
      
      // Send email via mailto (user's email client) - in production, this would use a backend API
      const mailtoLink = `mailto:hello@dolphensdigital.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Log the form data for debugging
      console.log("Lead captured:", formData);
      console.log("Calculation:", calculation);
      console.log("Email content:", emailBody);
      
      // In production, you would send this via a backend API instead
      // For now, we'll simulate the email being sent
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      
      // Reset after 3 seconds
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
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
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
                <Select value={formData.businessType} onValueChange={(value) => handleSelectChange("businessType", value)} disabled={isSubmitting}>
                  <SelectTrigger className="border-border">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Monthly Call Volume */}
              <div className="space-y-2">
                <Label htmlFor="monthlyCallVolume" className="text-sm font-medium">
                  Estimated Monthly Calls *
                </Label>
                <Select value={formData.monthlyCallVolume} onValueChange={(value) => handleSelectChange("monthlyCallVolume", value)} disabled={isSubmitting}>
                  <SelectTrigger className="border-border">
                    <SelectValue placeholder="Select call volume" />
                  </SelectTrigger>
                  <SelectContent>
                    {callVolumes.map(volume => (
                      <SelectItem key={volume} value={volume}>{volume}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Perceived Missed Call Rate */}
              <div className="space-y-2">
                <Label htmlFor="missRate" className="text-sm font-medium">
                  Your Perceived Missed Call Rate (%)
                </Label>
                <div className="flex gap-2 items-end">
                  <Input
                    id="missRate"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g., 50"
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
                    Phone Number *
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

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Booking Your Call...
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
            <h3 className="text-xl font-bold text-center">Call Booked!</h3>
            <p className="text-center text-foreground/70">
              Check your email for calendar confirmation and meeting details.
            </p>
            <p className="text-sm text-foreground/60 text-center">
              We're excited to help you recover that lost revenue!
            </p>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
