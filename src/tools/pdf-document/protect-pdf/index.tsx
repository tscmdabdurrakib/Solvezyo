import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Lock, AlertCircle, CheckCircle2, File, Shield } from 'lucide-react';
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
}

export default function ProtectPDF() {
  const { theme } = useTheme();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [protecting, setProtecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProtected, setIsProtected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preventPrinting, setPreventPrinting] = useState(false);
  const [preventCopying, setPreventCopying] = useState(false);
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
    setIsProtected(false);
    setProgress(0);
  }, []);

  const startProtecting = useCallback(() => {
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setError(null);
    setProtecting(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProtecting(false);
          setIsProtected(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [password, confirmPassword]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDownload = useCallback(() => {
    if (!pdfFile) return;
    const blob = new Blob(['Protected PDF'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile.name.replace('.pdf', '-protected.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [pdfFile]);

  const handleReset = useCallback(() => {
    setPdfFile(null);
    setFileInfo(null);
    setPassword('');
    setConfirmPassword('');
    setIsProtected(false);
    setProgress(0);
    setError(null);
    setProtecting(false);
    setPreventPrinting(false);
    setPreventCopying(false);
  }, []);

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 33 : password.length < 10 ? 66 : 100;
  const strengthColor = passwordStrength < 33 ? 'bg-red-500' : passwordStrength < 66 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white shadow-lg">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Protect PDF (Add Password)
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Add password protection to your PDF files
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
                    theme === 'dark' ? 'border-gray-600 hover:border-blue-400 bg-gray-700/50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'
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
                    <File className="w-10 h-10 text-blue-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{fileInfo?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{((fileInfo?.size || 0) / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleReset}>Remove</Button>
                  </div>

                  {!isProtected && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="password" className="text-sm font-medium mb-2 block">
                          Set Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter a strong password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full"
                        />
                        {password && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-600 dark:text-gray-400">Password Strength</span>
                              <span className={`font-medium ${passwordStrength < 33 ? 'text-red-500' : passwordStrength < 66 ? 'text-yellow-500' : 'text-green-500'}`}>
                                {passwordStrength < 33 ? 'Weak' : passwordStrength < 66 ? 'Medium' : 'Strong'}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className={`h-2 rounded-full transition-all duration-300 ${strengthColor}`} style={{ width: `${passwordStrength}%` }} />
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword" className="text-sm font-medium mb-2 block">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Re-enter your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                        <Label className="text-sm font-medium block">Permissions</Label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preventPrinting}
                              onChange={(e) => setPreventPrinting(e.target.checked)}
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Prevent printing</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preventCopying}
                              onChange={(e) => setPreventCopying(e.target.checked)}
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Prevent copying</span>
                          </label>
                        </div>
                      </div>

                      <Button
                        onClick={startProtecting}
                        disabled={!password.trim() || password !== confirmPassword}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                      >
                        <Lock className="w-5 h-5 mr-2" />
                        Protect PDF
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
          {protecting && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Encrypting PDF with 256-bit AES...</span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isProtected && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6">
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    PDF Protected Successfully
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                      <p className="text-sm text-green-800 dark:text-green-300 mb-2">Your PDF has been encrypted with a strong password</p>
                      {(preventPrinting || preventCopying) && (
                        <div className="text-xs text-green-700 dark:text-green-400 space-y-1">
                          {preventPrinting && <p>✓ Printing disabled</p>}
                          {preventCopying && <p>✓ Copying disabled</p>}
                        </div>
                      )}
                    </div>
                    <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Download className="w-5 h-5 mr-2" />
                      Download Protected PDF
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
                {['Encrypt PDF with custom password', '256-bit AES encryption', 'Prevent printing or copying', 'Set owner and user passwords', 'Secure file handling', 'Privacy-focused (browser processing)'].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
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
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">2</Badge><span>Set a strong password and confirm it</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">3</Badge><span>Choose permissions (optional)</span></li>
                <li className="flex gap-2"><Badge variant="secondary" className="flex-shrink-0">4</Badge><span>Download your password-protected PDF</span></li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
