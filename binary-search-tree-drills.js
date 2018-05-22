'use strict';
class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if(this.key == null) {
      this.key = key;
      this.value = value;
    }
    else if(key < this.key) {
      if(this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if(this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if(this.key == key) {
      return this.value;
    }
    else if(key < this.key && this.left) {
      return this.left.find(key);
    }
    else if(key > this.key && this.right) {
      return this.right.find(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if(this.key == key) {
      if(this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if(this.left) {
        this._replaceWith(this.left);
      }
      else if(this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if(key < this.key && this.left) {
      this.left.remove(key);
    }
    else if(key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(BST) {
    if(this.parent) {
      if(this == this.parent.left) {
        this.parent.left = BST;
      }
      else if(this == this.parent.right) {
        this.parent.right = BST;
      }

      if(BST) {
        BST.parent = this.parent;
      }
    }
    else {
      if(BST) {
        this.key = BST.key;
        this.value = BST.value;
        this.left = BST.left;
        this.right = BST.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if(!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}


//================================================================

class BadBinarySearchTree {
    constructor(key = null, value = null, parent = null) {
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.left = null;
      this.right = null;
    }
  
    insert(key, value) {
      if(this.key == null) {
        this.key = key;
        this.value = value;
      }
      else if(key > this.key) {
        if(this.left == null) {
          this.left = new BadBinarySearchTree(key, value, this);
        }
        else {
          this.left.insert(key, value);
        }
      }
      else {
        if(this.right == null) {
          this.right = new BadBinarySearchTree(key, value, this);
        }
        else {
          this.right.insert(key, value);
        }
      }
    }
  
    find(key) {
      if(this.key == key) {
        return this.value;
      }
      else if(key < this.key && this.left) {
        return this.left.find(key);
      }
      else if(key > this.key && this.right) {
        return this.right.find(key);
      }
      else {
        throw new Error('Key Error');
      }
    }
  
    remove(key) {
      if(this.key == key) {
        if(this.left && this.right) {
          const successor = this.right._findMin();
          this.key = successor.key;
          this.value = successor.value;
          successor.remove(successor.key);
        }
        else if(this.left) {
          this._replaceWith(this.left);
        }
        else if(this.right) {
          this._replaceWith(this.right);
        }
        else {
          this._replaceWith(null);
        }
      }
      else if(key < this.key && this.left) {
        this.left.remove(key);
      }
      else if(key > this.key && this.right) {
        this.right.remove(key);
      }
      else {
        throw new Error('Key Error');
      }
    }
  
    _replaceWith(BST) {
      if(this.parent) {
        if(this == this.parent.left) {
          this.parent.left = BST;
        }
        else if(this == this.parent.right) {
          this.parent.right = BST;
        }
  
        if(BST) {
          BST.parent = this.parent;
        }
      }
      else {
        if(BST) {
          this.key = BST.key;
          this.value = BST.value;
          this.left = BST.left;
          this.right = BST.right;
        }
        else {
          this.key = null;
          this.value = null;
          this.left = null;
          this.right = null;
        }
      }
    }
  
    _findMin() {
      if(!this.left) {
        return this;
      }
      return this.left._findMin();
    }
}

//================================================================
// HELPER FUNCTION FOR balancedBST()
function findMinHeight(BST) {
    //   console.log(BST);
    if(BST === null) {
      return 0;
    } else if(!BST.left && !BST.right) {
        return 1;
    } else if(BST.left || BST.right) {
        return Math.min( (findTreeHeight(BST.left)) , (findTreeHeight(BST.right)) ) + 1;
    }
}

//================================================================
// HELPER FUNCTION FOR thirdLargest()
function _nthLargest(tree, state) { 
    //Finding the largest node means traversing the right first.
    if (tree.right) {
        _nthLargest(tree.right, state);
        if (state.result) return;
    }
    if (!--state.n) { 
        //Found it.
        state.result = tree.key; 
        return;
    }
    if (tree.left) _nthLargest(tree.left, state);
}


//================================================================
//Traverse down BST recursively until you find a BST with left and right equals null
//Each time we traverse down a level in the BST, increase a counter by 1 representing the height of the tree

function findTreeHeight(BST) {
//   console.log(BST);
  if(BST === null) {
    return 0;
  } else if(!BST.left && !BST.right) {
      return 1;
  } else if(BST.left || BST.right) {
      return Math.max( (findTreeHeight(BST.left)) , (findTreeHeight(BST.right)) ) + 1;
  }
}

//================================================================
function isBST(BST) {
  if(BST.left) {
    if(BST.left.key > BST.key) {
      return false;
    }
    if(!isBST(BST.left)) {
      return false;
    }
  }
  if(BST.right) {
    if(BST.right.key < BST.key) {
      return false;
    }
    if(!isBST(BST.right)) {
      return false;
    }
  }
  return true;
}


//================================================================
function thirdLargest(BST, nth) {
  if(BST.key == null) {
    return null;
  }
  let state = {n: nth, result: null};
  _nthLargest(BST, state);
  return state.result; 
}

//================================================================
// Find the largest node
// Find the smallest node
// compare their difference in height level and see if it's > 1
function balancedBST(BST) {
  let minLevels = findMinHeight(BST);
  let maxLevels = findTreeHeight(BST);

  if(maxLevels - minLevels > 1) {
    return false;
  } else {
    return true;
  }
}



//================================================================
function main() {
  let BST = new BinarySearchTree();
  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  BST.insert(9);
  BST.insert(2);
  BST.insert(5);
  BST.insert(7);

  

  let badBST = new BadBinarySearchTree();
  badBST.insert(3);
  badBST.insert(1);
  badBST.insert(4);
  badBST.insert(6);
  badBST.insert(9);
  badBST.insert(2);
  badBST.insert(5);
  badBST.insert(7);

//   console.log(BST.key);
//   console.log(BST.left);
//   console.log(findTreeHeight(BST));
//   console.log(badBST);
//   console.log(isBST(BST));
//   console.log(isBST(badBST));
//   console.log(thirdLargest(BST, 3));
//   console.log(findMinHeight(BST));
  console.log(balancedBST(BST));
}

main();