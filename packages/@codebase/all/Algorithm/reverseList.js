/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
export const reverseList = function (head) {
  if (!head || !head.next) {
    return head;
  }

  const next = head.next;
  const list = reverseList(next);

  next.next = head;
  head.next = null;

  return list;
};
