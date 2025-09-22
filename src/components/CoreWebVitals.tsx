import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, Target, Info } from "lucide-react";

interface CoreWebVital {
  metric: string;
  value: string;
  score: number;
  description: string;
  threshold: {
    good: string;
    needsImprovement: string;
    poor: string;
  };
}

interface CoreWebVitalsProps {
  vitals?: CoreWebVital[];
}

const CoreWebVitals = ({ vitals }: CoreWebVitalsProps) => {
  // Default Core Web Vitals if none provided
  const defaultVitals: CoreWebVital[] = [
    {
      metric: "Largest Contentful Paint (LCP)",
      value: "2.4s",
      score: 75,
      description: "Measures loading performance. Good LCP is 2.5s or faster.",
      threshold: {
        good: "≤ 2.5s",
        needsImprovement: "≤ 4.0s", 
        poor: "> 4.0s"
      }
    },
    {
      metric: "First Input Delay (FID)",
      value: "85ms",
      score: 90,
      description: "Measures interactivity. Good FID is 100ms or less.",
      threshold: {
        good: "≤ 100ms",
        needsImprovement: "≤ 300ms",
        poor: "> 300ms"
      }
    },
    {
      metric: "Cumulative Layout Shift (CLS)",
      value: "0.08",
      score: 85,
      description: "Measures visual stability. Good CLS is 0.1 or less.",
      threshold: {
        good: "≤ 0.1",
        needsImprovement: "≤ 0.25",
        poor: "> 0.25"
      }
    }
  ];

  const displayVitals = vitals || defaultVitals;

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-health-excellent";
    if (score >= 75) return "text-health-good";
    if (score >= 50) return "text-health-fair";
    return "text-health-poor";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return { label: "Good", color: "bg-health-excellent/10 text-health-excellent border-health-excellent/20" };
    if (score >= 75) return { label: "Needs Improvement", color: "bg-health-fair/10 text-health-fair border-health-fair/20" };
    return { label: "Poor", color: "bg-health-poor/10 text-health-poor border-health-poor/20" };
  };

  const getVitalIcon = (metric: string) => {
    if (metric.includes("LCP")) return <Clock className="h-5 w-5" />;
    if (metric.includes("FID")) return <Zap className="h-5 w-5" />;
    if (metric.includes("CLS")) return <Target className="h-5 w-5" />;
    return <Info className="h-5 w-5" />;
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Target className="h-5 w-5 text-brand-primary" />
          Core Web Vitals
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Essential metrics that measure real-world user experience on your website.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayVitals.map((vital, index) => {
            const status = getScoreStatus(vital.score);
            return (
              <div 
                key={index}
                className="p-4 bg-background rounded-lg border border-border hover:shadow-soft transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getVitalIcon(vital.metric)}
                      <h3 className="font-semibold text-foreground">{vital.metric}</h3>
                      <Badge variant="outline" className={status.color}>
                        {status.label}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {vital.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Current:</span>
                        <span className={`font-bold ${getScoreColor(vital.score)}`}>
                          {vital.value}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <span className="text-muted-foreground">Good:</span>
                        <span className="text-health-excellent font-medium">
                          {vital.threshold.good}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-health">
                    <span className="text-lg font-bold text-white">{vital.score}</span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-health-excellent/10 rounded">
                    <div className="font-medium text-health-excellent">Good</div>
                    <div className="text-muted-foreground">{vital.threshold.good}</div>
                  </div>
                  <div className="text-center p-2 bg-health-fair/10 rounded">
                    <div className="font-medium text-health-fair">Needs Work</div>
                    <div className="text-muted-foreground">{vital.threshold.needsImprovement}</div>
                  </div>
                  <div className="text-center p-2 bg-health-poor/10 rounded">
                    <div className="font-medium text-health-poor">Poor</div>
                    <div className="text-muted-foreground">{vital.threshold.poor}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoreWebVitals;