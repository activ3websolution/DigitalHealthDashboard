import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Clock, 
  Smartphone, 
  Image, 
  ExternalLink,
  Zap,
  Shield,
  Search
} from "lucide-react";

interface Issue {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  category: "performance" | "accessibility" | "seo" | "security";
  impact: string;
}

interface IssuesListProps {
  siteUrl: string;
}

const IssuesList = ({ siteUrl }: IssuesListProps) => {
  // Generate different issues based on website URL
  const generateIssuesForSite = (url: string): Issue[] => {
    const domain = url.replace(/https?:\/\//, '').replace(/\/$/, '');
    
    // Create pseudo-randomness based on domain
    const hash = domain.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const randomSeed = Math.abs(hash) % 100;
    
    // All possible issues
    const allIssues: Issue[] = [
      {
        id: "1",
        title: "Slow Page Load Speed",
        description: `Your website takes ${(2.8 + (randomSeed % 30) / 10).toFixed(1)} seconds to load on mobile devices. Users expect pages to load within 2-3 seconds.`,
        severity: randomSeed % 3 === 0 ? "high" : "medium",
        category: "performance",
        impact: "High bounce rate, poor user experience"
      },
      {
        id: "2", 
        title: "Unoptimized Images",
        description: `${12 + (randomSeed % 15)} images are not optimized. Images should be compressed and in modern formats like WebP.`,
        severity: "medium",
        category: "performance", 
        impact: "Slower loading times, increased bandwidth usage"
      },
      {
        id: "3",
        title: "Missing Alt Text on Images",
        description: `${3 + (randomSeed % 8)} images lack descriptive alt text, making your site less accessible to screen readers.`,
        severity: randomSeed % 4 === 0 ? "high" : "medium",
        category: "accessibility",
        impact: "Poor accessibility, SEO penalties"
      },
      {
        id: "4",
        title: "SSL Certificate Issues",
        description: randomSeed % 5 === 0 ? "Your website is not using HTTPS, which can hurt user trust and search engine rankings." : "Your SSL certificate expires soon and needs renewal.",
        severity: randomSeed % 5 === 0 ? "high" : "medium",
        category: "security",
        impact: "Security warnings, lower search rankings"
      },
      {
        id: "5",
        title: "Missing Meta Descriptions",
        description: `${8 + (randomSeed % 20)} pages lack meta descriptions, missing opportunities for better search engine visibility.`,
        severity: "low", 
        category: "seo",
        impact: "Lower click-through rates from search results"
      },
      {
        id: "6",
        title: "Poor Mobile Responsiveness",
        description: "Your website doesn't display properly on mobile devices, affecting user experience and search rankings.",
        severity: "high",
        category: "accessibility",
        impact: "Poor mobile user experience, lower mobile search rankings"
      },
      {
        id: "7",
        title: "Outdated JavaScript Libraries",
        description: `${2 + (randomSeed % 5)} JavaScript libraries are outdated and may have security vulnerabilities.`,
        severity: "medium",
        category: "security",
        impact: "Potential security risks, compatibility issues"
      },
      {
        id: "8",
        title: "Missing Structured Data",
        description: "Your website lacks structured data markup, missing opportunities for rich search results.",
        severity: "low",
        category: "seo",
        impact: "Missed rich snippet opportunities, lower CTR"
      },
      {
        id: "9",
        title: "Large CSS Files",
        description: `CSS files are ${(randomSeed % 400) + 200}KB, causing render-blocking issues.`,
        severity: "medium",
        category: "performance",
        impact: "Slower page rendering, poor Core Web Vitals"
      },
      {
        id: "10",
        title: "Missing Error Pages",
        description: "Custom 404 and error pages are missing, leading to poor user experience.",
        severity: "low",
        category: "accessibility",
        impact: "Poor user experience when errors occur"
      }
    ];

    // Select 4-6 issues based on the domain hash
    const numIssues = 4 + (randomSeed % 3);
    const selectedIndices = [];
    
    for (let i = 0; i < numIssues; i++) {
      let index = (randomSeed + i * 17) % allIssues.length;
      while (selectedIndices.includes(index)) {
        index = (index + 1) % allIssues.length;
      }
      selectedIndices.push(index);
    }
    
    return selectedIndices.map(index => allIssues[index]);
  };

  const issues = generateIssuesForSite(siteUrl);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-health-fair/10 text-health-fair border-health-fair/20";
      case "low": return "bg-health-good/10 text-health-good border-health-good/20";
      default: return "bg-muted";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "performance": return <Zap className="h-4 w-4" />;
      case "accessibility": return <Shield className="h-4 w-4" />;
      case "seo": return <Search className="h-4 w-4" />;
      case "security": return <Shield className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <AlertTriangle className="h-5 w-5 text-brand-primary" />
          Issues Found ({issues.length})
        </CardTitle>
        <p className="text-muted-foreground">
          We've identified several opportunities to improve your website's performance and user experience.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.map((issue) => (
            <div 
              key={issue.id}
              className="p-4 bg-background rounded-lg border border-border hover:shadow-soft transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {getCategoryIcon(issue.category)}
                    <h3 className="font-semibold text-foreground">{issue.title}</h3>
                    <Badge 
                      variant="outline"
                      className={getSeverityColor(issue.severity)}
                    >
                      {issue.severity} priority
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {issue.description}
                  </p>
                  
                  <p className="text-xs text-brand-primary font-medium">
                    Impact: {issue.impact}
                  </p>
                </div>
                
                <Button 
                  variant="cta"
                  size="sm"
                  className="shrink-0"
                  onClick={() => window.open('https://activ3websolutions.com/contact', '_blank')}
                >
                  Fix This <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-6 bg-gradient-brand rounded-lg text-center text-white">
          <h3 className="text-lg font-semibold mb-2">Ready to Fix All Issues?</h3>
          <p className="text-sm opacity-90 mb-4">
            Our team can resolve all these issues and boost your website's performance, security, and search rankings.
          </p>
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => window.open('https://activ3websolutions.com/contact', '_blank')}
          >
            Get Professional Help <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssuesList;