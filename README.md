This project is intended to serve as practice for creating a balanced binary search tree.

# balanced-bst

The factory function to create the tree includes these functions- 

insert- inserts a node with the value passed as argument.
del- deletes the node with data matching the passed value.
find- finds and returns the node with data that matches the passed value.
levelOrder- traverses the tree in breadth-first level order and provides each node as an argument to the passed function if available. If no function is passed it returns an array of the nodes.
inorder- traverses the tree in order and provides each node as an argument to the passed function if available. If no function is passed it returns an array of the nodes.
preorder- traverses the tree in preorder and provides each node as an argument to the passed function if available. If no function is passed it returns an array of the nodes.
postorder- traverses the tree in postorder and provides each node as an argument to the passed function if available. If no function is passed it returns an array of the nodes.
height- returns the height of passed node.
depth- returns the depth of passed node.
isBalanced- checks if tree is balanced and returns true or false.
rebalance- restructures tree to become balanced.