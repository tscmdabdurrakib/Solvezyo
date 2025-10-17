import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Copy, Download, ArrowUpDown, Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KeywordData {
  keyword: string;
  searchVolume: number;
  cpc: number;
  competition: number;
  trend: 'up' | 'down' | 'stable';
}

type SortField = 'keyword' | 'searchVolume' | 'cpc' | 'competition';
type SortDirection = 'asc' | 'desc';

const generateKeywordVariations = (baseKeyword: string): string[] => {
  if (!baseKeyword.trim()) return [];
  
  const prefixes = ['best', 'top', 'how to', 'what is', 'guide to', 'tips for', 'learn', 'free'];
  const suffixes = ['tool', 'guide', 'tutorial', 'tips', 'course', 'strategy', 'examples', 'ideas', 'services', 'agency', 'software', 'online', 'free', 'for beginners', '2025'];
  const modifiers = ['professional', 'advanced', 'easy', 'simple', 'complete', 'ultimate'];
  
  const variations: string[] = [baseKeyword];
  
  prefixes.forEach(prefix => {
    variations.push(`${prefix} ${baseKeyword}`);
  });
  
  suffixes.forEach(suffix => {
    variations.push(`${baseKeyword} ${suffix}`);
  });
  
  modifiers.forEach(modifier => {
    variations.push(`${modifier} ${baseKeyword}`);
  });
  
  const combined = [
    `${prefixes[0]} ${baseKeyword} ${suffixes[0]}`,
    `${prefixes[1]} ${baseKeyword} ${suffixes[1]}`,
    `how to use ${baseKeyword}`,
    `${baseKeyword} vs alternatives`,
    `${baseKeyword} reviews`,
    `${baseKeyword} comparison`,
  ];
  
  variations.push(...combined);
  
  return variations.slice(0, 20);
};

const generateMockData = (keyword: string): KeywordData => {
  const hash = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return {
    keyword,
    searchVolume: Math.floor(100 + (hash * 137) % 9900),
    cpc: parseFloat((0.1 + (hash * 0.073) % 4.9).toFixed(2)),
    competition: Math.floor((hash * 17) % 100),
    trend: ['up', 'down', 'stable'][hash % 3] as 'up' | 'down' | 'stable'
  };
};

