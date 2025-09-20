import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp, Smartphone, Monitor } from "lucide-react";

interface HealthScoreProps {
  overallScore: number;
  performanceMobile: number;
  performanceDesktop: number;
  accessibility: number;
  siteUrl: string;
}

const HealthScore = ({ 
  overallScore, 
  performanceMobile, 
  performanceDesktop, 
  accessibility,
  siteUrl 
}: HealthScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-health-excellent";
    if (score >= 75) return "text-health-good"; 
    if (score >= 50) return "text-health-fair";
    return "text-health-poor";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 50) return "Needs Improvement";
    return "Poor";
  };

  return (
    <div className="space-y-6">
      {/* Overall Health Score */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Website Health Score for
              </h2>
              <p className="text-lg text-brand-primary font-medium mb-4">{siteUrl}</p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-health flex items-center justify-center shadow-brand">
                    <span className="text-3xl font-bold text-white">{overallScore}%</span>
                  </div>
                </div>
                <div>
                  <p className={`text-xl font-semibold ${getScoreColor(overallScore)}`}>
                    {getScoreLabel(overallScore)}
                  </p>
                  <p className="text-sm text-muted-foreground">Overall Performance</p>
                </div>
              </div>
            </div>
            
            <Button 
              variant="cta" 
              size="lg"
              className="whitespace-nowrap"
              onClick={() => window.open('https://activ3websolutions.com/contact', '_blank')}
            >
              Let Activ3 Fix This <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-border shadow-soft hover:shadow-brand transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Smartphone className="h-8 w-8 text-brand-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Mobile Performance</h3>
            <div className={`text-3xl font-bold ${getScoreColor(performanceMobile)} mb-1`}>
              {performanceMobile}%
            </div>
            <p className="text-sm text-muted-foreground">
              {getScoreLabel(performanceMobile)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-soft hover:shadow-brand transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Monitor className="h-8 w-8 text-brand-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Desktop Performance</h3>
            <div className={`text-3xl font-bold ${getScoreColor(performanceDesktop)} mb-1`}>
              {performanceDesktop}%
            </div>
            <p className="text-sm text-muted-foreground">
              {getScoreLabel(performanceDesktop)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-soft hover:shadow-brand transition-all duration-300">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-brand-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Accessibility</h3>
            <div className={`text-3xl font-bold ${getScoreColor(accessibility)} mb-1`}>
              {accessibility}%
            </div>
            <p className="text-sm text-muted-foreground">
              {getScoreLabel(accessibility)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthScore;