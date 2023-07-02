const defaultText = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}" title="${title}">${text}</a>`;
};

function App() {
  const [state, setState] = React.useState({
    editorText: defaultText
  });

  function onChange(e) {
    setState({
      editorText: e.target.value
    });
  }

  return (
    <div id="app">
      <div id="left">
        <div className="titles"> Editor </div>
        <Editor onChange={onChange} editorText={state.editorText} />
      </div>
      <div id="devide"></div>
      <div id="right">        
        <div className="titles"> Preview </div>
        <Preview editorText={state.editorText} />
      </div>
    </div>
  );
}

const Editor = (props) => {
  return (
    <textarea
      id="editor"
      type="text"
      onChange={props.onChange}
      value={props.editorText}
    />
  );
};

const Preview = (props) => {
  return (
    <div 
      id="preview"
      dangerouslySetInnerHTML={{__html: marked.parse(props.editorText, { renderer: renderer })}}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
