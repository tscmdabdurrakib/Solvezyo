import { Helmet } from 'react-helmet';
import KeywordResearch from '@/tools/seo/keyword-research';

export default function KeywordResearchPage() {
  return (
    <>
      <Helmet>
        <title>Keyword Research Tool - SEO Keyword Analysis | Solvezyo</title>
        <meta
          name="description"
          content="Discover high-value keywords with our free keyword research tool. Get search volume, CPC, competition analysis, and long-tail keyword suggestions for better SEO strategy."
        />
        <meta property="og:title" content="Keyword Research Tool - SEO Keyword Analysis | Solvezyo" />
        <meta
          property="og:description"
          content="Free keyword research tool with search volume, CPC, and competition analysis. Find the best keywords for your SEO and content marketing strategy."
        />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="keyword research, SEO tool, keyword analysis, search volume, CPC, competition, long-tail keywords" />
      </Helmet>
      <KeywordResearch />
    </>
  );
}
