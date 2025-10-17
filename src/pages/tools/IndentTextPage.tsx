import { Helmet } from 'react-helmet';
import IndentText from '@/tools/text-string/indent-text';

export default function IndentTextPage() {
  return (
    <>
      <Helmet>
        <title>Indent Text - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Add indentation to each line of your text with customizable indent size and type (spaces or tabs). Perfect for code formatting and text structure." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Indent Text
          </h1>
          <p className="text-muted-foreground mt-2">
            Add indentation to each line of your text
          </p>
        </div>
        <IndentText />
      </div>
    </>
  );
}
