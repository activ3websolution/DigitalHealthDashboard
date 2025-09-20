import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import HealthScore from "@/components/HealthScore";
import IssuesList from "@/components/IssuesList";
import { Search, Globe, BarChart3, ExternalLink } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock data - in real implementation, this would come from API
  const mockResults = {
    overallScore: 72,
    performanceMobile: 68,
    performanceDesktop: 85,
    accessibility: 79,
    siteUrl: websiteUrl || "example.com"
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {!showResults ? (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                Analyze Your Website's Health
              </h1>
              <p className="text-lg text-muted-foreground">
                Get a comprehensive audit of your website's performance, accessibility, and SEO in seconds.
              </p>
            </div>

            <Card className="bg-gradient-card border-0 shadow-brand">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <Globe className="h-5 w-5 text-brand-primary" />
                  Enter Your Website URL
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website" className="sr-only">Website URL</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="text-center text-lg h-12"
                  />
                </div>
                
                <Button 
                  onClick={handleAnalyze}
                  disabled={!websiteUrl || isAnalyzing}
                  variant="brand"
                  size="lg"
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze Website
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground">
                  Free forever. No credit card required.
                </p>
              </CardContent>
            </Card>

            <div className="bg-muted/30 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-brand-primary" />
                What We Check:
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <span>Page Load Speed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <span>Mobile Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <span>Accessibility Issues</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <span>SEO Optimization</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Website Health Report
              </h1>
              <Button 
                variant="outline" 
                onClick={() => setShowResults(false)}
                className="mb-6"
              >
                ← Analyze Another Website
              </Button>
            </div>
            
            <HealthScore {...mockResults} />
            <IssuesList />
            
            {/* Final CTA Section */}
            <Card className="bg-gradient-brand border-0 shadow-elevated text-white text-center">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">
                  Ready to Transform Your Website?
                </h2>
                <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                  Don't let these issues hurt your business. Our expert team at Activ3 Web Solutions 
                  specializes in fixing exactly these problems to boost your website's performance, 
                  search rankings, and user experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => window.open('https://activ3websolutions.com/contact', '_blank')}
                  >
                    Get Free Consultation <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open('https://activ3websolutions.com', '_blank')}
                  >
                    Learn More About Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;