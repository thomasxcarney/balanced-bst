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

    function find(value, current = root) {
        if (value == current.data) {
            return current;
        } else if(value < current.data) {
            return find(value, current.left);
        } else if (value > current.data) {
            return find(value, current.right);
        };
    };

    function levelOrder(func) {
        let queue = [root];
        for(let i = 0; i < queue.length; i++) {
            if(queue[i].left) {
                queue.push(queue[i].left);
            };
            if(queue[i].right) {
                queue.push(queue[i].right);
            };
        };
        let newArr = [];
        for(let i = 0; i < queue.length; i++){
            let data = queue[i].data;
            newArr.push(data);
        };
        if(func){
            for(let i = 0; i < queue.length; i++) {
                func(queue[i]);
            };
        } else return newArr;
    };

    function inorder(func) {
        let queue = [];
        function inorderTraversal(node) {
            if (!node) return;
            inorderTraversal(node.left);
            queue.push(node);
            inorderTraversal(node.right);
        };
        inorderTraversal(root);
        let newArr = [];
        for(let i = 0; i < queue.length; i++){
            let data = queue[i].data;
            newArr.push(data);
        };
        if(func) {
            for(let i = 0; i < queue.length; i++){
                return func(queue[i]);
            };
        } else return newArr
    };

    function preorder(func) {
        let queue = [];
        function preorderTraversal(node) {
            if (!node) return;
            queue.push(node);
            preorderTraversal(node.left);
            preorderTraversal(node.right);
        };
        preorderTraversal(root);
        let newArr = [];
        for(let i = 0; i < queue.length; i++){
            let data = queue[i].data;
            newArr.push(data);
        };
        if(func) {
            for(let i = 0; i < queue.length; i++){
                return func(queue[i]);
            };
        } else return newArr;
    };

    function postorder(func) {
        let queue = [];
        function postTraversal(node) {
            if (!node) return;
            postTraversal(node.left);
            postTraversal(node.right);
            queue.push(node);
        };
        postTraversal(root);
        let newArr = [];
        for(let i = 0; i < queue.length; i++){
            let data = queue[i].data;
            newArr.push(data);
        };
        if(func) {
            for(let i = 0; i < queue.length; i++){
                return func(queue[i]);
            };
        } else return newArr;
    };

    function height(node) {
        if(!node.left && !node.right) {
            return 0;
        } else {
            let left = 0;
            let current = node;
            while(current.left) {
                current = current.left;
                left += 1;
            };
            let right = 0;
            current = node;
            while(current.right) {
                current = current.right;
                right += 1;
            };
            return Math.max(right, left);
        };
    };

    function depth(node) {
        let depth = 1;
        function findDepth(value, current = root) {
            if (value == current.data) {
                return current;
            } else if(value < current.data) {
                depth += 1;
                return findDepth(value, current.left);
            } else if (value > current.data) {
                depth +=1;
                return findDepth(value, current.right);
            };
        };
        findDepth(node.data);
        return depth;
    };

    function isBalanced() {
        let current = root;
        function checkHeight(node) {
            if (node === null) return 0;
        
            const left = checkHeight(node.left);
            const right = checkHeight(node.right);
            if (left === false || right === false || Math.abs(left - right) > 1) {
                return false;
            };
            return Math.max(left, right) + 1;
        };
        if (current === null) return true;
        return checkHeight(current) !== false;
    };

    function rebalance() {
        function inOrder(){
            let queue = [];
            function inorderTraversal(node) {
                if (!node) return;
                inorderTraversal(node.left);
                queue.push(node);
                inorderTraversal(node.right);
            };
            inorderTraversal(root);
            return queue;
        };
        let orderedArr = inOrder();
        let newArr = [];
        for(let i = 0; i < orderedArr.length; i++){
            let data = orderedArr[i].data;
            newArr.push(data);
        };
        root = buildTree(newArr);
    };

    return { root, insert, del, find, levelOrder, inorder, preorder, postorder, height, depth, isBalanced, 
    rebalance };
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

const driver = function driverScript() {
    let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    console.log('Starting Array: ' + arr)
    let myTree = tree(arr);
    console.log('isBalanced: ' + myTree.isBalanced());
    console.log('Level Order: ' + myTree.levelOrder());
    console.log('Pre Order: ' + myTree.preorder());
    console.log('Post Order: ' + myTree.postorder());
    console.log('In Order: ' + myTree.inorder());
    myTree.insert(101);
    myTree.insert(300);
    myTree.insert(502);
    console.log('Insert 101, 300, 502')
    console.log('isBalanced: ' + myTree.isBalanced());
    myTree.rebalance();
    console.log('Rebalance');
    console.log('isBalanced: ' + myTree.isBalanced());
    console.log('Level Order: ' + myTree.levelOrder());
    console.log('Pre Order: ' + myTree.preorder());
    console.log('Post Order: ' + myTree.postorder());
    console.log('In Order: ' + myTree.inorder());
};

driver();