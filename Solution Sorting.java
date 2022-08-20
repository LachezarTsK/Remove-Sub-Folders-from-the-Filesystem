
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {

    private static final char FOLDER_SEPARATOR = '/';

    public List<String> removeSubfolders(String[] folder) {
        Arrays.sort(folder);
        List<String> rootDirectories = new ArrayList<>();
        rootDirectories.add(folder[0]);

        for (int i = 1; i < folder.length; ++i) {
            if (!folder[i].startsWith(rootDirectories.get(rootDirectories.size() - 1) + FOLDER_SEPARATOR)) {
                rootDirectories.add(folder[i]);
            }
        }
        return rootDirectories;
    }
}
