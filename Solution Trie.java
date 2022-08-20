
import java.util.ArrayList;
import java.util.List;

public class Solution {

    private static final int ALPHABET_SIZE = 26;
    private static final int INDEX_FOLDER_SEPARATOR = 26;
    private final TrieNode root = new TrieNode();

    private final class TrieNode {
        TrieNode[] branches = new TrieNode[ALPHABET_SIZE + 1];
        boolean isEndOfDirectory;
    }

    public List<String> removeSubfolders(String[] folder) {
        addAllDirectoriesToTrie(folder);
        List<String> rootDirectories = new ArrayList<>();

        for (String directory : folder) {
            if (isRootDirectory(directory)) {
                rootDirectories.add(directory);
            }
        }
        return rootDirectories;
    }

    private boolean isRootDirectory(String directory) {
        TrieNode current = root;
        boolean encounteredEndOfDirectory = false;
        
        for (int i = 0; i < directory.length(); ++i) {
            int index = getIndexFromChar(directory.charAt(i));
            if (encounteredEndOfDirectory && index == INDEX_FOLDER_SEPARATOR) {
                return false;
            }
            if (current.branches[index].isEndOfDirectory) {
                encounteredEndOfDirectory = true;
            }
            current = current.branches[index];
        }
        return true;
    }

    private void addAllDirectoriesToTrie(String[] folder) {
        for (String directory : folder) {
            addDirectoryToTrie(directory);
        }
    }

    private void addDirectoryToTrie(String directory) {
        TrieNode current = root;
        
        for (int i = 0; i < directory.length(); ++i) {
            int index = getIndexFromChar(directory.charAt(i));
            if (current.branches[index] == null) {
                current.branches[index] = new TrieNode();
            }
            current = current.branches[index];
        }
        current.isEndOfDirectory = true;
    }

    private int getIndexFromChar(char ch) {
        return Character.isLetter(ch) ? (ch - 'a') : INDEX_FOLDER_SEPARATOR;
    }
}
