/** Bài 2 trong Array&String : Find Smallest size of string containing all char of other
 *  Input: S = “timetopractice”, P = “toc”
    Output: toprac
    Explanation: “toprac” is the smallest substring in which “toc” can be found.
    Input: S = “zoomlazapzo”, P = “oza”
    Output: apzo
    Explanation: “apzo” is the smallest substring in which “oza” can be found.
 *  
 * */
// Way 1: [Naive Approach] By Generating all the Substrings – O(N^3) Time and O(N) Space:
// Function to check if the substring contains all
// characters of the pattern
function containsAllCharacters(s, p) {
    let count = new Array(256).fill(0);

    // Count the frequency of each character in the pattern
    for (let ch of p) {
        count[ch.charCodeAt(0)]++;
    }

    // For each character in the substring, decrement its count
    for (let ch of s) {
        if (count[ch.charCodeAt(0)] > 0) {
            count[ch.charCodeAt(0)]--;
        }
    }

    // If all counts in the count array are zero,
    // the substring contains all characters of the pattern
    return count.every(c => c === 0);
}

// Function to find the smallest substring containing all
// characters of the pattern
function findSmallestSubstring(s, p) {
    let m = s.length;
    let n = p.length;
    let smallestSubstring = "";
    let minLen = Number.MAX_SAFE_INTEGER;

    // Generate all substrings of the given string
    for (let i = 0; i < m; i++) {
        for (let j = i; j < m; j++) {
            let substr = s.slice(i, j + 1);

            // Check if the substring contains all
            // characters of the pattern
            if (containsAllCharacters(substr, p)) {
                let currLen = substr.length;

                // Update the smallestSubstring if the
                // current substring is smaller
                if (currLen < minLen) {
                    minLen = currLen;
                    smallestSubstring = substr;
                }
            }
        }
    }

    return smallestSubstring;
}
// Way 2:[Better Approach] By using Binary Search on Answer – O(N*logN) Time and O(1) Space:
function isValid(s, p, mid)
{
    // Count the frequency of each character in p
    const count = Array(256).fill(0);
    let distinct = 0;

    // Count the frequency of each character in p
    for (let x of p) {
        if (count[x.charCodeAt(0)] === 0)
            distinct++;
        count[x.charCodeAt(0)]++;
    }

    // Stores the number of characters in a substring of
    // size mid in s whose frequency is the same as the
    // frequency in p
    let currCount = 0;
    let start = -1;

    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i)]--;
        if (count[s.charCodeAt(i)] === 0) {
            currCount++;
        }

        // Slide the window: remove the effect of the
        // character that is out of the current window
        if (i >= mid) {
            count[s.charCodeAt(i - mid)]++;
            if (count[s.charCodeAt(i - mid)] === 1) {
                currCount--;
            }
        }

        // Check if the current window contains all
        // characters of p
        if (i >= mid - 1) {
            if (currCount === distinct) {
                start = (i - mid) + 1;
                return {valid : true, start};
            }
        }
    }

    return {valid : false, start};
}

function smallestWindow(s, p)
{
    const m = s.length;
    const n = p.length;

    // If s is smaller than p, it's impossible
    if (m < n)
        return "-1";

    let minLength = Infinity;
    let idx = -1;

    // Lower bound and Upper Bound for Binary Search
    // The smallest valid window size is n (size of p)
    let low = n, high = m;

    // Applying Binary Search on the answer
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const result = isValid(s, p, mid);

        // If a substring of length mid is found which
        // contains all the characters of p, then
        // update minLength and high, otherwise update low
        if (result.valid) {
            if (mid < minLength) {
                minLength = mid;
                idx = result.start;
            }
            high = mid - 1;
        }
        else {
            low = mid + 1;
        }
    }

    if (idx === -1)
        return "-1";

    return s.substring(idx, idx + minLength);
}
// Way 3:[Expected Approach] By using Hashing and Two pointers – O(N) Time and O(1) Space:
function smallestWindow(s, p){
    const len1 = s.length;
    const len2 = p.length;
    // Check if string's length is less than P's length
    if(len1<len2) return "-1";
     // Hash for characters in P
    const hashP = new Array(256).fill(0);
      // Hash for characters in S
    const hashS = new Array(256).fill(0);
    // Store occurrence of characters of P
    for(let char of p){
        hashP[char.charCodeAt(0)]++;
    }
    let start = 0, start_idx = -1, min_len = Infinity;
     // Count of matched characters
     let count =0;
     // Start traversing the string S
     for(let j=0;j<len1.length;j++){
         // Count occurrence of characters of string S
        hashS[s[j].charCodeAt(0)]++;
         // If S's char matches with P's char, increment count
        if(hashS[s[j].charCodeAt(0)]!==0 && hashS[s[j].charCodeAt(0)]<=hashP[s[j].charCodeAt(0)]){
            count ++;
        }
         // If all characters are matched
        if(count === len2){
            while(hashS[s[start].charCodeAt(0)]>hashP[s[start].charCodeAt(0)] || hashP[s[start].charCodeAt(0)] === 0) {
                if(hashS[s[start].charCodeAt(0)]>hashP[s[start].charCodeAt(0)] ){
                    hashS[s[start].charCodeAt(0)]--
                }
                start++;          
              }
               // Update window size
               const len_window = j-start +1;
               if(min_len>len_window){
                min_len = len_window;
                // Update starting index
                start_idx = start
               }
        }
    }
    // If no window found
    if (start_idx === -1) {
        return "-1";
    }
    // Return the substring starting from start_idx and
    // length min_len
    return s.substring(start_idx, start_idx + min_len);
};
