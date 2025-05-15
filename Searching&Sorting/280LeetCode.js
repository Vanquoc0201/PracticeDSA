// Bài 280 Wiggle Sort
// Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....
// Cách 1 : Sắp xếp rồi hoán đổi 
function wiggleSort(nums) {
    nums.sort((a, b) => a - b); // Sắp xếp mảng tăng dần
    for (let i = 1; i < nums.length - 1; i += 2) {
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]; // Hoán đổi từng cặp phần tử
    }
}
// Time : O(nlogn) do phải sắp xếp mảng
// Space : O(1)
// Cách 2: Duyệt mảng và hoán đổi tại chỗ (Greedy)
function wiggleSort(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        if ((i % 2 === 0 && nums[i] > nums[i + 1]) || (i % 2 === 1 && nums[i] < nums[i + 1])) {
            [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
        }
    }
}
// Time : O(n) vì chỉ duyệt qua mảng 1 lần 
// Space : O(1) vì không sử dụng thêm không gian nào

