/** Đề bài : You have one chocolate bar that consists of some chunks. Each chunk has a sweetness value represented by an integer array sweetness[].
You want to share the chocolate with your K friends, so you will cut the chocolate bar into K + 1 pieces using K cuts.
You will eat the piece with the minimum total sweetness, and your goal is to maximize this minimum sweetness.
Return the maximum possible minimum sweetness you can get by cutting the chocolate bar appropriately.
 * Example 1 :Input: sweetness = [1,2,3,4,5,6,7,8,9], k = 5  
Output: 6  
Explanation: You can divide the chocolate into [1,2,3,4,5], [6], [7], [8], [9].  
Example 2 : Input: sweetness = [5,6,7,8,9,1,2,3,4], k = 8  
Output: 1  
Explanation: You get the smallest piece, which is 1.  
 */
var maximizeSweetness = function(sweetness, k) {
    // Cách 1 : Binary Search + Greedy
    const canDivideChocolate = (minSweet) => { // Hàm để tính thử xem có thể chia thành k+1 miếng với độ ngọt mid hay ko
        let pieces = 0;
        let current = 0;
        for(let sweet of sweetness){
            current += sweet;
            if(current >= minSweet){ // Nếu độ ngọt quá mid
                pieces++; // Cắt miếng
                current = 0; // Reset lại phần mới
            }
        }
        return pieces >= k + 1 // Nếu có thể chia thành k+1 miếng trả về true
    }
    let left = 1;
    let right = Math.floor(sweetness.reduce((a, b) => a + b) / (k + 1)); // right sẽ là độ ngọt trung bình 
    while(left < right){
        let mid = Math.floor((left+right+1)/2); // Làm như vậy để tránh vòng lặp vô hạn
        if(canDivideChocolate(mid)){
            left = mid; // Nếu có thể chia thành k+1 phần chúng ta tăng left để có thể thử chia phần ngọt hơn
        } else {
            right = mid - 1; // Nếu ko thể chia thì giảm right 
        }
    }
    return left; // Trả về độ ngọt tối ưu của miếng mà chúng ta ăn sao cho ăn ngọt nhất
}
// Time : O(n*logS) với S là tổng sweetness và n là số lượng phần tử trong mảng
// Space : O(1) vì chỉ sử dụng biến để lưu trữ