import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import GenerateRandomString from "@/tools/text-string/generate-random-string";

export default function GenerateRandomStringPage() {
  return (
    <>
      <Helmet>
        <title>Generate Random String - Solvezyo</title>
        <meta name="description" content="Generate secure random strings with customizable options including uppercase, lowercase, numbers, and symbols." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Text & String Tools</p>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Generate Random String
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create secure random strings with custom length and character options
            </p>
          </div>

          <GenerateRandomString />
        </div>
      </div>
    </>
  );
}
