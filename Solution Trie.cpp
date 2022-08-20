
#include <array>
#include <vector>
using namespace std;

class Solution {
    
    inline static const int ALPHABET_SIZE = 26;
    inline static const int INDEX_FORWARD_SLASH = 26;

    struct TrieNode {
        array< TrieNode*, ALPHABET_SIZE + 1 > branches{};
        bool isEndOfDirectory;
    };
    TrieNode* root = new TrieNode();

public:
    vector<string> removeSubfolders(vector<string>& folder) {
        addAllDirectoriesToTrie(folder);
        vector<string> rootDirectories;

        for (const auto& directory : folder) {
            if (isRootDirectory(directory)) {
                rootDirectories.push_back(directory);
            }
        }
        return rootDirectories;
    }
    
private:
    bool isRootDirectory(const string& directory) {
        TrieNode* current = root;
        bool encounteredEndOfDirectory = false;
        
        for (int i = 0; i < directory.length(); ++i) {
            int index = getIndexFromChar(directory[i]);
            if (encounteredEndOfDirectory && index == INDEX_FORWARD_SLASH) {
                return false;
            }
            if (current->branches[index]->isEndOfDirectory) {
                encounteredEndOfDirectory = true;
            }
            current = current->branches[index];
        }
        return true;
    }

    void addAllDirectoriesToTrie(const vector<string>& folder) {
        for (const auto& directory : folder) {
            addDirectoryToTrie(directory);
        }
    }

    void addDirectoryToTrie(const string& directory) {
        TrieNode* current = root;
        
        for (int i = 0; i < directory.length(); ++i) {
            int index = getIndexFromChar(directory[i]);
            if (current->branches[index] == nullptr) {
                current->branches[index] = new TrieNode();
            }
            current = current->branches[index];
        }
        current->isEndOfDirectory = true;
    }

    int getIndexFromChar(char ch) {
        return isalpha(ch) ? (ch - 'a') : INDEX_FORWARD_SLASH;
    }
};
