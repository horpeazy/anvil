function toTitleCase(inputString) {
  const words = inputString.toLowerCase().split(' ');

  const titleCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return titleCaseWords.join(' ');
}

export default toTitleCase;
