
/**
 * @param {string[]} folder
 * @return {string[]}
 */
var removeSubfolders = function (folder) {
    this.ALPHABET_SIZE = 26;
    this.INDEX_FOLDER_SEPARATOR = 26;
    this.ASCII_SMALL_CASE_A = 97;
    this.ROOT = new TrieNode(this.ALPHABET_SIZE);

    addAllDirectoriesToTrie(folder);
    const rootDirectories = [];

    for (let directory of folder) {
        if (isRootDirectory(directory)) {
            rootDirectories.push(directory);
        }
    }
    return rootDirectories;
};

/**
 * @param {string} directory
 * @return {boolean}
 */
function isRootDirectory(directory) {
    let current = this.ROOT;
    let encounteredEndOfDirectory = false;
    
    for (let i = 0; i < directory.length; ++i) {
        let index = getIndexFromChar(directory.charAt(i));
        if (encounteredEndOfDirectory && index === this.INDEX_FORWARD_SLASH) {
            return false;
        }
        if (current.branches[index].isEndOfDirectory) {
            encounteredEndOfDirectory = true;
        }
        current = current.branches[index];
    }
    return true;
}

/**
 * @param {string} folder
 * @return {void}
 */
function addAllDirectoriesToTrie(folder) {
    for (let directory of folder) {
        addDirectoryToTrie(directory);
    }
}

/**
 * @param {string} directory
 * @return {void}
 */
function addDirectoryToTrie(directory) {
    let current = this.ROOT;
    
    for (let i = 0; i < directory.length; ++i) {
        let index = getIndexFromChar(directory.charAt(i));
        if (current.branches[index] === null) {
            current.branches[index] = new TrieNode(this.ALPHABET_SIZE);
        }
        current = current.branches[index];
    }
    current.isEndOfDirectory = true;
}

/**
 * @param {number} ALPHABET_SIZE
 */
function TrieNode(ALPHABET_SIZE) {
    this.branches = new Array(ALPHABET_SIZE + 1).fill(null);
    this.isEndOfDirectory = false;
}

/**
 * @param {string} ch
 * @return {number}
 */
function getIndexFromChar(ch) {
    return (ch >= 'a' && ch <= 'z') ? (ch.codePointAt(0) - this.ASCII_SMALL_CASE_A) : this.INDEX_FORWARD_SLASH;
}
