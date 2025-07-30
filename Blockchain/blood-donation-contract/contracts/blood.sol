// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BloodShare {
    struct Donor {
        string name;
        uint8 age;
        string bloodGroup;
        string city;
        bool approved;
        address registeredBy;
    }

    address public admin;
    uint256 public totalDonors;

    Donor[] public donors;
    string[8] private validBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerDonor(
        string memory _name,
        uint8 _age,
        string memory _bloodGroup,
        string memory _city
    ) public {
        require(_age >= 18 && _age <= 65, "Age must be between 18 and 65");
        require(isValidBloodGroup(_bloodGroup), "Invalid blood group");

        donors.push(Donor({
            name: _name,
            age: _age,
            bloodGroup: _bloodGroup,
            city: _city,
            approved: false,
            registeredBy: msg.sender
        }));

        totalDonors++;
    }

    function isValidBloodGroup(string memory _bloodGroup) internal view returns (bool) {
        for (uint8 i = 0; i < validBloodGroups.length; i++) {
            if (keccak256(bytes(validBloodGroups[i])) == keccak256(bytes(_bloodGroup))) {
                return true;
            }
        }
        return false;
    }

    function approveDonor(address donorAddress) public onlyAdmin {
        bool found = false;
        for (uint256 i = 0; i < donors.length; i++) {
            if (donors[i].registeredBy == donorAddress && !donors[i].approved) {
                donors[i].approved = true;
                found = true;
                break;
            }
        }
        require(found, "Donor not found or already approved");
    }

    function getDonorList() public view returns (Donor[] memory) {
        return donors;
    }

    function getMyRegisteredDonors() public view returns (Donor[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < donors.length; i++) {
            if (donors[i].registeredBy == msg.sender) {
                count++;
            }
        }

        Donor[] memory myDonors = new Donor[](count);
        uint256 idx = 0;
        for (uint256 i = 0; i < donors.length; i++) {
            if (donors[i].registeredBy == msg.sender) {
                myDonors[idx] = donors[i];
                idx++;
            }
        }

        return myDonors;
    }

    function getApprovedDonors() public view returns (Donor[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < donors.length; i++) {
            if (donors[i].approved) {
                count++;
            }
        }

        Donor[] memory approvedDonors = new Donor[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < donors.length; i++) {
            if (donors[i].approved) {
                approvedDonors[index] = donors[i];
                index++;
            }
        }

        return approvedDonors;
    }
}
