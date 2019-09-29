pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./ZokratesVerifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {

}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is RealEstate_Token {
    SquareVerifier public verifier;

    constructor(address verifierAddress) RealEstate_Token() public {
        verifier = SquareVerifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solutions {
        uint256 tokenId;
        address owner;
    }

    // TODO define an array of the above struct
    Solutions[] solutionsList;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solutions) private uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 tokenId, address Owner);



    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint256 _tokenId, address _owner, bytes32 _key) public {
        Solutions memory temp_solution = Solutions({tokenId: _tokenId, owner: _owner});
        solutionsList.push(temp_solution);
        uniqueSolutions[_key] = temp_solution;
        emit SolutionAdded(_tokenId, _owner);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNewToken(uint _tokenId, address _owner, uint[2] memory _a, uint[2][2] memory _b,uint[2] memory _c, uint[2] memory _input) public
    {
        bytes32 key = keccak256(abi.encodePacked(_a, _b, _c, _input));

        require(uniqueSolutions[key].owner == address(0), "Solution already exists");
        require(verifier.verifyTx(_a, _b, _c, _input), "Solution failed");

        addSolution(_tokenId, _owner, key);
        super.mint(_owner, _tokenId);
    }
}
  


























