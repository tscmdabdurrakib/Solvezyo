import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import GenerateStringFromRegex from "@/tools/text-string/generate-string-from-regex";

export default function GenerateStringFromRegexPage() {
  return (
    <>
      <Helmet>
        <title>Generate String from Regex - Solvezyo</title>
        <meta name="description" content="Generate sample strings that match your regex patterns. Perfect for testing and validation." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Text & String Tools</p>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Generate String from Regex
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create sample strings matching regex patterns for testing
            </p>
          </div>

          <GenerateStringFromRegex />
        </div>
      </div>
    </>
  );
}
