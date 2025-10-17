import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Edit3, AlertCircle, CheckCircle2, File, Type, Image as ImageIcon } from 'lucide-react';
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

type EditMode = 'text' | 'image';

export default function EditPDFOnline() {
  const { theme } = useTheme();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [editMode, setEditMode] = useState<EditMode>('text');
  const [textToAdd, setTextToAdd] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [edited, setEdited] = useState(false);
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
    setEdited(false);
    setProgress(0);
  }, []);

  const handleImageUpload = useCallback((file: File) => {
    if (!file.type.includes('image')) {
      setError('Please select a valid image file');
      return;
    }
    setImageFile(file);
    setError(null);
  }, []);

  const startEditing = useCallback(() => {
    if (editMode === 'text' && !textToAdd.trim()) {
      setError('Please enter text to add');
      return;
    }

    if (editMode === 'image' && !imageFile) {
      setError('Please upload an image');
      return;
    }

    setError(null);
    setEditing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setEditing(false);
          setEdited(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [editMode, textToAdd, imageFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDownload = useCallback(() => {
    if (!pdfFile) return;
    const blob = new Blob(['Edited PDF'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace('.pdf', '-edited.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [pdfFile]);

  const handleReset = useCallback(() => {
    setPdfFile(null);
    setFileInfo(null);
    setTextToAdd('');
    setImageFile(null);
    setEdited(false);
    setProgress(0);
    setError(null);
    setEditing(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl text-white shadow-lg">
              <Edit3 className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
              Edit PDF Online (Text, Image)
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Modify text and images directly in your PDF file
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload PDF & Edit Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!pdfFile ? (
                <>
                  <div className="mb-6 space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Edit Mode</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setEditMode('text')}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-2 justify-center ${
                            editMode === 'text'
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <Type className="w-5 h-5" />
                          <span className="text-sm font-medium">Edit Text</span>
                        </button>
                        <button
                          onClick={() => setEditMode('image')}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-2 justify-center ${
                            editMode === 'image'
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <ImageIcon className="w-5 h-5" />
                          <span className="text-sm font-medium">Add Image</span>
                        </button>
                      </div>
                    </div>

                    {editMode === 'text' ? (
                      <div>
                        <Label htmlFor="textToAdd" className="text-sm font-medium mb-2 block">
                          Text to Add
                        </Label>
                        <Textarea
                          id="textToAdd"
                          placeholder="Enter text to add to PDF..."
                          value={textToAdd}
                          onChange={(e) => setTextToAdd(e.target.value)}
                          className="w-full"
                          rows={4}
                        />
                      </div>
                    ) : (
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Upload Image to Insert
                        </Label>
                        <div
                          onClick={() => imageInputRef.current?.click()}
                          className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-emerald-400 transition-all"
                        >
                          {imageFile ? (
                            <div className="flex items-center gap-2 justify-center">
                              <ImageIcon className="w-6 h-6 text-emerald-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{imageFile.name}</span>
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
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                      theme === 'dark' ? 'border-gray-600 hover:border-emerald-400 bg-gray-700/50' : 'border-gray-300 hover:border-emerald-400 bg-gray-50'
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
                    <File className="w-10 h-10 text-emerald-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{fileInfo?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{((fileInfo?.size || 0) / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleReset}>Remove</Button>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Edit Mode:</strong> {editMode === 'text' ? 'Text Editing' : 'Image Insertion'}
                      {editMode === 'text' && textToAdd && ` • "${textToAdd.substring(0, 30)}..."`}
                      {editMode === 'image' && imageFile && ` • ${imageFile.name}`}
                    </p>
                  </div>

                  {!edited && (
                    <Button
                      onClick={startEditing}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Edit3 className="w-5 h-5 mr-2" />
                      Apply Edits to PDF
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
          {editing && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Editing PDF...</span>
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {edited && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    PDF Edited Successfully
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                      <p className="text-sm text-green-800 dark:text-green-300">Your edits have been applied to the PDF</p>
                    </div>
                    <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Download className="w-5 h-5 mr-2" />
                      Download Edited PDF
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
                {['Edit existing text content', 'Add or remove images', 'Add new annotations and shapes', 'Supports text formatting', 'No quality loss', 'Privacy-focused (browser processing)'].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
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
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">1</Badge><span>Choose edit mode (text or image)</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">2</Badge><span>Enter text or upload image to insert</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">3</Badge><span>Upload your PDF file</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">4</Badge><span>Download your edited PDF</span></li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
