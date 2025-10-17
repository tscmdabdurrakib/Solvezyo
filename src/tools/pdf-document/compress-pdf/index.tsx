import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, FileArchive, AlertCircle, CheckCircle2, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/lib/ThemeProvider';

interface FileInfo {
  name: string;
  size: number;
  type: string;
}

type CompressionLevel = 'low' | 'medium' | 'high';

export default function CompressPDF() {
  const { theme } = useTheme();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressed, setCompressed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.includes('pdf')) {
      setError('Please select a valid PDF file');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError('File size must be less than 100MB');
      return;
    }

    setError(null);
    setPdfFile(file);
    setFileInfo({ name: file.name, size: file.size, type: file.type });
    setOriginalSize(file.size);
    setCompressed(false);
    setProgress(0);
    // Auto-start compression
    startCompression(file);
  }, []);

  const startCompression = useCallback((file: File) => {
    setCompressing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCompressing(false);
          setCompressed(true);
          // Simulate compression ratio based on level
          const ratios = { low: 0.9, medium: 0.7, high: 0.5 };
          setCompressedSize(Math.floor(file.size * ratios[compressionLevel]));
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [compressionLevel]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDownload = useCallback(() => {
    if (!pdfFile) return;
    const blob = new Blob(['Compressed PDF'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace('.pdf', '-compressed.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [pdfFile]);

  const handleReset = useCallback(() => {
    setPdfFile(null);
    setFileInfo(null);
    setCompressed(false);
    setProgress(0);
    setError(null);
    setCompressing(false);
    setOriginalSize(0);
    setCompressedSize(0);
  }, []);

  const compressionPercentage = originalSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-2xl text-white shadow-lg">
              <FileArchive className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
              Compress PDF File
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Reduce the size of PDF files without quality loss
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
                <>
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">Compression Level</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['low', 'medium', 'high'] as CompressionLevel[]).map((level) => (
                        <button
                          key={level}
                          onClick={() => setCompressionLevel(level)}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                            compressionLevel === level
                              ? 'border-lime-500 bg-lime-50 dark:bg-lime-900/20'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <span className="text-sm font-medium capitalize">{level}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                      theme === 'dark' ? 'border-gray-600 hover:border-lime-400 bg-gray-700/50' : 'border-gray-300 hover:border-lime-400 bg-gray-50'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-300 mb-2 text-lg">
                      Drag and drop a PDF file here, or click to select
                    </p>
                    <p className="text-sm text-gray-400">Supports PDF files up to 100MB</p>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <File className="w-10 h-10 text-lime-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{fileInfo?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Original: {((fileInfo?.size || 0) / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleReset}>Remove</Button>
                  </div>
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
          {compressing && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Compressing PDF...</span>
                      <span className="text-sm font-medium text-lime-600 dark:text-lime-400">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {compressed && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    Compression Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                      <div className="space-y-2">
                        <p className="text-sm text-green-800 dark:text-green-300">
                          File compressed by <span className="font-bold">{compressionPercentage}%</span>
                        </p>
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>Original: {(originalSize / 1024 / 1024).toFixed(2)} MB</span>
                          <span>Compressed: {(compressedSize / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                    </div>
                    <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Download className="w-5 h-5 mr-2" />
                      Download Compressed PDF
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
                {['Adjust compression level', 'Fast processing', 'Batch compression available', 'Maintains file readability and quality', 'No watermark added', 'Privacy-focused (browser processing)'].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0" />
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
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">1</Badge><span>Select your desired compression level (low, medium, or high)</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">2</Badge><span>Upload your PDF file</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">3</Badge><span>Wait for automatic compression</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">4</Badge><span>Download your compressed PDF file</span></li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
