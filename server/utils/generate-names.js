const words = [
  "apple",
  "banana",
  "cherry",
  "dog",
  "elephant",
  "frog",
  "giraffe",
  "house",
  "iguana",
  "jacket",
  "kite",
  "lemon",
  "mango",
  "noodle",
  "ocean",
  "penguin",
  "quilt",
  "rabbit",
  "sunflower",
  "tree",
  "umbrella",
  "volcano",
  "watermelon",
  "xylophone",
  "yacht",
  "zebra",
  "airplane",
  "butterfly",
  "carrot",
  "dolphin",
  "eagle",
  "fire",
  "guitar",
  "hamburger",
  "ice cream",
  "jungle",
  "kiwi",
  "lighthouse",
  "mountain",
  "night",
  "ostrich",
  "parrot",
  "quokka",
  "rainbow",
  "snake",
  "tiger",
  "unicorn",
  "vampire",
  "waterfall",
  "x-ray",
  "yogurt",
  "zeppelin",
  "ant",
  "bear",
  "cat",
  "dog",
  "elephant",
  "fox",
  "giraffe",
  "horse",
  "iguana",
  "jaguar",
  "kangaroo",
  "lion",
  "monkey",
  "newt",
  "otter",
  "panda",
  "quokka",
  "rhinoceros",
  "sloth",
  "tiger",
  "unicorn",
  "vulture",
  "wolf",
  "x-ray fish",
  "yak",
  "zebra",
  "apricot",
  "blueberry",
  "carrot",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "pear",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "uva",
  "vigna",
  "watermelon",
  "xigua",
  "yam",
  "zucchini",
];

function generateProjectName() {
  const word1 = getRandomWord(words);
  const word2 = getRandomWord(words);
  const alphanumericPart = generateRandomAlphanumeric(6);
  return `${word1}-${word2}-${alphanumericPart}`;
}

function getRandomWord(wordList) {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

function generateRandomAlphanumeric(length) {
  const alphanumericChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    result += alphanumericChars.charAt(randomIndex);
  }
  return result;
}

module.exports = generateProjectName;
