import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import PrintfString from "@/tools/text-string/printf-string";

export default function PrintfStringPage() {
  return (
    <>
      <Helmet>
        <title>Printf String - Solvezyo</title>
        <meta name="description" content="Format strings with printf-style placeholders like %s, %d, and %f for easy text formatting." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Text & String Tools</p>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Printf String
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Format strings with printf-style placeholders like %s, %d, and %f
            </p>
          </div>

          <PrintfString />
        </div>
      </div>
    </>
  );
}
