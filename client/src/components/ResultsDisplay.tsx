import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Progress } from "@/components/ui/progress";

export interface AnalysisResult {
  confidence: number;
  verdict: 'authentic' | 'deepfake' | 'uncertain';
  details: {
    label: string;
    value: string;
  }[];
  timestamp: string;
  filename: string;
}

interface ResultsDisplayProps {
  result: AnalysisResult;
  onAnalyzeAnother: () => void;
}

export default function ResultsDisplay({ result, onAnalyzeAnother }: ResultsDisplayProps) {
  const getVerdictConfig = () => {
    switch (result.verdict) {
      case 'authentic':
        return {
          icon: CheckCircleIcon,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          label: 'Likely Authentic',
        };
      case 'deepfake':
        return {
          icon: XCircleIcon,
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/20',
          label: 'Potential Deepfake',
        };
      default:
        return {
          icon: ExclamationTriangleIcon,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/20',
          label: 'Uncertain',
        };
    }
  };

  const config = getVerdictConfig();
  const Icon = config.icon;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8">
          <div className="text-center">
            <Icon className={`w-20 h-20 mx-auto mb-6 ${config.color}`} />
            
            <Badge 
              className={`mb-4 text-base px-4 py-2 ${config.bgColor} ${config.borderColor} ${config.color}`}
              data-testid="badge-verdict"
            >
              {config.label}
            </Badge>
            
            <div className="mb-6">
              <div className="text-6xl font-bold font-display mb-2" data-testid="text-confidence">
                {result.confidence}%
              </div>
              <p className="text-muted-foreground">Confidence Score</p>
            </div>
            
            <Progress 
              value={result.confidence} 
              className="h-3 mb-6"
              data-testid="progress-confidence"
            />
            
            <p className="text-sm text-muted-foreground">
              Analyzed: {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-xl font-semibold mb-6">Detailed Analysis</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">File</span>
              <span className="text-sm font-medium" data-testid="text-filename">
                {result.filename}
              </span>
            </div>
            
            {result.details.map((detail, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{detail.label}</span>
                <span className="text-sm font-medium" data-testid={`text-detail-${index}`}>
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <Button
          size="lg"
          onClick={onAnalyzeAnother}
          data-testid="button-analyze-another"
        >
          Analyze Another Image
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => console.log('Download report')}
          data-testid="button-download-report"
        >
          Download Report
        </Button>
      </div>
    </div>
  );
}
