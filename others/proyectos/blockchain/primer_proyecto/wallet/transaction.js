const ChainUtil = require('../chain-util');

class Transaction {
    constructor() {
      this.id = ChainUtil.id();
      this.input = null;
      this.outputs = [];
    }
  
    static newTransaction(senderWallet, recipient, amount) {
      if (amount > senderWallet.balance) {
        console.log(`Monto: ${amount} excede el estado de cuenta.`);
        return;
      }
  
      const transaction = new this();
  
      transaction.outputs.push(...[
        { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
        { amount, address: recipient }
      ]);
  
      return transaction;
    }
  }
  
  module.exports = Transaction;