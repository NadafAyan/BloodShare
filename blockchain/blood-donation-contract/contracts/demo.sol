// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DonorRegistry {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    struct Donor {
        string name;
        string bloodGroup;
        bool isVerified;
        bool exists;
    }

    mapping(address => Donor) public donors;

    /// @notice Event for registration
    event DonorRegistered(address donor);
    event DonorVerified(address donor);
    event NameUpdated(address donor, string newName);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can do this");
        _;
    }

    modifier onlyRegistered() {
        require(donors[msg.sender].exists, "You are not registered");
        _;
    }

    // 📥 Register new donor (initially unverified)
    function registerDonor(string memory _name) external {
        require(!donors[msg.sender].exists, "Already registered");
        donors[msg.sender] = Donor({
            name: _name,
            bloodGroup: "",
            isVerified: false,
            exists: true
        });
        emit DonorRegistered(msg.sender);
    }

    // 🔐 Admin verifies donor after KYC and sets blood group
    function verifyDonor(address _donor, string memory _bloodGroup) external onlyAdmin {
        require(donors[_donor].exists, "Donor not found");
        donors[_donor].bloodGroup = _bloodGroup;
        donors[_donor].isVerified = true;
        emit DonorVerified(_donor);
    }

    // ✏️ Donor can update their name
    function updateName(string memory _newName) external onlyRegistered {
        donors[msg.sender].name = _newName;
        emit NameUpdated(msg.sender, _newName);
    }

    // 🔍 Fetch donor data
    function getDonor(address _donor) external view returns (string memory, string memory, bool) {
        require(donors[_donor].exists, "Donor not found");
        Donor memory d = donors[_donor];
        return (d.name, d.bloodGroup, d.isVerified);
    }
}
