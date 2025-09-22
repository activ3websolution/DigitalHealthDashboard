import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface AnalysisStep {
  id: string;
  name: string;
  status: "pending" | "running" | "completed" | "error";
  description: string;
}

interface ProgressIndicatorProps {
  steps: AnalysisStep[];
  currentStep?: string;
}

const ProgressIndicator = ({ steps, currentStep }: ProgressIndicatorProps) => {
  const completedSteps = steps.filter(step => step.status === "completed").length;
  const totalSteps = steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  const getStepIcon = (status: AnalysisStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-health-excellent" />;
      case "running":
        return <div className="animate-spin rounded-full h-5 w-5 border-2 border-brand-primary border-t-transparent" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-health-poor" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: AnalysisStep["status"]) => {
    switch (status) {
      case "completed": return "text-health-excellent";
      case "running": return "text-brand-primary";
      case "error": return "text-health-poor";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-soft">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-foreground">
                Analyzing Your Website
              </h3>
              <span className="text-sm text-muted-foreground">
                {completedSteps}/{totalSteps} completed
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-3">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 ${
                  step.status === "running" ? "bg-brand-primary/5 border border-brand-primary/20" :
                  step.status === "completed" ? "bg-health-excellent/5" :
                  "bg-muted/30"
                }`}
              >
                <div className="mt-0.5">
                  {getStepIcon(step.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-medium ${getStatusText(step.status)}`}>
                    {step.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentStep && (
            <div className="text-center p-4 bg-brand-primary/5 rounded-lg">
              <p className="text-sm text-brand-primary font-medium">
                Currently analyzing: {steps.find(s => s.id === currentStep)?.name}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressIndicator;