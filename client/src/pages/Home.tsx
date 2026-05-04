import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, PhoneOff, MessageSquare, Calendar, BarChart3, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-primary">Dolphens Digital</div>
          <div className="hidden md:flex gap-8">
            <a href="#problem" className="text-foreground hover:text-primary transition">
              Problem
            </a>
            <a href="#solution" className="text-foreground hover:text-primary transition">
              Solution
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition">
              How It Works
            </a>
            <a href="#faq" className="text-foreground hover:text-primary transition">
              FAQ
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-background via-background to-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Stop Losing Customers to <span className="text-primary">Missed Calls.</span> Instantly.
              </h1>
              <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                Dolphens Digital builds AI employees that automatically engage every missed lead, book more appointments, and grow your local business 24/7.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-lg">
                Get Your Free AI Profit Audit
              </Button>
              <p className="text-sm text-foreground/60 mt-4">✓ No credit card required • Takes 5 minutes</p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 flex items-center justify-center min-h-96">
              <div className="text-center">
                <PhoneOff className="w-24 h-24 text-primary mx-auto mb-4 opacity-80" />
                <p className="text-lg font-semibold text-foreground">Every Missed Call is Lost Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Are You Leaving Money on the Table?</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Every missed call is a missed opportunity. For local businesses, a single unanswered phone call can mean a lost appointment and revenue walking straight to your competitor.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: PhoneOff, title: "Missed Calls", desc: "Customers can't reach you during peak hours" },
              { icon: Clock, title: "Slow Follow-ups", desc: "Manual callbacks waste time and lose leads" },
              { icon: BarChart3, title: "Lost Revenue", desc: "Thousands in potential revenue slips away monthly" }
            ].map((item, i) => (
              <Card key={i} className="p-8 border border-border hover:shadow-lg transition">
                <item.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Solution: Your AI Employee, Working Around the Clock</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Dolphens Digital deploys intelligent automation systems that act as your tireless, 24/7 digital employee, capturing and nurturing every inquiry.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { title: "Instant Responses", desc: "AI texts back immediately when customers call" },
                { title: "Smart Qualification", desc: "Answers questions and qualifies leads automatically" },
                { title: "Automatic Booking", desc: "Schedules appointments directly into your calendar" },
                { title: "24/7 Availability", desc: "Never miss a lead, even after hours" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 flex items-center justify-center min-h-96">
              <div className="text-center">
                <MessageSquare className="w-24 h-24 text-primary mx-auto mb-4 opacity-80" />
                <p className="text-lg font-semibold text-foreground">AI-Powered Lead Engagement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works: Simple. Seamless. Effective.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Never Miss a Lead", desc: "When a customer calls and you can't answer, our AI instantly sends a personalized text message." },
              { step: "2", title: "Qualify & Engage", desc: "The AI engages in natural conversation, answering questions and collecting essential information." },
              { step: "3", title: "Book Appointments", desc: "Our system seamlessly books appointments into your calendar, ready for your team." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <Card className="p-8 pt-12 border border-border">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Key Benefits for Your Business</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Boost Revenue", desc: "Convert more missed calls into paying customers, directly impacting your bottom line." },
              { title: "Save Time & Money", desc: "Eliminate manual follow-ups and reduce the need for additional staff." },
              { title: "24/7 Customer Engagement", desc: "Provide instant responses and support, enhancing customer satisfaction." },
              { title: "Effortless Lead Management", desc: "Our AI handles the heavy lifting, ensuring every lead is nurtured." },
              { title: "Measurable ROI", desc: "See a clear return with detailed reports on recovered leads and appointments." },
              { title: "Professional Growth", desc: "Scale your business without scaling your headcount." }
            ].map((item, i) => (
              <Card key={i} className="p-8 border border-border">
                <h3 className="text-lg font-semibold mb-2 text-primary">{item.title}</h3>
                <p className="text-foreground/70">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Our Risk-Free Guarantee</h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            We are so confident in our AI automation that we offer a <span className="font-semibold text-primary">"Pay on Results" Guarantee</span>. If our system doesn't book you at least 3 new appointments within the first 14 days, you pay nothing for the setup.
          </p>
          <p className="text-lg text-foreground/70">Your success is our priority.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "How quickly can this be set up?", a: "Our systems can be integrated and live within 48-72 hours, ensuring you start recovering leads almost immediately." },
              { q: "Is this complicated to manage?", a: "Not at all. We handle all the technical setup and ongoing maintenance. You just enjoy the new appointments." },
              { q: "What types of businesses benefit most?", a: "Any local service business that relies on inbound calls for leads, such as plumbers, HVAC technicians, dentists, lawyers, real estate agents, and more." },
              { q: "How much does it cost?", a: "We offer flexible pricing starting with a one-time setup fee and a monthly retainer. Your first consultation is completely free." }
            ].map((item, i) => (
              <Card key={i} className="p-8 border border-border">
                <h3 className="text-lg font-semibold mb-3 text-primary">{item.q}</h3>
                <p className="text-foreground/70">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Stop letting valuable leads slip away. Let Dolphens Digital empower your business with intelligent AI automation.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6 rounded-lg">
            Schedule Your Free AI Profit Audit Now!
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Dolphens Digital</h3>
              <p className="opacity-80">AI Automation for Local Businesses</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 opacity-80">
                <li><a href="#" className="hover:opacity-100">Features</a></li>
                <li><a href="#" className="hover:opacity-100">Pricing</a></li>
                <li><a href="#" className="hover:opacity-100">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 opacity-80">
                <li><a href="#" className="hover:opacity-100">About</a></li>
                <li><a href="#" className="hover:opacity-100">Blog</a></li>
                <li><a href="#" className="hover:opacity-100">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 opacity-80">
                <li><a href="#" className="hover:opacity-100">Privacy</a></li>
                <li><a href="#" className="hover:opacity-100">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center opacity-80">
            <p>&copy; 2026 Dolphens Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
