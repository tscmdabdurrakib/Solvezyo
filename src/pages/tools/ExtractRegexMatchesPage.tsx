import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import ExtractRegexMatches from "@/tools/text-string/extract-regex-matches";

export default function ExtractRegexMatchesPage() {
  return (
    <>
      <Helmet>
        <title>Extract Regex Matches - Solvezyo</title>
        <meta name="description" content="Find and extract all regex pattern matches from text. Perfect for data extraction and validation." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Text & String Tools</p>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Extract Regex Matches
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find and extract all regex pattern matches from your text
            </p>
          </div>

          <ExtractRegexMatches />
        </div>
      </div>
    </>
  );
}
