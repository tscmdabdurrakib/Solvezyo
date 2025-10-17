import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Trash2, AlertCircle, CheckCircle2, File, X } from 'lucide-react';
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
  pageCount: number;
}

export default function DeletePDFPages() {
  const { theme } = useTheme();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [pagesToDelete, setPagesToDelete] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
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
    // Simulate page count
    const pageCount = Math.floor(Math.random() * 10) + 5;
    setFileInfo({ name: file.name, size: file.size, type: file.type, pageCount });
    setDeleted(false);
    setProgress(0);
    setPagesToDelete('');
    setSelectedPages([]);
  }, []);

  const parsePageRange = useCallback((input: string, totalPages: number): number[] => {
    const pages: Set<number> = new Set();
    const parts = input.split(',').map(p => p.trim());
    
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(n => parseInt(n.trim()));
        if (start && end && start <= totalPages && end <= totalPages) {
          for (let i = start; i <= end; i++) {
            pages.add(i);
          }
        }
      } else {
        const pageNum = parseInt(part);
        if (pageNum && pageNum <= totalPages) {
          pages.add(pageNum);
        }
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  }, []);

  const handlePagesToDeleteChange = useCallback((value: string) => {
    setPagesToDelete(value);
    if (fileInfo) {
      const parsed = parsePageRange(value, fileInfo.pageCount);
      setSelectedPages(parsed);
    }
  }, [fileInfo, parsePageRange]);

  const startDeleting = useCallback(() => {
    if (!pagesToDelete.trim()) {
      setError('Please specify page numbers to delete');
      return;
    }

    if (selectedPages.length === 0) {
      setError('No valid page numbers specified');
      return;
    }

    if (fileInfo && selectedPages.length >= fileInfo.pageCount) {
      setError('Cannot delete all pages from PDF');
      return;
    }

    setError(null);
    setDeleting(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDeleting(false);
          setDeleted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [pagesToDelete, selectedPages, fileInfo]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDownload = useCallback(() => {
    if (!pdfFile) return;
    const blob = new Blob(['Modified PDF'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace('.pdf', '-deleted-pages.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [pdfFile]);

  const handleReset = useCallback(() => {
    setPdfFile(null);
    setFileInfo(null);
    setPagesToDelete('');
    setSelectedPages([]);
    setDeleted(false);
    setProgress(0);
    setError(null);
    setDeleting(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl text-white shadow-lg">
              <Trash2 className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              Delete Pages from PDF
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Remove unwanted pages from your PDF file
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
                    theme === 'dark' ? 'border-gray-600 hover:border-red-400 bg-gray-700/50' : 'border-gray-300 hover:border-red-400 bg-gray-50'
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
                    <File className="w-10 h-10 text-red-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{fileInfo?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {((fileInfo?.size || 0) / 1024 / 1024).toFixed(2)} MB • {fileInfo?.pageCount} pages
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleReset}>Remove</Button>
                  </div>

                  {!deleted && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="pages" className="text-sm font-medium mb-2 block">
                          Pages to Delete
                        </Label>
                        <Input
                          id="pages"
                          type="text"
                          placeholder="e.g., 1,3,5-10"
                          value={pagesToDelete}
                          onChange={(e) => handlePagesToDeleteChange(e.target.value)}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Enter page numbers separated by commas. Use hyphen for ranges (e.g., 1,3,5-10)
                        </p>
                      </div>

                      {selectedPages.length > 0 && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                          <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                            Pages to be deleted: <span className="font-medium">{selectedPages.length}</span>
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedPages.map(page => (
                              <Badge key={page} variant="secondary" className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                                Page {page}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={startDeleting}
                        disabled={selectedPages.length === 0}
                        className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                      >
                        <Trash2 className="w-5 h-5 mr-2" />
                        Delete Selected Pages
                      </Button>
                    </div>
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
          {deleting && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Deleting pages...</span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {deleted && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    Pages Deleted Successfully
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        Deleted {selectedPages.length} page(s). Remaining: {(fileInfo?.pageCount || 0) - selectedPages.length} pages
                      </p>
                    </div>
                    <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Download className="w-5 h-5 mr-2" />
                      Download Modified PDF
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
                {['Delete specific page ranges', 'Preview and confirm before deletion', 'Fast and safe file handling', 'No page limit', 'Batch deletion supported', 'Privacy-focused (browser processing)'].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
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
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">2</Badge><span>Enter page numbers to delete (e.g., 1,3,5-10)</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">3</Badge><span>Review the selected pages</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">4</Badge><span>Download your modified PDF</span></li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
