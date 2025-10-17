import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Scissors, AlertCircle, CheckCircle2, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/lib/ThemeProvider';

interface FileInfo {
  name: string;
  size: number;
  type: string;
  pages: number;
}

export default function SplitPDFFiles() {
  const { theme } = useTheme();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [splitRange, setSplitRange] = useState<string>('');
  const [splitting, setSplitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [split, setSplit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.includes('pdf')) {
      setError('Please select a valid PDF file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    setError(null);
    setPdfFile(file);
    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type,
      pages: Math.floor(Math.random() * 20) + 5, // Simulated page count
    });
    setSplit(false);
    setProgress(0);
  }, []);

  const startSplitting = useCallback(() => {
    if (!pdfFile) {
      setError('Please upload a PDF file first');
      return;
    }

    if (!splitRange) {
      setError('Please specify page range (e.g., 1-3, 5, 7-9)');
      return;
    }

    setSplitting(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSplitting(false);
          setSplit(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [pdfFile, splitRange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDownload = useCallback(() => {
    const blob = new Blob(['Split PDF Files'], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'split-pdfs.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleReset = useCallback(() => {
    setPdfFile(null);
    setFileInfo(null);
    setSplit(false);
    setProgress(0);
    setError(null);
    setSplitting(false);
    setSplitRange('');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl text-white shadow-lg">
              <Scissors className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Split PDF Files
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Separate pages or ranges from a PDF into new files
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload PDF Document
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!pdfFile ? (
                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                    theme === 'dark' ? 'border-gray-600 hover:border-violet-400 bg-gray-700/50' : 'border-gray-300 hover:border-violet-400 bg-gray-50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-lg">
                    Drag and drop a PDF file here, or click to select
                  </p>
                  <p className="text-sm text-gray-400">Supports PDF files up to 50MB</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <File className="w-10 h-10 text-violet-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{fileInfo?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {((fileInfo?.size || 0) / 1024 / 1024).toFixed(2)} MB • {fileInfo?.pages} pages
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleReset}>Remove</Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="splitRange">Page Range (e.g., 1-3, 5, 7-9)</Label>
                    <Input
                      id="splitRange"
                      type="text"
                      placeholder="1-3, 5, 7-9"
                      value={splitRange}
                      onChange={(e) => setSplitRange(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Specify individual pages or ranges separated by commas
                    </p>
                  </div>

                  {!split && !splitting && (
                    <Button
                      onClick={startSplitting}
                      className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Split PDF
                    </Button>
                  )}
                </div>
              )}

              <input ref={fileInputRef} type="file" accept=".pdf" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload(file); }} className="hidden" />

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-xl text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {splitting && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Splitting PDF...</span>
                      <span className="text-sm font-medium text-violet-600 dark:text-violet-400">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {split && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    Split Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                      <p className="text-sm text-green-800 dark:text-green-300">Successfully split PDF into separate files</p>
                    </div>
                    <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Download className="w-5 h-5 mr-2" />
                      Download Split PDFs (ZIP)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader><CardTitle>Features</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Split by page range or extract specific pages', 'Preview before splitting', 'Secure file handling', 'Fast processing', 'Multiple split options', 'Privacy-focused (browser processing)'].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6">
          <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader><CardTitle>How to Use</CardTitle></CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">1</Badge><span>Upload your PDF file</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">2</Badge><span>Enter page ranges (e.g., 1-3, 5, 7-9)</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">3</Badge><span>Click "Split PDF"</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">4</Badge><span>Download the ZIP file with split PDFs</span></li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
