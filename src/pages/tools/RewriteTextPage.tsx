import { Helmet } from 'react-helmet';
import RewriteText from '@/tools/text-string/rewrite-text';

export default function RewriteTextPage() {
  return (
    <>
      <Helmet>
        <title>Rewrite Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Transform your text with different rewriting styles. Perfect for creative text transformations." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Rewrite Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Transform your text with different rewriting styles
          </p>
        </div>
        <RewriteText />
      </div>
    </>
  );
}