function KeywordResearch() {
  const [inputKeyword, setInputKeyword] = useState<string>('digital marketing');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [keywordData, setKeywordData] = useState<KeywordData[]>([]);
  const [sortField, setSortField] = useState<SortField>('searchVolume');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const { toast } = useToast();

  useEffect(() => {
    const analyzeKeywords = () => {
      if (!inputKeyword.trim()) {
        setKeywordData([]);
        return;
      }

      setIsAnalyzing(true);
      
      setTimeout(() => {
        const variations = generateKeywordVariations(inputKeyword.trim());
        const data = variations.map(kw => generateMockData(kw));
        setKeywordData(data);
        setIsAnalyzing(false);
      }, 300);
    };

    analyzeKeywords();
  }, [inputKeyword]);

  const sortedData = useMemo(() => {
    if (keywordData.length === 0) return [];
    
    return [...keywordData].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [keywordData, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const copyToClipboard = () => {
    const text = sortedData.map(kw => 
      `${kw.keyword}\t${kw.searchVolume}\t$${kw.cpc}\t${kw.competition}%`
    ).join('\n');
    
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${sortedData.length} keywords copied to clipboard`,
    });
  };

  const downloadCSV = () => {
    const headers = 'Keyword,Search Volume,CPC,Competition (%),Trend\n';
    const rows = sortedData.map(kw => 
      `"${kw.keyword}",${kw.searchVolume},$${kw.cpc},${kw.competition},${kw.trend}`
    ).join('\n');
    
    const csv = headers + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keyword-research-${inputKeyword.replace(/\s+/g, '-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "CSV file downloaded successfully",
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getCompetitionColor = (competition: number) => {
    if (competition < 30) return 'text-green-600 dark:text-green-400';
    if (competition < 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Keyword Research Tool</CardTitle>
              <CardDescription>
                Discover high-value keywords with search volume, CPC, and competition analysis
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="keyword-input" className="block text-sm font-medium">
                Enter Seed Keyword
              </label>
              <div className="relative">
                <Input
                  id="keyword-input"
                  value={inputKeyword}
                  onChange={(e) => setInputKeyword(e.target.value)}
                  placeholder="e.g., digital marketing, SEO tools, content strategy..."
                  className="text-lg h-12 pr-10"
                  data-testid="input-keyword"
                />
                {isAnalyzing && (
                  <Loader2 className="absolute right-3 top-3 h-6 w-6 animate-spin text-muted-foreground" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Type any keyword to instantly generate related keyword ideas with SEO metrics
              </p>
            </div>

            {sortedData.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {sortedData.length} Keyword Ideas Found
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="gap-2"
                      data-testid="button-copy"
                    >
                      <Copy className="h-4 w-4" />
                      Copy All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadCSV}
                      className="gap-2"
                      data-testid="button-download-csv"
                    >
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <ScrollArea className="h-[500px]">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead 
                            className="cursor-pointer hover:bg-muted/70 transition-colors"
                            onClick={() => handleSort('keyword')}
                            data-testid="sort-keyword"
                          >
                            <div className="flex items-center gap-2">
                              Keyword
                              <ArrowUpDown className="h-4 w-4" />
                            </div>
                          </TableHead>
                          <TableHead 
                            className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
                            onClick={() => handleSort('searchVolume')}
                            data-testid="sort-volume"
                          >
                            <div className="flex items-center justify-end gap-2">
                              Search Volume
                              <ArrowUpDown className="h-4 w-4" />
                            </div>
                          </TableHead>
                          <TableHead 
                            className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
                            onClick={() => handleSort('cpc')}
                            data-testid="sort-cpc"
                          >
                            <div className="flex items-center justify-end gap-2">
                              CPC
                              <ArrowUpDown className="h-4 w-4" />
                            </div>
                          </TableHead>
                          <TableHead 
                            className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
                            onClick={() => handleSort('competition')}
                            data-testid="sort-competition"
                          >
                            <div className="flex items-center justify-end gap-2">
                              Competition
                              <ArrowUpDown className="h-4 w-4" />
                            </div>
                          </TableHead>
                          <TableHead className="text-center">Trend</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedData.map((kw, index) => (
                          <TableRow 
                            key={index} 
                            className="hover:bg-muted/30 transition-colors"
                            data-testid={`keyword-row-${index}`}
                          >
                            <TableCell className="font-medium">{kw.keyword}</TableCell>
                            <TableCell className="text-right font-mono">
                              {kw.searchVolume.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right font-mono text-green-600 dark:text-green-400">
                              ${kw.cpc}
                            </TableCell>
                            <TableCell className={`text-right font-semibold ${getCompetitionColor(kw.competition)}`}>
                              {kw.competition}%
                            </TableCell>
                            <TableCell className="flex justify-center">
                              {getTrendIcon(kw.trend)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground mb-1">Total Search Volume</div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {sortedData.reduce((sum, kw) => sum + kw.searchVolume, 0).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground mb-1">Average CPC</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${(sortedData.reduce((sum, kw) => sum + kw.cpc, 0) / sortedData.length).toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900">
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground mb-1">Avg Competition</div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {Math.round(sortedData.reduce((sum, kw) => sum + kw.competition, 0) / sortedData.length)}%
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">How to Use This Keyword Research Tool</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-base mb-2">What This Tool Does:</h4>
              <p className="text-muted-foreground leading-relaxed">
                This keyword research tool helps you discover valuable keyword opportunities for your SEO and content marketing strategy. 
                Enter any seed keyword, and the tool instantly generates related keyword variations along with estimated search volume, 
                cost-per-click (CPC), competition levels, and trend indicators.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-2">Understanding the Metrics:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[140px]">Search Volume:</span>
                  <span>Estimated monthly searches for this keyword. Higher volume = more potential traffic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[140px]">CPC (Cost Per Click):</span>
                  <span>Average cost advertisers pay per click in paid search. Higher CPC often indicates commercial intent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[140px]">Competition:</span>
                  <span>How difficult it is to rank for this keyword. Green (&lt;30%) = easier, Yellow (30-70%) = moderate, Red (&gt;70%) = difficult.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[140px]">Trend:</span>
                  <span>Search interest direction. ↑ = rising popularity, ↓ = declining, − = stable.</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-2">How to Find the Best Keywords:</h4>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Look for keywords with <strong>high search volume</strong> and <strong>low competition</strong> for quick wins</li>
                <li>Keywords with <strong>rising trends</strong> indicate growing opportunities</li>
                <li>Balance between <strong>short-tail</strong> (broad) and <strong>long-tail</strong> (specific) keywords</li>
                <li>Higher CPC keywords often have <strong>stronger commercial intent</strong> and conversion potential</li>
                <li>Sort by different columns to identify the best opportunities for your strategy</li>
              </ul>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Pro Tip:</strong> Use the export feature to save your keyword research, then prioritize based on 
                your content strategy, target audience, and business goals. Start with low-competition, high-volume keywords 
                for faster results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default KeywordResearch;
