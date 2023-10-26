const node = function createNode(value) {
    let data = value;
    let left = null;
    let right = null;
    return {
        data, left, right
    }
};

const tree = function createTree(arr) {
    let root = buildTree(arr);

    function buildTree(arr) {
        let sorted = cleanUpArray(arr);
        let start = 0;
        let end = sorted.length;
        if (start >= end)
        {
            return null;
        };
        let mid = parseInt((start + end) / 2);
        let newNode = node(sorted[mid]);
        newNode.left = buildTree(sorted.slice(0, mid));
        newNode.right = buildTree(sorted.slice(mid+1, end));
        return newNode;
    };

    function merge(arr) {
        if(arr.length < 2) return arr;
        let half = Math.floor(arr.length / 2);
        let left = arr.slice(0, half);
        let right = arr.slice(half);
        let newArr = [].concat(merge(left), merge(right));
        return newArr.sort((a, b) => a-b);
      };
    
    function removeDuplicates(arr) {
        if(arr.length < 2) return arr;
        let newArr = [...new Set(arr)];
        return newArr;
    }
    
    function cleanUpArray(arr) {
        return merge(removeDuplicates(arr));
    };

    function insert (value, tree = this.root) {
        let newNode = node(value);
        if(tree == null){
            tree = newNode;
        } else insertNode(newNode, tree)
    };
    
    function insertNode(newNode, node){
        if(newNode.data < node.data) {
            if(node.left == null){
                node.left = newNode;
            } else if(newNode.data > node.left.data){
                if(node.left.right){
                    insertNode(newNode, node.left);
                } else node.left.right = newNode;
            } else insertNode(newNode, node.left);
        } else if(newNode.data > node.data) {
            if(node.right == null){
                node.right = newNode;
            } else if(newNode.data < node.right.data){
                if(node.right.left) {
                    insertNode(newNode, node.right);
                } else node.right.left = newNode;
            }else insertNode(newNode, node.right);
        };
    };

    function del (value, current = root, parent = null){
        if(value < current.data) {
            if(current.left){
                del(value, current.left, current);
            } else console.log('error');
        } else if (value > current.data) {
            if(current.right){
                del(value, current.right, current);
            } else console.log('error');
        } else if (value == current.data) {
            if(!current.left && !current.right) {
                if(current == parent.left) {
                    parent.left = null;
                } else parent.right = null;
            } else if (current.left && !current.right) {
                if(current == parent.left) {
                    parent.left = current.left;
                } else parent.right = current.left;
            } else if (!current.left && current.right) {
                if(current == parent.left) {
                    parent.left = current.right;
                } else parent.right = current.right;
            } else if (current.left && current.right) {
                current.data = findLowest(current.right).data;
                del(current.data, current.right, current);
            }
        };
    };
    
    function findLowest(value) {
        let current = value;
        while (current.left !== null) {
            current = current.left;
        };
        return current;
    };

    return { root, insert, del };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let myTree = tree(arr);
myTree.insert(25);
myTree.del(8)
console.log(prettyPrint(myTree.root));