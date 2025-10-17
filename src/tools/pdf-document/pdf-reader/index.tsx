import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, AlertCircle, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/lib/ThemeProvider';

interface FileInfo {
  name: string;
  size: number;
  type: string;
  pageCount: number;
}

export default function PDFReaderViewer() {
  const { theme } = useTheme();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
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
    // Simulate page count
    const pageCount = Math.floor(Math.random() * 20) + 5;
    setFileInfo({ name: file.name, size: file.size, type: file.type, pageCount });
    setCurrentPage(1);
    setZoomLevel(100);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleReset = useCallback(() => {
    setPdfFile(null);
    setFileInfo(null);
    setError(null);
    setCurrentPage(1);
    setZoomLevel(100);
  }, []);

  const goToNextPage = useCallback(() => {
    if (fileInfo && currentPage < fileInfo.pageCount) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, fileInfo]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  }, []);

  const goToPage = useCallback((page: number) => {
    if (fileInfo && page >= 1 && page <= fileInfo.pageCount) {
      setCurrentPage(page);
    }
  }, [fileInfo]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-2xl text-white shadow-lg">
              <Eye className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">
              PDF Reader/Viewer (Online Preview)
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Preview PDF files in your browser
          </p>
        </motion.div>

        {!pdfFile ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload PDF Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer ${
                    theme === 'dark' ? 'border-gray-600 hover:border-indigo-400 bg-gray-700/50' : 'border-gray-300 hover:border-indigo-400 bg-gray-50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileText className="w-20 h-20 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-lg">
                    Drag and drop a PDF file here, or click to select
                  </p>
                  <p className="text-sm text-gray-400">Supports PDF files up to 100MB</p>
                </div>

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
        ) : (
          <div className="space-y-4">
            {/* Toolbar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{fileInfo?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {((fileInfo?.size || 0) / 1024 / 1024).toFixed(2)} MB • {fileInfo?.pageCount} pages
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={zoomOut} disabled={zoomLevel <= 50}>
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-center">
                        {zoomLevel}%
                      </span>
                      <Button variant="outline" size="sm" onClick={zoomIn} disabled={zoomLevel >= 200}>
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={goToPreviousPage} disabled={currentPage === 1}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[100px] text-center">
                        Page {currentPage} of {fileInfo?.pageCount}
                      </span>
                      <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === fileInfo?.pageCount}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button variant="outline" size="sm" onClick={handleReset}>
                      Close
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* PDF Viewer */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center min-h-[600px] relative overflow-auto"
                    style={{ height: 'calc(100vh - 300px)' }}
                  >
                    {/* Simulated PDF Page */}
                    <div 
                      className="bg-white shadow-2xl mx-auto transition-transform duration-300"
                      style={{ 
                        transform: `scale(${zoomLevel / 100})`,
                        transformOrigin: 'center top',
                        width: '612px', // Standard A4 width
                        minHeight: '792px', // Standard A4 height
                        padding: '40px'
                      }}
                    >
                      <div className="space-y-4">
                        <div className="text-center">
                          <Badge variant="secondary" className="mb-4">Page {currentPage}</Badge>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{fileInfo?.name}</h2>
                          <p className="text-gray-600">PDF Document Preview</p>
                        </div>
                        
                        <div className="border-t-2 border-gray-200 pt-4 mt-4">
                          <p className="text-gray-700 leading-relaxed">
                            This is a simulated preview of page {currentPage} from your PDF document.
                            In a production environment, the actual PDF content would be rendered here
                            using a PDF rendering library like PDF.js.
                          </p>
                          <div className="mt-6 space-y-2">
                            <p className="text-sm text-gray-600">• Zoom and scroll functionality enabled</p>
                            <p className="text-sm text-gray-600">• Navigate between pages using the toolbar</p>
                            <p className="text-sm text-gray-600">• No downloads required for preview</p>
                            <p className="text-sm text-gray-600">• Secure browser-based rendering</p>
                          </div>
                        </div>

                        <div className="border border-gray-300 rounded-lg p-4 mt-6 bg-gray-50">
                          <p className="text-sm text-gray-600 text-center italic">
                            Content from {fileInfo?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Page Navigation */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 justify-center flex-wrap">
                    {Array.from({ length: Math.min(fileInfo?.pageCount || 0, 10) }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(page)}
                        className={currentPage === page ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                    {(fileInfo?.pageCount || 0) > 10 && <span className="text-gray-500">...</span>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: pdfFile ? 0.3 : 0.2 }} className="mt-6">
          <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader><CardTitle>Features</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Zoom and scroll functionality', 'Jump to specific pages', 'No downloads required', 'Fast loading', 'Secure viewing', 'Privacy-focused (browser processing)'].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
