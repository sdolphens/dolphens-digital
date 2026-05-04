import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle2 } from "lucide-react";

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

  const businessTypes = [
    "Plumbing",
    "HVAC",
    "Electrical",
    "Roofing",
    "Landscaping",
    "Dental",
    "Medical",
    "Law Firm",
    "Real Estate",
    "Solar",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.businessName || !formData.businessType || !formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - in production, this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the form data (in production, send to backend/CRM)
      console.log("Lead captured:", formData);
      
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
      <DialogContent className="sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Get Your Free AI Profit Audit</DialogTitle>
              <DialogDescription>
                Tell us about your business and we'll show you exactly how much revenue you're leaving on the table.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Monthly Call Volume */}
              <div className="space-y-2">
                <Label htmlFor="monthlyCallVolume" className="text-sm font-medium">
                  Estimated Monthly Calls
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Get My Free Audit"
                )}
              </Button>

              <p className="text-xs text-foreground/60 text-center">
                We'll send your personalized audit to your email within 24 hours.
              </p>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-primary" />
            <h3 className="text-xl font-bold text-center">Thank You!</h3>
            <p className="text-center text-foreground/70">
              Your free AI Profit Audit is on the way. Check your email shortly.
            </p>
            <p className="text-sm text-foreground/60 text-center">
              We'll be in touch within 24 hours with your personalized analysis.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
