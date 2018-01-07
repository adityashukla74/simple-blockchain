var SHA256 = require("crypto-js/sha256");

/**
 * Each block ll have index, timestamp, data, previousHash
 * Index - where block sits on the chain.
 * Timestamp - when the block was created.
 * Data - whatever data you want to store in the block. Amount =10
 * previoushash contains the string of hash of previous block
 * @class Block
 */
class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash; //calculate hash of block
    }
    /**
     * Calculate hash function of the block by taking properties of the block in constructor
     * 
     * @returns 
     * @memberof Block
     */
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
/**
 * 
 * 
 * @class Blockchain
 */
class Blockchain {
    constructor() { //initialize blockchain
        this.chain = [this.createGenesBlock()];
    }
    /**
     * First block of blockchain will return index, date, some data "genesis block and previous hash"
     * @returns 
     * @memberof Blockchain
     */
    createGenesBlock() {
        return new Block(0, "04/01/2018", "genesis block", "0");
    }
/**
 * returns latest block in the chain, last element 
 * @returns     
 * @memberof Blockchain
 */
getLatestBlock() {
        return this.chain(this.chain.length - 1);
    }

    addLock(newBlock) {
        newBlock.previousHash = this.getLatestBlock.hash;
        newBlock.hash = newBlock.calculateHash(); //recalculate hash for the new changed block
        this.chain.push(newBlock);
    }
}

// Test the block
let myCoin = new Blockchain();
// add few blocks
myCoin.addLock(new Block(1, "05/01/2018", { amount: 10 }));
myCoin.addLock(new Block(2, "07/01/2018", { amount: 100 }));

console.log(JSON.stringify(myCoin, null, 4));

