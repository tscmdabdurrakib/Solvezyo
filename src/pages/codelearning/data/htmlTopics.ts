export interface Topic {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
}

export const htmlTopics: Topic[] = [
  {
    id: 'html-intro',
    title: 'HTML Introduction',
    content: `
      <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.</p>
      <p>HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects such as interactive forms may be embedded into the rendered page. HTML provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items.</p>
    `,
    codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML</h1>
    <p>This is a paragraph.</p>
</body>
</html>`
  },
  {
    id: 'html-elements',
    title: 'HTML Elements',
    content: `
      <p>An HTML element is defined by a start tag, some content, and an end tag. The HTML element is everything from the start tag to the end tag.</p>
      <p>HTML elements with no content are called empty elements. Empty elements do not have an end tag.</p>
    `,
    codeExample: `<h1>This is a heading</h1>
<p>This is a paragraph.</p>
<br>
<img src="image.jpg" alt="Image">`
  },
  {
    id: 'html-attributes',
    title: 'HTML Attributes',
    content: `
      <p>HTML attributes provide additional information about HTML elements. All HTML elements can have attributes. Attributes are always specified in the start tag. Attributes usually come in name/value pairs like: name="value".</p>
    `,
    codeExample: `<a href="https://www.example.com">This is a link</a>
<img src="image.jpg" alt="Description" width="500" height="600">`
  },
  {
    id: 'html-headings',
    title: 'HTML Headings',
    content: `
      <p>HTML headings are defined with the h1 to h6 tags. h1 defines the most important heading. h6 defines the least important heading.</p>
      <p>Search engines use the headings to index the structure and content of your web pages. Users often skim a page by its headings. It is important to use headings to show the document structure.</p>
    `,
    codeExample: `<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<h3>This is heading 3</h3>
<h4>This is heading 4</h4>
<h5>This is heading 5</h5>
<h6>This is heading 6</h6>`
  },
  {
    id: 'html-paragraphs',
    title: 'HTML Paragraphs',
    content: `
      <p>HTML paragraphs are defined with the p tag. A paragraph always starts on a new line, and browsers automatically add some white space (a margin) before and after a paragraph.</p>
      <p>You cannot be sure how HTML will be displayed. Large or small screens, and resized windows will create different results. With HTML, you cannot change the display by adding extra spaces or extra lines in your HTML code.</p>
    `,
    codeExample: `<p>This is a paragraph.</p>
<p>This is another paragraph.</p>`
  },
  {
    id: 'html-links',
    title: 'HTML Links',
    content: `
      <p>HTML links are defined with the a tag. The link's destination is specified in the href attribute. Attributes are used to provide additional information about HTML elements.</p>
      <p>Links are found in nearly all web pages. Links allow users to click their way from page to page.</p>
    `,
    codeExample: `<a href="https://www.example.com">Visit Example.com</a>
<a href="page.html">Visit another page</a>`
  },
  {
    id: 'html-images',
    title: 'HTML Images',
    content: `
      <p>HTML images are defined with the img tag. The source file (src), alternative text (alt), width, and height are provided as attributes.</p>
      <p>The alt attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).</p>
    `,
    codeExample: `<img src="image.jpg" alt="Description of image" width="500" height="600">
<img src="image2.png" alt="Another image">`
  },
  {
    id: 'html-tables',
    title: 'HTML Tables',
    content: `
      <p>HTML tables are defined with the table tag. An HTML table is made up of one or more table rows (tr) which contain table data (td) or table headers (th).</p>
      <p>Tables are used to organize data in rows and columns. They can be used for layout purposes, but it's better to use CSS for layout.</p>
    `,
    codeExample: `<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Jane</td>
    <td>30</td>
  </tr>
</table>`
  },
  {
    id: 'html-forms',
    title: 'HTML Forms',
    content: `
      <p>HTML forms are used to collect user input. The form element defines an HTML form. Form elements are different types of input elements, like text fields, checkboxes, radio buttons, submit buttons, etc.</p>
      <p>Forms are used to collect user input and send it to a server for processing.</p>
    `,
    codeExample: `<form action="/submit" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name"><br><br>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email"><br><br>
  
  <input type="submit" value="Submit">
</form>`
  },
  {
    id: 'html-semantic',
    title: 'Semantic HTML',
    content: `
      <p>Semantic HTML introduces meaning to the web page rather than just presentation. Examples include tags like header, nav, main, article, section, aside, and footer.</p>
      <p>Semantic elements help search engines and other user agents to determine the significance of web content. They also improve accessibility for users with disabilities.</p>
    `,
    codeExample: `<header>
  <h1>Website Title</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h2>Article Title</h2>
    <p>Article content...</p>
  </article>
</main>
<footer>
  <p>Copyright information</p>
</footer>`
  }
];