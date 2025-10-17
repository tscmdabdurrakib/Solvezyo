import { Helmet } from 'react-helmet';
import CreateImageFromText from '@/tools/text-string/create-image-from-text';

export default function CreateImageFromTextPage() {
  return (
    <>
      <Helmet>
        <title>Create an Image from Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Convert your text into a beautiful downloadable image with custom fonts, colors, and styling options." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create an Image from Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert your text into a beautiful downloadable image
          </p>
        </div>
        <CreateImageFromText />
      </div>
    </>
  );
}