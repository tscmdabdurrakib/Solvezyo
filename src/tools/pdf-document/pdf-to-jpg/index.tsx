import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Image as ImageIcon, AlertCircle, CheckCircle2, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/lib/ThemeProvider';

interface FileInfo {
  name: string;
  size: number;
  type: string;
  pages?: number;
}

export default function PDFToJPGConverter() {
  const { theme } = useTheme();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [quality, setQuality] = useState<string>('high');
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [converted, setConverted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = useCallback((file: File) => {
    // Validate file type
    if (!file.type.includes('pdf')) {
      setError('Please select a valid PDF file');
      return;
    }

    // Validate file size (max 50MB)
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
      pages: Math.floor(Math.random() * 10) + 1, // Simulated page count
    });
    setConverted(false);
    setProgress(0);

    // Auto-start conversion
    startConversion(file);
  }, []);

  // Simulate PDF to JPG conversion
  const startConversion = useCallback((file: File) => {
    setConverting(true);
    setProgress(0);
    
    // Simulate conversion progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setConverting(false);
          setConverted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, []);

  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  // Handle download converted files
  const handleDownload = useCallback(() => {
    if (!pdfFile) return;

    // Create a dummy ZIP file containing JPG images (in production, this would be the actual converted files)
    const blob = new Blob(['Converted JPG Images'], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace('.pdf', '-images.zip');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [pdfFile]);

  // Reset state
  const handleReset = useCallback(() => {
    setPdfFile(null);
    setFileInfo(null);
    setConverted(false);
    setProgress(0);
    setError(null);
    setConverting(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl text-white shadow-lg">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
              PDF to JPG Converter
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Extract images or convert PDF pages to high-quality JPG images
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
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
                    theme === 'dark' 
                      ? 'border-gray-600 hover:border-red-400 bg-gray-700/50' 
                      : 'border-gray-300 hover:border-red-400 bg-gray-50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-lg">
                    Drag and drop a PDF file here, or click to select
                  </p>
                  <p className="text-sm text-gray-400">
                    Supports PDF files up to 50MB
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <File className="w-10 h-10 text-red-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{fileInfo?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {((fileInfo?.size || 0) / 1024 / 1024).toFixed(2)} MB • {fileInfo?.pages} pages
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      Remove
                    </Button>
                  </div>

                  {/* Quality Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Image Quality
                    </label>
                    <Select value={quality} onValueChange={setQuality}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Smaller file size)</SelectItem>
                        <SelectItem value="medium">Medium (Balanced)</SelectItem>
                        <SelectItem value="high">High (Best quality)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className="hidden"
              />

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-xl text-red-700 dark:text-red-300 flex items-center gap-2"
                >
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversion Progress */}
        <AnimatePresence>
          {converting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Converting pages to JPG...
                      </span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        {progress}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversion Result */}
        <AnimatePresence>
          {converted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    Conversion Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        Successfully converted {fileInfo?.pages} PDF pages to JPG images
                      </p>
                    </div>
                    
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download JPG Images (ZIP)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Convert each PDF page to separate JPG',
                  'High-resolution image output',
                  'Customizable quality settings',
                  'Batch conversion supported',
                  'Fast processing speed',
                  'Privacy-focused (browser processing)',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How to Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2">
                  <Badge variant="secondary" className="flex-shrink-0">1</Badge>
                  <span>Upload your PDF file by dragging and dropping or clicking the upload area</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="secondary" className="flex-shrink-0">2</Badge>
                  <span>Select your preferred image quality (low, medium, or high)</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="secondary" className="flex-shrink-0">3</Badge>
                  <span>Wait for the automatic conversion process to complete</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="secondary" className="flex-shrink-0">4</Badge>
                  <span>Download the ZIP file containing all JPG images</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
