import cloneDeep from 'lodash/cloneDeep';

function updateFolderTree(tree, activeFile, code) {
  const updatedTree = cloneDeep(tree); 
  function updateFileContent(node) {
    if (node.relativePath === activeFile) {
      node.content = code;
    } else if (node.items && node.items.length > 0) {
      node.items.forEach(updateFileContent);
    }
  }

  updatedTree.items.forEach(updateFileContent);

  return updatedTree;
}

export default updateFolderTree;

