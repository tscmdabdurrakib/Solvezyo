import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import TestStringWithRegex from "@/tools/text-string/test-string-with-regex";

export default function TestStringWithRegexPage() {
  return (
    <>
      <Helmet>
        <title>Test String with Regex - Solvezyo</title>
        <meta name="description" content="Validate if text matches a regex pattern with instant results and detailed match information." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Text & String Tools</p>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Test String with Regex
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Validate if text matches a regex pattern instantly
            </p>
          </div>

          <TestStringWithRegex />
        </div>
      </div>
    </>
  );
}
