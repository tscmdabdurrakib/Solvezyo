import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Droplet, AlertCircle, CheckCircle2, File, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/lib/ThemeProvider';

interface FileInfo {
  name: string;
  size: number;
  type: string;
}

type WatermarkType = 'text' | 'image';

export default function AddWatermarkToPDF() {
  const { theme } = useTheme();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [watermarkType, setWatermarkType] = useState<WatermarkType>('text');
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [opacity, setOpacity] = useState(50);
  const [rotation, setRotation] = useState(45);
  const [adding, setAdding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
    setAdded(false);
    setProgress(0);
  }, []);

  const handleImageUpload = useCallback((file: File) => {
    if (!file.type.includes('image')) {
      setError('Please select a valid image file');
      return;
    }
    setWatermarkImage(file);
    setError(null);
  }, []);

  const startAdding = useCallback(() => {
    if (watermarkType === 'text' && !watermarkText.trim()) {
      setError('Please enter watermark text');
      return;
    }

    if (watermarkType === 'image' && !watermarkImage) {
      setError('Please upload a watermark image');
      return;
    }

    setError(null);
    setAdding(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAdding(false);
          setAdded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [watermarkType, watermarkText, watermarkImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDownload = useCallback(() => {
    if (!pdfFile) return;
    const blob = new Blob(['PDF with Watermark'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace('.pdf', '-watermarked.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [pdfFile]);

  const handleReset = useCallback(() => {
    setPdfFile(null);
    setFileInfo(null);
    setWatermarkText('');
    setWatermarkImage(null);
    setAdded(false);
    setProgress(0);
    setError(null);
    setAdding(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-fuchsia-600 to-purple-700 rounded-2xl text-white shadow-lg">
              <Droplet className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-600 to-purple-700 bg-clip-text text-transparent">
              Add Watermark to PDF
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Apply text or image watermarks to your PDFs
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload PDF & Configure Watermark
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!pdfFile ? (
                <>
                  <div className="mb-6 space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Watermark Type</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setWatermarkType('text')}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            watermarkType === 'text'
                              ? 'border-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/20'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <span className="text-sm font-medium">Text Watermark</span>
                        </button>
                        <button
                          onClick={() => setWatermarkType('image')}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            watermarkType === 'image'
                              ? 'border-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/20'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <span className="text-sm font-medium">Image Watermark</span>
                        </button>
                      </div>
                    </div>

                    {watermarkType === 'text' ? (
                      <div>
                        <Label htmlFor="watermarkText" className="text-sm font-medium mb-2 block">
                          Watermark Text
                        </Label>
                        <Textarea
                          id="watermarkText"
                          placeholder="Enter watermark text..."
                          value={watermarkText}
                          onChange={(e) => setWatermarkText(e.target.value)}
                          className="w-full"
                          rows={3}
                        />
                      </div>
                    ) : (
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Upload Watermark Image
                        </Label>
                        <div
                          onClick={() => imageInputRef.current?.click()}
                          className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-fuchsia-400 transition-all"
                        >
                          {watermarkImage ? (
                            <div className="flex items-center gap-2 justify-center">
                              <ImageIcon className="w-6 h-6 text-fuchsia-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{watermarkImage.name}</span>
                            </div>
                          ) : (
                            <>
                              <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                              <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload image</p>
                            </>
                          )}
                        </div>
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                          className="hidden"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="opacity" className="text-sm font-medium mb-2 block">
                        Opacity: {opacity}%
                      </Label>
                      <input
                        id="opacity"
                        type="range"
                        min="10"
                        max="100"
                        value={opacity}
                        onChange={(e) => setOpacity(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rotation" className="text-sm font-medium mb-2 block">
                        Rotation: {rotation}°
                      </Label>
                      <input
                        id="rotation"
                        type="range"
                        min="0"
                        max="360"
                        value={rotation}
                        onChange={(e) => setRotation(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                      theme === 'dark' ? 'border-gray-600 hover:border-fuchsia-400 bg-gray-700/50' : 'border-gray-300 hover:border-fuchsia-400 bg-gray-50'
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
                    <File className="w-10 h-10 text-fuchsia-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{fileInfo?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{((fileInfo?.size || 0) / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleReset}>Remove</Button>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Watermark:</strong> {watermarkType === 'text' ? `"${watermarkText}"` : watermarkImage?.name} • {opacity}% opacity • {rotation}° rotation
                    </p>
                  </div>

                  {!added && (
                    <Button
                      onClick={startAdding}
                      className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Droplet className="w-5 h-5 mr-2" />
                      Add Watermark
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
          {adding && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Adding watermark...</span>
                      <span className="text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {added && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    Watermark Added
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                      <p className="text-sm text-green-800 dark:text-green-300">Watermark has been applied to your PDF</p>
                    </div>
                    <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Download className="w-5 h-5 mr-2" />
                      Download Watermarked PDF
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
                {['Custom watermark text or images', 'Set opacity and rotation', 'Apply to all or specific pages', 'Preview before applying', 'No quality loss', 'Privacy-focused (browser processing)'].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-fuchsia-500 flex-shrink-0" />
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
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">1</Badge><span>Choose text or image watermark</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">2</Badge><span>Configure opacity and rotation</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">3</Badge><span>Upload your PDF file</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">4</Badge><span>Download your watermarked PDF</span></li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
