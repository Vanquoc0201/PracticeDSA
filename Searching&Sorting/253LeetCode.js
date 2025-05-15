/**
 * Đề bài : Given an array of meeting time intervals intervals where intervals[i] = [start_i, end_i], return the minimum number of conference rooms required.
 *  Example 1 : Input: intervals = [[0,30],[5,10],[15,20]]
                Output: 2
    Example 2 : Input: intervals = [[7,10],[2,4]]
                Output: 1
 */


var minMeetingRooms = function(intervals) {
    // Cách 1 : Dùng Sorting và Array
    if(intervals.length === 0) return 0;
    // Tách thời gian bắt đầu và kết thúc ra thành 2 mảng riêng
    const startTimes = intervals.map(i => i[0]).sort((a, b) => a - b);
    const endTimes = intervals.map(i => i[1]).sort((a, b) => a - b);
    let startPtr = 0;
    let endPtr = 0;
    let rooms = 0;
    let maxRooms = 0;
    while(startPtr < intervals.length){
        if(startTimes[startPtr] < endTimes[endPtr]){
            rooms++;
            startPtr++;
        } else {
            rooms--;
            endPtr--;
        }
        maxRooms = Math.max(maxRooms, rooms);
    }
    return maxRooms;
}
// Time : O(nlogn) vì cần phải sort
// Space : O(n) cho mảng startTimes và endTimes