import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import JoinStrings from "@/tools/text-string/join-strings";

export default function JoinStringsPage() {
  return (
    <>
      <Helmet>
        <title>Join Strings - Solvezyo</title>
        <meta name="description" content="Join multiple lines of text with custom separators for easy list formatting." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Text & String Tools</p>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Join Strings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join multiple lines of text with custom separators
            </p>
          </div>

          <JoinStrings />
        </div>
      </div>
    </>
  );
}
