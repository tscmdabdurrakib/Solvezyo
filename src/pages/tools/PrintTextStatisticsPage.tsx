import { Helmet } from 'react-helmet';
import PrintTextStatistics from '@/tools/text-string/print-text-statistics';

export default function PrintTextStatisticsPage() {
  return (
    <>
      <Helmet>
        <title>Print Text Statistics - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Generate comprehensive statistical analysis of your text content including character counts, reading metrics, and complexity analysis." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Print Text Statistics
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate comprehensive statistical analysis of your text content
          </p>
        </div>
        <PrintTextStatistics />
      </div>
    </>
  );
}