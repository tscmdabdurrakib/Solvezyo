export interface Topic {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
}

export const cssTopics: Topic[] = [
  {
    id: 'css-intro',
    title: 'CSS Introduction',
    content: `
      <p>CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.</p>
      <p>CSS is one of the core technologies of the World Wide Web, alongside HTML and JavaScript. CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts.</p>
    `,
    codeExample: `/* External CSS file */
body {
  background-color: lightblue;
}

h1 {
  color: navy;
  margin-left: 20px;
}`
  },
  {
    id: 'css-syntax',
    title: 'CSS Syntax',
    content: `
      <p>A CSS rule consists of a selector and a declaration block. The selector points to the HTML element you want to style. The declaration block contains one or more declarations separated by semicolons. Each declaration includes a CSS property name and a value, separated by a colon.</p>
    `,
    codeExample: `selector {
  property: value;
  property: value;
}

p {
  color: red;
  text-align: center;
}`
  },
  {
    id: 'css-selectors',
    title: 'CSS Selectors',
    content: `
      <p>CSS selectors are used to "find" (or select) the HTML elements you want to style. We can divide CSS selectors into five categories: Simple selectors, Combinator selectors, Pseudo-class selectors, Pseudo-elements selectors, and Attribute selectors.</p>
    `,
    codeExample: `/* Element selector */
p {
  color: blue;
}

/* Class selector */
.intro {
  font-size: 20px;
}

/* ID selector */
#header {
  background-color: #f1f1f1;
}

/* Universal selector */
* {
  margin: 0;
  padding: 0;
}`
  },
  {
    id: 'css-colors',
    title: 'CSS Colors',
    content: `
      <p>Colors in CSS are used to give style to HTML elements. CSS supports many color formats including named colors, RGB, HEX, HSL, RGBA, and HSLA values.</p>
    `,
    codeExample: `/* Named colors */
p {
  color: red;
}

/* HEX colors */
h1 {
  color: #ff0000;
}

/* RGB colors */
div {
  background-color: rgb(255, 0, 0);
}

/* HSL colors */
span {
  color: hsl(0, 100%, 50%);
}`
  },
  {
    id: 'css-backgrounds',
    title: 'CSS Backgrounds',
    content: `
      <p>CSS background properties are used to define the background effects for elements. You can set several background properties in one declaration using the background shorthand property.</p>
    `,
    codeExample: `.background-example {
  background-color: #f0f0f0;
  background-image: url("image.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}`
  },
  {
    id: 'css-borders',
    title: 'CSS Borders',
    content: `
      <p>The CSS border properties allow you to specify the style, width, and color of an element's border. You can set the border for all sides or for specific sides.</p>
    `,
    codeExample: `.border-example {
  border-style: solid;
  border-width: 2px;
  border-color: #333;
  
  /* Shorthand */
  border: 1px solid #ccc;
}`
  },
  {
    id: 'css-margins',
    title: 'CSS Margins',
    content: `
      <p>Margins are used to create space around elements, outside of any defined borders. CSS has properties for specifying the margin for each side of an element.</p>
    `,
    codeExample: `.margin-example {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 15px;
  margin-left: 25px;
  
  /* Shorthand */
  margin: 10px 20px 15px 25px;
}`
  },
  {
    id: 'css-padding',
    title: 'CSS Padding',
    content: `
      <p>Padding is used to create space around an element's content, inside of any defined borders. CSS has properties for specifying the padding for each side of an element.</p>
    `,
    codeExample: `.padding-example {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 15px;
  padding-left: 25px;
  
  /* Shorthand */
  padding: 10px 20px 15px 25px;
}`
  },
  {
    id: 'css-flexbox',
    title: 'CSS Flexbox',
    content: `
      <p>Flexbox is a layout model that allows elements to align and distribute space within a container. It's particularly useful for responsive design and complex layouts.</p>
    `,
    codeExample: `.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.flex-item {
  flex: 1;
}`
  },
  {
    id: 'css-grid',
    title: 'CSS Grid',
    content: `
      <p>CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward.</p>
    `,
    codeExample: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}

.grid-item {
  background-color: #f0f0f0;
  padding: 20px;
}`
  }
];