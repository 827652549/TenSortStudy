'use strict';

/**
 * 冒泡排序
 * @param {Array} arr 传入一个数组,按照从小到大排序
 * @returns {Array} 返回排序后的数组
 */
let bubbleSort = (arr) => {
    let len = arr.length;
    let temp;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
};

/**
 *  选择排序
 * @param {Array} arr 传入一个数组,按照从小到大排序
 * @returns {Array} 返回排序后的数组
 */
let selectionSort = (arr) => {
    let len = arr.length;
    //minIndex是最小值第下标
    let minIndex,
        tempNum;
    //需要以len-1个数为基准来判断剩下的数是否需要交换
    for (let i = 0; i < len - 1; i++) {
        //当前基准数
        minIndex = i;
        //循环之后，可以将最小值下标标记出来
        for (let j = i + 1; j < len; j++) {
            //寻找最小的数
            if (arr[minIndex] > arr[j]) {
                //将最小的数的下标保存
                minIndex = j;
            }
        }
        //将最小值与基准值交换
        tempNum = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = tempNum;
    }
    return arr;
};

/**
 * 插入排序
 * tip:就想玩扑克牌的时候整理顺序一样
 * @param {Array} arr 传入一个数组,按照从小到大排序
 * @returns {Array} 返回排序后的数组
 */
let insertionSort = (arr) => {
    let length = arr.length;
    //current为本次循环中源位置的值
    let current, preIndex;
    for (let i = 1; i < length; i++) {
        //preIndex为相邻的前一个下标
        preIndex = i - 1;
        current = arr[i];
        //元素向后移动
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        //插入
        arr[preIndex + 1] = current;
    }
    return arr;
};

/**
 * 希尔排序
 * tip:插入排序的升级版
 * @param {Array} arr 传入一个数组,按照从小到大排序
 * @returns {Array} 返回排序后的数组
 */
let shellSort = (arr) => {
    let N = arr.length;
    //开始分组，初始状态，增量(gap)为数组长度的一半,当递减到增量为1时，即是最后一次排序
    for (let gap = Math.floor(N / 2); gap >= 1; gap = Math.floor(gap / 2)) {
        //对各个分组进行插入排序
        for (let i = gap; i < N; i++) {
            //将arr[i]插入到正确对位置上
            _insert(arr, gap, i);
        }
    }
    return arr;
};
/**
 * 希尔排序中将arr[i]插入到正确到位置上
 *（即插入排序，带有增量）
 * arr[i]所在到分组是：...arr[i-2*gap],arr[i-gap],arr[i],arr[i+gap],arr[i+2*gap]...当
 * @param arr 需要进行插入排序对数组
 * @param gap 增量
 * @param i 指定位置的下标
 */
let _insert = (arr, gap, i) => {
    let inserted = arr[i], j;
    //插入的时候分组插入（组内元素两两相隔gap）
    for (j = i - gap; j >= 0 && inserted < arr[j]; j -= gap) {
        arr[j + gap] = arr[j];
    }
    arr[j + gap] = inserted;
};

/**
 * 归并排序
 *
 * @param {Array} arr 传入一个数组,按照从小到大排序
 * @returns {Array} 返回排序后的数组
 */
let mergeSort = (arr) => {
    let len = arr.length;
    if (len < 2) {
        return arr;
    }
    let middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);

    return _merge(mergeSort(left), mergeSort(right));
};

/**
 * 合并（归并）两个数组
 * @param left
 * @param right
 * @returns {[]}
 * @private
 */
let _merge = (left, right) => {
    //合并空间
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            //移除left的第一个元素，并且添加到合并空间中
            result.push(left.shift());
        }else{
            //移除right到第一个元素，并且添加到合并空间中
            result.push(right.shift());
        }
    }
    //假如左数组还有剩余，则把左数组增加到合并空间中
    while (left.length){
        result.push(left.shift());
    }
    //假如右数组还有剩余，则把右数组增加到合并空间中
    while (right.length){
        result.push(right.shift());
    }
    return result;
};

let arr = [2, 2, 5, 888, 54, 11, 3, 767, 8, 163];
console.log('原数组：', arr);

console.log('冒泡排序', bubbleSort(arr));
console.log('选择排序', selectionSort(arr));
console.log('插入排序', insertionSort(arr));
console.log('希尔排序', shellSort(arr));
console.log('归并排序', mergeSort(arr));
