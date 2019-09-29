const Verifier = artifacts.require('SquareVerifier')
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier')

const proof = require('../zokrates/code/square/proof')


contract('TestSolnSquareVerifier', accounts => {
    const account_one = accounts[0]
    const account_two = accounts[1]
 
    beforeEach(async function () {
        const verifier = await Verifier.new({ from: account_one })
        this.contract = await SolnSquareVerifier.new(verifier.address, {from: account_one})
    })
    
    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('Checks that a new solution can be minted using a testkey input', async function () {
        let testVal = true
        try {
            // get a byte32 type key
            let testKey = "0xf3e923CFB0568B640E1BDb8b00213268cEa9320f";
            await this.contract.addSolution(2, account_two, testKey);
        } catch (e) {
            //console.log(e);
            testVal = false
        }
        assert.equal(testVal, true, 'Solution must be added')
    })

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('Checks to make sure a new token can be minted', async function () {
        let testVal2 = true
        try {
            await this.contract.mintNewToken(5, account_two, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs,{ from: account_one })
        } catch (e) {
            //console.log(e);
            testVal2 = false
        }

        assert.equal(testVal2, true, 'Token must be created')
    })

    it('Cannot mint with incorrect proof', async function () {
        let testVal3 = true
        try {
            const input = ['0x0000000000000000000000000000000000000000000000000000000000012345','0x0000000000000000000000000000000000000000000000000000000000067891']
            await this.contract.mintToken(account_two,2,proof.proof.a,proof.proof.b,proof.proof.c,input,{ from: account_one })
        } catch (e) {
            testVal3 = false
        }

        assert.equal(testVal3, false, 'Token should not exist')
    })





})