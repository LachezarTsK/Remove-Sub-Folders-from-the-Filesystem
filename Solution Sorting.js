
/**
 * @param {string[]} folder
 * @return {string[]}
 */
var removeSubfolders = function (folder) {
    const FOLDER_SEPARATOR = '/';
    folder.sort();
    const rootDirectories = [];
    rootDirectories.push(folder[0]);

    for (let i = 1; i < folder.length; ++i) {
        if (!folder[i].startsWith(rootDirectories[rootDirectories.length - 1] + FOLDER_SEPARATOR)) {
            rootDirectories.push(folder[i]);
        }
    }
    return rootDirectories;
};
