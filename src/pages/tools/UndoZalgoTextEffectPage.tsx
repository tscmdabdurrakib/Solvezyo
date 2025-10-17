import { Helmet } from 'react-helmet';
import UndoZalgoTextEffect from '@/tools/text-string/undo-zalgo-text-effect';

export default function UndoZalgoTextEffectPage() {
  return (
    <>
      <Helmet>
        <title>Undo Zalgo Text Effect - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove zalgo effects and restore normal text. Clean corrupted text easily." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Undo Zalgo Text Effect
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove zalgo effects and restore normal text
          </p>
        </div>
        <UndoZalgoTextEffect />
      </div>
    </>
  );
}
