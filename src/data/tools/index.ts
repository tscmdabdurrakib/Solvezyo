import { calculationTools } from "./calculation-tools";
import { converterTools } from "./converter-tools";
import { imageTools } from "./image-tools";
import { pdfDocumentTools } from "./pdf-document-tools";
import { textStringTools } from "./text-string-tools";
import { downloaderTools } from "./downloader-tools";
import { colorTools } from "./color-tools";
import { developerTools } from "./developer-tools";
import { seoTools } from "./seo-tools";
import { writingTools } from "./writing-tools";
import { grammarPlagiarismTools } from "./grammar-plagiarism-tools";
import { writingAssistanceTools } from "./writing-assistance-tools";
import type { Tool } from "./types";

export type { Tool } from "./types";

export const tools: Tool[] = [
  ...calculationTools,
  ...converterTools,
  ...imageTools,
  ...pdfDocumentTools,
  ...textStringTools,
  ...downloaderTools,
  ...colorTools,
  ...developerTools,
  ...seoTools,
  ...writingTools,
  ...grammarPlagiarismTools,
  ...writingAssistanceTools,
];
