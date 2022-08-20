
#include <vector>
using namespace std;

class Solution {
    
    inline static const char FOLDER_SEPARATOR = '/';

public:
    vector<string> removeSubfolders(vector<string>& folder) {
        sort(folder.begin(), folder.end());
        vector<string> rootDirectories;
        rootDirectories.push_back(folder[0]);

        for (int i = 1; i < folder.size(); ++i) {

            //C++20: !folder[i].starts_with(rootDirectories[rootDirectories.size() - 1] + "/")
            //done the old fashioned way, for the sake of compatibility

            if (folder[i].substr(0, rootDirectories[rootDirectories.size() - 1].size() + 1) !=
                    rootDirectories[rootDirectories.size() - 1] + FOLDER_SEPARATOR) {
                rootDirectories.push_back(folder[i]);
            }
        }
        return rootDirectories;
    }
};
