import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import ExtractSubstring from "@/tools/text-string/extract-substring";

export default function ExtractSubstringPage() {
  return (
    <>
      <Helmet>
        <title>Extract Substring - Solvezyo</title>
        <meta name="description" content="Extract a portion of text using start and end indices with visual preview." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Text & String Tools</p>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Extract Substring
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Extract text portions using start and end indices with visual preview
            </p>
          </div>

          <ExtractSubstring />
        </div>
      </div>
    </>
  );
}
