

var RealEstate_Token = artifacts.require('RealEstate_Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2]
    const account_four = accounts[3]
    const account_five = accounts[4]
    const account_six = accounts[5]

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await RealEstate_Token.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1, { from: account_one })
            await this.contract.mint(account_three, 2, { from: account_one })
            await this.contract.mint(account_four, 3, { from: account_one })
            await this.contract.mint(account_five, 4, { from: account_one })
            await this.contract.mint(account_two, 5, { from: account_one })
            await this.contract.mint(account_two, 6, { from: account_one })
            await this.contract.mint(account_two, 7, { from: account_one })
            await this.contract.mint(account_two, 8, { from: account_one })
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call()
            assert.equal(totalSupply, 8,`Total tokens should be 5`)
            
        })

        it('should get token balance', async function () { 
            let balance1 = await this.contract.balanceOf(account_three);
            let balance2 = await this.contract.balanceOf(account_two);

            assert.equal(balance1, 1, "the balance was not what was expected");
            assert.equal(balance2, 5, "the balance was not what was expected");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri1 = await this.contract.tokenURI.call(1);
            let uri2 = await this.contract.tokenURI.call(2);

            let baseUri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
            assert.equal(uri1,baseUri + "1", 'unexpected token uri');
            assert.equal(uri2,baseUri + "2", 'unexpected token uri');
        })

        it('should transfer token from one owner to another', async function () { 
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await RealEstate_Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 
            
        })

    });
})