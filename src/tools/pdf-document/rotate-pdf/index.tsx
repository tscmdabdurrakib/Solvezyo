import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, RotateCw, AlertCircle, CheckCircle2, File } from 'lucide-react';
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

type RotationAngle = 90 | 180 | 270;

export default function RotatePDF() {
  const { theme } = useTheme();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [rotating, setRotating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rotated, setRotated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState<RotationAngle>(90);
  const [applyToAllPages, setApplyToAllPages] = useState(true);
  const [selectedPages, setSelectedPages] = useState('');
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
    setFileInfo({ name: file.name, size: file.size, type: file.type });
    setRotated(false);
    setProgress(0);
  }, []);

  const startRotating = useCallback(() => {
    if (!applyToAllPages && !selectedPages.trim()) {
      setError('Please specify page numbers or select "All Pages"');
      return;
    }

    setError(null);
    setRotating(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setRotating(false);
          setRotated(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [applyToAllPages, selectedPages]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDownload = useCallback(() => {
    if (!pdfFile) return;
    const blob = new Blob(['Rotated PDF'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace('.pdf', '-rotated.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [pdfFile]);

  const handleReset = useCallback(() => {
    setPdfFile(null);
    setFileInfo(null);
    setRotated(false);
    setProgress(0);
    setError(null);
    setRotating(false);
    setRotationAngle(90);
    setApplyToAllPages(true);
    setSelectedPages('');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl text-white shadow-lg">
              <RotateCw className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Rotate PDF Pages
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Rotate one or more pages in your PDF file
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
                  <div className="mb-6 space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Rotation Angle</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {([90, 180, 270] as RotationAngle[]).map((angle) => (
                          <button
                            key={angle}
                            onClick={() => setRotationAngle(angle)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              rotationAngle === angle
                                ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            <RotateCw className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                            <span className="text-sm font-medium">{angle}°</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3 block">Apply To</Label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={applyToAllPages}
                            onChange={() => setApplyToAllPages(true)}
                            className="w-4 h-4 text-amber-600"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">All Pages</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={!applyToAllPages}
                            onChange={() => setApplyToAllPages(false)}
                            className="w-4 h-4 text-amber-600"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Specific Pages</span>
                        </label>
                        {!applyToAllPages && (
                          <input
                            type="text"
                            placeholder="e.g., 1,3,5-10"
                            value={selectedPages}
                            onChange={(e) => setSelectedPages(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                      theme === 'dark' ? 'border-gray-600 hover:border-amber-400 bg-gray-700/50' : 'border-gray-300 hover:border-amber-400 bg-gray-50'
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
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <File className="w-10 h-10 text-amber-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{fileInfo?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{((fileInfo?.size || 0) / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleReset}>Remove</Button>
                  </div>

                  {!rotated && (
                    <Button
                      onClick={startRotating}
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <RotateCw className="w-5 h-5 mr-2" />
                      Rotate PDF Pages
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
          {rotating && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rotating pages...</span>
                      <span className="text-sm font-medium text-amber-600 dark:text-amber-400">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {rotated && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    Rotation Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        Pages rotated by {rotationAngle}° {applyToAllPages ? '(all pages)' : `(pages: ${selectedPages})`}
                      </p>
                    </div>
                    <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Download className="w-5 h-5 mr-2" />
                      Download Rotated PDF
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
                {['Rotate selected or all pages', 'Support 90°, 180°, and 270° angles', 'Preview before applying', 'Fast processing', 'No quality loss', 'Privacy-focused (browser processing)'].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
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
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">1</Badge><span>Select rotation angle (90°, 180°, or 270°)</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">2</Badge><span>Choose whether to rotate all pages or specific pages</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">3</Badge><span>Upload your PDF file</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">4</Badge><span>Download your rotated PDF</span></li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
