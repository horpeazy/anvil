const explorer = {
  id:"1",
  name: "root",
  isFolder: true,
  items: [
    {
      id:"2",
      name: "public",
      isFolder: true,
      items: [
        {
          id:"3",
          name: "public nested 1",
          isFolder: true,
          items: [
            {
              id:"4",
              name: "index.html",
              isFolder: false,
              content: "<h1>Index.html file be this</h1>",
              items: []
            },
            {
              id:"5",
              name: "hello.html",
              isFolder: false,
              content: "<h1>Jello.html file be this</h1>",
              items: []
            }
          ]
        },
        {
          id:"6",
          name: "public_nested_file",
          isFolder: false,
          content: "<h1>Index.html file be this</h1>",
          items: []
        }
      ]
    },
    {
      id:"7",
      name: "src",
      isFolder: true,
      items: [
        {
          id:"8",
          name: "App.js",
          isFolder: false,
          content: "<h1>Index.html file be this</h1>",
          items: []
        },
        {
          id:"9",
          name: "Index.js",
          isFolder: false,
          content: "<h1>Index.html file be this</h1>",
          items: []
        },
        {
          id:"10",
          name: "styles.css",
          content: "<h1>Index.html file be this</h1>",
          isFolder: false,
          items: []
        }
      ]
    },
    {
      id:"11",
      name: "package.json",
      isFolder: false,
      content: "<h1>Index.html file be this</h1>",
      items: []
    }
  ]
};

export default explorer;
