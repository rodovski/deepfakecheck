import ResultsDisplay from '../ResultsDisplay'

export default function ResultsDisplayExample() {
  const mockResult = {
    confidence: 87,
    verdict: 'authentic' as const,
    details: [
      { label: 'Face Detection', value: 'Natural' },
      { label: 'Manipulation Score', value: 'Low (0.13)' },
      { label: 'AI Generation', value: 'Not Detected' },
      { label: 'Image Quality', value: 'High' },
    ],
    timestamp: new Date().toISOString(),
    filename: 'sample-photo.jpg',
  };

  return (
    <div className="py-8">
      <ResultsDisplay 
        result={mockResult} 
        onAnalyzeAnother={() => console.log('Analyze another clicked')} 
      />
    </div>
  )
}
