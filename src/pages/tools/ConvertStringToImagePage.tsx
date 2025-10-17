import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import ConvertStringToImage from "@/tools/text-string/convert-string-to-image";

export default function ConvertStringToImagePage() {
  return (
    <>
      <Helmet>
        <title>Convert String to Image - Solvezyo</title>
        <meta name="description" content="Convert your text into a downloadable image with customizable fonts, colors, and styles." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-pink-600 dark:text-pink-400 hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Text & String Tools</p>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Convert String to Image
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Convert your text into a downloadable image with customizable fonts, colors, and styles
            </p>
          </div>

          <ConvertStringToImage />
        </div>
      </div>
    </>
  );
}
