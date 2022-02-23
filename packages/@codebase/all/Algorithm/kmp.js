// 构造模式串 pattern 的最大匹配数表 字符串本身并不是自己的后缀
// 部分匹配表PMT Partial Match Table
// PMT中的值是字符串的前缀集合与后缀集合的交集中最长元素的长度
function calculateMaxMatchLength(pattern) {
  const maxMatchLengths = pattern.split("").map(() => 0);
  let maxLength = 0;
  for (let i = 1; i < pattern.length; i++) {
    while (maxLength > 0 && pattern[maxLength] != pattern[i]) {
      maxLength = maxMatchLengths[maxLength - 1];
    }
    if (pattern[maxLength] == pattern[i]) {
      maxLength++;
    }
    maxMatchLengths[i] = maxLength;
  }
  return maxMatchLengths;
}

// 为了编程的方便, 将PMT数组向后偏移一位, 把新得到的这个数组称为next数组
// pattern = "abababca"
// pmt = [0, 0, 1, 2, 3, 4, 0, 1]
// next = [ -1, 0, 0, 1, 2, 3, 4, 0]

// 在文本 text 中寻找模式串 pattern，返回所有匹配的位置开头
function KMP(text, pattern) {
  const positions = [];
  const maxMatchLengths = calculateMaxMatchLength(pattern);
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    while (count > 0 && pattern[count] != text[i]) {
      count = maxMatchLengths[count - 1];
    }
    if (pattern[count] == text[i]) {
      count++;
    }
    if (count == pattern.length) {
      positions.push(i - pattern.length + 1);
      count = maxMatchLengths[count - 1];
    }
  }
  return positions;
}

calculateMaxMatchLength("abababca");
KMP("abbaabbaaba", "abbaaba");
