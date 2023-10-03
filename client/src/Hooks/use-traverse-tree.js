const useTraverseTree = () => {
  // Add a file or folder in tree
  // Can be optimised using Dynamic Programming
  const insertNode = function (tree, relativePath, item, isFolder) {
  	const insertAtPath = function (tree, parts, item, isFolder) {
  	  while (parts.length > 0 && parts[0] === "") {
      	parts.shift();
    	}
    	if (parts.length === 1) {
    	  tree.items.unshift({
    	    id: new Date().getTime(),
    	    name: item,
    	    isFolder: isFolder,
    	    items: [],
    	    relativePath: `${tree.relativePath === '/' ? '' : tree.relativePath}/${parts[0]}`,
    	  });
    	} else {
    	  const part = parts.shift();
    	  const existingNode = tree.items.find((node) => node.name === part);
	
    	  if (existingNode && existingNode.isFolder) {
    	    insertAtPath(existingNode, parts, item, isFolder);
    	  } else {
    	    const newFolder = {
    	      id: new Date().getTime(),
    	      name: part,
    	      isFolder: true,
    	      items: [],
    	      relativePath: `${tree.relativePath === '/' ? '' : tree.relativePath}/${parts}`,
    	    };
    	    tree.items.unshift(newFolder);
    	    insertAtPath(newFolder, parts, item, isFolder);
    	  }
    	}
  	};
  	insertAtPath(tree, relativePath.split('/'), item, isFolder);
  	return tree;
	}


  const deleteNode = function (tree, relativePath) {
  	const deleteAtPath = function (tree, parts) {
    	if (parts.length === 1) {
    	  const indexToDelete = tree.items.findIndex((node) => node.name === parts[0]);
    	  if (indexToDelete !== -1) {
    	    tree.items.splice(indexToDelete, 1);
    	  }
    	} else {
    	  const part = parts.shift();
    	  const existingNode = tree.items.find((node) => node.name === part);

	      if (existingNode && existingNode.isFolder) {
	        deleteAtPath(existingNode, parts);
	      }
	    }
	  };

	  deleteAtPath(tree, relativePath.split('/'));
	  return tree;
	};


  const renameNode = function (tree, relativePath, newName) {
  	const renameAtPath = function (tree, parts, newName) {
    	if (parts.length === 1) {
    	  const nodeToRename = tree.items.find((node) => node.name === parts[0]);
    	  if (nodeToRename) {
    	    nodeToRename.name = newName;
    	  }
    	} else {
    	  const part = parts.shift();
    	  const existingNode = tree.items.find((node) => node.name === part);
	
    	  if (existingNode && existingNode.isFolder) {
    	    renameAtPath(existingNode, parts, newName);
    	  }
   	 }
  	};	

  	renameAtPath(tree, relativePath.split('/'), newName);
  	return tree;
	};


  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
