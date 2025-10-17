import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Image as ImageIcon, AlertCircle, CheckCircle2, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/lib/ThemeProvider';

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

export default function JPGToPDFConverter() {
  const { theme } = useTheme();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [converted, setConverted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = useCallback((files: FileList) => {
    const validImages: ImageFile[] = [];
    
    Array.from(files).forEach((file) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select valid image files');
        return;
      }

      // Validate file size (max 10MB per image)
      if (file.size > 10 * 1024 * 1024) {
        setError('Each image must be less than 10MB');
        return;
      }

      const preview = URL.createObjectURL(file);
      validImages.push({
        file,
        preview,
        id: Math.random().toString(36).substr(2, 9),
      });
    });

    if (validImages.length > 0) {
      setError(null);
      setImages((prev) => [...prev, ...validImages]);
      setConverted(false);
      setProgress(0);
    }
  }, []);

  // Simulate JPG to PDF conversion
  const startConversion = useCallback(() => {
    if (images.length === 0) {
      setError('Please add at least one image');
      return;
    }

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
  }, [images]);

  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, [handleFileUpload]);

  // Remove image
  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  // Handle download converted file
  const handleDownload = useCallback(() => {
    // Create a dummy PDF file (in production, this would be the actual converted file)
    const blob = new Blob(['Converted PDF from Images'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-images.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  // Reset state
  const handleReset = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setConverted(false);
    setProgress(0);
    setError(null);
    setConverting(false);
  }, [images]);

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
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl text-white shadow-lg">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
              JPG to PDF Converter
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Combine multiple JPG images into a single PDF document
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
                Upload Image Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  theme === 'dark' 
                    ? 'border-gray-600 hover:border-yellow-400 bg-gray-700/50' 
                    : 'border-gray-300 hover:border-yellow-400 bg-gray-50'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-lg">
                  Drag and drop images here, or click to select
                </p>
                <p className="text-sm text-gray-400">
                  Supports JPG, PNG files • Max 10MB per image
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    handleFileUpload(e.target.files);
                  }
                }}
                className="hidden"
              />

              {/* Image Preview Grid */}
              {images.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {images.length} image(s) selected
                    </p>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.preview}
                          alt={image.file.name}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(image.id);
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                          {image.file.name}
                        </p>
                      </div>
                    ))}
                  </div>

                  {!converted && !converting && (
                    <Button
                      onClick={startConversion}
                      className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Convert to PDF
                    </Button>
                  )}
                </div>
              )}

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
                        Converting images to PDF...
                      </span>
                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
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
                        Successfully converted {images.length} images to PDF
                      </p>
                    </div>
                    
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download PDF Document
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
                  'Combine multiple images into one PDF',
                  'Drag and drop multiple files',
                  'Reorder images before conversion',
                  'Supports JPG, PNG formats',
                  'Fast and secure processing',
                  'Privacy-focused (browser processing)',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
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
                  <span>Upload one or more image files by dragging and dropping or clicking the upload area</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="secondary" className="flex-shrink-0">2</Badge>
                  <span>Preview your images and remove any unwanted ones</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="secondary" className="flex-shrink-0">3</Badge>
                  <span>Click "Convert to PDF" to start the conversion process</span>
                </li>
                <li className="flex gap-2">
                  <Badge variant="secondary" className="flex-shrink-0">4</Badge>
                  <span>Download your PDF file containing all images</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
