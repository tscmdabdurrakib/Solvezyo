import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import SplitString from "@/tools/text-string/split-string";

export default function SplitStringPage() {
  return (
    <>
      <Helmet>
        <title>Split String - Solvezyo</title>
        <meta name="description" content="Split text into parts using custom delimiters like commas, pipes, or any character." />
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
              Split String
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Split text into parts using custom delimiters
            </p>
          </div>

          <SplitString />
        </div>
      </div>
    </>
  );
}
