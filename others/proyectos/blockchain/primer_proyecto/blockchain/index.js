const Block = require('./block');
class Blockchain{

    constructor(){
        this.chain = [Block.genesis()]; 
    }

    addBlock(data){
        const block = Block.mineBlock(
             this.chain[this.chain.length-1],data);
        this.chain.push(block);
        return block;
    }

    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== 
        JSON.stringify(Block.genesis()))
        {
            return false;
        }

        for(let k=1; k < chain.length; k ++){
                const block = chain[k];
                const lastblock = chain[k-1];
                if(block.lastHash !== lastblock.hash || block.hash !== Block.blockHash(block)){
            return false;
        }
        }
        return true;
    }

   

    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
          console.log('La cadena recibida no es mas larga que la que tengo');
          return;
        } else if (!this.isValidChain(newChain)) {
          console.log('La cadena recibida no es válida');
          return;
        }
      
        console.log('Reemplazando la nueva cadena a mi cadena local');
        this.chain = newChain;
      }




}
module.exports = Blockchain;