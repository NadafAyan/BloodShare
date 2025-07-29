// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title DonorRegistration
 * @notice Contract for managing blood donor registration and directory
 * @dev Handles donor registration, prevents duplicates, and provides filtering capabilities
 */
contract DonorRegistration {
    // ========== STATE VARIABLES ==========
    
    /// @notice Total number of registered donors
    uint256 public totalDonors;
    
    /// @notice Contract owner for administrative functions
    address public owner;
    
    // ========== ENUMS ==========
    
    /// @notice Blood group enumeration for type safety
    enum BloodGroup {
        A_POSITIVE,    // 0
        A_NEGATIVE,    // 1
        B_POSITIVE,    // 2
        B_NEGATIVE,    // 3
        AB_POSITIVE,   // 4
        AB_NEGATIVE,   // 5
        O_POSITIVE,    // 6
        O_NEGATIVE     // 7
    }
    
    // ========== STRUCTS ==========
    
    /// @notice Donor information structure
    struct Donor {
        uint256 id;
        string fullName;
        uint256 age;
        string email;
        string phoneNumber;
        BloodGroup bloodGroup;
        string city;
        string donorAddress;
        string emergencyContact;
        string medicalConditions;
        bool availableForEmergency;
        uint256 registrationTimestamp;
        bool isActive;
        address walletAddress;
    }
    
    // ========== MAPPINGS ==========
    
    /// @notice Mapping from donor ID to donor information
    mapping(uint256 => Donor) public donors;
    
    /// @notice Mapping to prevent duplicate registrations by wallet address
    mapping(address => bool) public isRegistered;
    
    /// @notice Mapping from wallet address to donor ID
    mapping(address => uint256) public donorIdByAddress;
    
    /// @notice Mapping from email to prevent duplicate emails
    mapping(string => bool) public emailExists;
    
    // ========== EVENTS ==========
    
    /// @notice Emitted when a new donor is registered
    event DonorRegistered(
        uint256 indexed donorId,
        address indexed walletAddress,
        string fullName,
        BloodGroup bloodGroup,
        string city,
        bool availableForEmergency
    );
    
    /// @notice Emitted when donor updates their availability
    event DonorAvailabilityUpdated(
        uint256 indexed donorId,
        bool availableForEmergency
    );
    
    /// @notice Emitted when donor deactivates their profile
    event DonorDeactivated(uint256 indexed donorId);
    
    // ========== MODIFIERS ==========
    
    /// @notice Ensures caller is the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    /// @notice Ensures donor is not already registered
    modifier notRegistered() {
        require(!isRegistered[msg.sender], "Address already registered");
        _;
    }
    
    /// @notice Ensures donor is already registered
    modifier onlyRegisteredDonor() {
        require(isRegistered[msg.sender], "Address not registered");
        _;
    }
    
    /// @notice Validates donor registration input
    modifier validDonorInput(
        string memory _fullName,
        uint256 _age,
        string memory _email,
        string memory _phoneNumber,
        string memory _city,
        string memory _donorAddress
    ) {
        require(bytes(_fullName).length > 0, "Full name cannot be empty");
        require(_age >= 18 && _age <= 65, "Age must be between 18 and 65");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(bytes(_phoneNumber).length > 0, "Phone number cannot be empty");
        require(bytes(_city).length > 0, "City cannot be empty");
        require(bytes(_donorAddress).length > 0, "Address cannot be empty");
        require(!emailExists[_email], "Email already registered");
        _;
    }
    
    // ========== CONSTRUCTOR ==========
    
    /// @notice Initialize the contract with owner
    constructor() {
        owner = msg.sender;
        totalDonors = 0;
    }
    
    // ========== EXTERNAL FUNCTIONS ==========
    
    /**
     * @notice Register a new blood donor
     * @param _fullName Full name of the donor
     * @param _age Age of the donor (must be 18-65)
     * @param _email Email address of the donor
     * @param _phoneNumber Phone number of the donor
     * @param _bloodGroup Blood group (enum value 0-7)
     * @param _city City where donor resides
     * @param _donorAddress Physical address of the donor
     * @param _emergencyContact Emergency contact information
     * @param _medicalConditions Any medical conditions (can be empty)
     * @param _availableForEmergency Whether donor is available for emergency requests
     */
    function registerDonor(
        string memory _fullName,
        uint256 _age,
        string memory _email,
        string memory _phoneNumber,
        BloodGroup _bloodGroup,
        string memory _city,
        string memory _donorAddress,
        string memory _emergencyContact,
        string memory _medicalConditions,
        bool _availableForEmergency
    ) external 
        notRegistered 
        validDonorInput(_fullName, _age, _email, _phoneNumber, _city, _donorAddress) 
    {
        // Increment total donors and use as ID
        totalDonors++;
        uint256 donorId = totalDonors;
        
        // Create donor struct
        donors[donorId] = Donor({
            id: donorId,
            fullName: _fullName,
            age: _age,
            email: _email,
            phoneNumber: _phoneNumber,
            bloodGroup: _bloodGroup,
            city: _city,
            donorAddress: _donorAddress,
            emergencyContact: _emergencyContact,
            medicalConditions: _medicalConditions,
            availableForEmergency: _availableForEmergency,
            registrationTimestamp: block.timestamp,
            isActive: true,
            walletAddress: msg.sender
        });
        
        // Update mappings
        isRegistered[msg.sender] = true;
        donorIdByAddress[msg.sender] = donorId;
        emailExists[_email] = true;
        
        // Emit event
        emit DonorRegistered(
            donorId,
            msg.sender,
            _fullName,
            _bloodGroup,
            _city,
            _availableForEmergency
        );
    }
    
    /**
     * @notice Update donor's emergency availability status
     * @param _available New availability status
     */
    function updateAvailability(bool _available) external onlyRegisteredDonor {
        uint256 donorId = donorIdByAddress[msg.sender];
        require(donors[donorId].isActive, "Donor profile is deactivated");
        
        donors[donorId].availableForEmergency = _available;
        
        emit DonorAvailabilityUpdated(donorId, _available);
    }
    
    /**
     * @notice Deactivate donor profile
     */
    function deactivateDonor() external onlyRegisteredDonor {
        uint256 donorId = donorIdByAddress[msg.sender];
        require(donors[donorId].isActive, "Donor already deactivated");
        
        donors[donorId].isActive = false;
        
        emit DonorDeactivated(donorId);
    }
    
    // ========== VIEW FUNCTIONS ==========
    
    /**
     * @notice Get all registered donors
     * @return Array of all donor structs
     */
    function getAllDonors() external view returns (Donor[] memory) {
        Donor[] memory allDonors = new Donor[](totalDonors);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= totalDonors; i++) {
            if (donors[i].isActive) {
                allDonors[currentIndex] = donors[i];
                currentIndex++;
            }
        }
        
        // Create array with only active donors
        Donor[] memory activeDonors = new Donor[](currentIndex);
        for (uint256 i = 0; i < currentIndex; i++) {
            activeDonors[i] = allDonors[i];
        }
        
        return activeDonors;
    }
    
    /**
     * @notice Get donors filtered by blood group
     * @param _bloodGroup Blood group to filter by
     * @return Array of donors with matching blood group
     */
    function getDonorsByBloodGroup(BloodGroup _bloodGroup) external view returns (Donor[] memory) {
        // First pass: count matching donors
        uint256 matchingCount = 0;
        for (uint256 i = 1; i <= totalDonors; i++) {
            if (donors[i].isActive && donors[i].bloodGroup == _bloodGroup) {
                matchingCount++;
            }
        }
        
        // Second pass: populate array
        Donor[] memory matchingDonors = new Donor[](matchingCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= totalDonors; i++) {
            if (donors[i].isActive && donors[i].bloodGroup == _bloodGroup) {
                matchingDonors[currentIndex] = donors[i];
                currentIndex++;
            }
        }
        
        return matchingDonors;
    }
    
    /**
     * @notice Get donors filtered by city
     * @param _city City to filter by
     * @return Array of donors in the specified city
     */
    function getDonorsByCity(string memory _city) external view returns (Donor[] memory) {
        // First pass: count matching donors
        uint256 matchingCount = 0;
        for (uint256 i = 1; i <= totalDonors; i++) {
            if (donors[i].isActive && 
                keccak256(abi.encodePacked(donors[i].city)) == keccak256(abi.encodePacked(_city))) {
                matchingCount++;
            }
        }
        
        // Second pass: populate array
        Donor[] memory matchingDonors = new Donor[](matchingCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= totalDonors; i++) {
            if (donors[i].isActive && 
                keccak256(abi.encodePacked(donors[i].city)) == keccak256(abi.encodePacked(_city))) {
                matchingDonors[currentIndex] = donors[i];
                currentIndex++;
            }
        }
        
        return matchingDonors;
    }
    
    /**
     * @notice Get donors available for emergency requests
     * @return Array of donors available for emergency
     */
    function getAvailableEmergencyDonors() external view returns (Donor[] memory) {
        // First pass: count available donors
        uint256 availableCount = 0;
        for (uint256 i = 1; i <= totalDonors; i++) {
            if (donors[i].isActive && donors[i].availableForEmergency) {
                availableCount++;
            }
        }
        
        // Second pass: populate array
        Donor[] memory availableDonors = new Donor[](availableCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= totalDonors; i++) {
            if (donors[i].isActive && donors[i].availableForEmergency) {
                availableDonors[currentIndex] = donors[i];
                currentIndex++;
            }
        }
        
        return availableDonors;
    }
    
    /**
     * @notice Get donor information by ID
     * @param _donorId ID of the donor
     * @return Donor struct
     */
    function getDonorById(uint256 _donorId) external view returns (Donor memory) {
        require(_donorId > 0 && _donorId <= totalDonors, "Invalid donor ID");
        require(donors[_donorId].isActive, "Donor profile deactivated");
        
        return donors[_donorId];
    }
    
    /**
     * @notice Get caller's donor information
     * @return Donor struct for the caller
     */
    function getMyDonorInfo() external view onlyRegisteredDonor returns (Donor memory) {
        uint256 donorId = donorIdByAddress[msg.sender];
        return donors[donorId];
    }
    
    /**
     * @notice Convert blood group enum to string
     * @param _bloodGroup Blood group enum
     * @return String representation of blood group
     */
    function bloodGroupToString(BloodGroup _bloodGroup) external pure returns (string memory) {
        if (_bloodGroup == BloodGroup.A_POSITIVE) return "A+";
        if (_bloodGroup == BloodGroup.A_NEGATIVE) return "A-";
        if (_bloodGroup == BloodGroup.B_POSITIVE) return "B+";
        if (_bloodGroup == BloodGroup.B_NEGATIVE) return "B-";
        if (_bloodGroup == BloodGroup.AB_POSITIVE) return "AB+";
        if (_bloodGroup == BloodGroup.AB_NEGATIVE) return "AB-";
        if (_bloodGroup == BloodGroup.O_POSITIVE) return "O+";
        if (_bloodGroup == BloodGroup.O_NEGATIVE) return "O-";
        
        return "Unknown";
    }
    
    // ========== ADMIN FUNCTIONS ==========
    
    /**
     * @notice Emergency function to deactivate a donor (admin only)
     * @param _donorId ID of the donor to deactivate
     */
    function adminDeactivateDonor(uint256 _donorId) external onlyOwner {
        require(_donorId > 0 && _donorId <= totalDonors, "Invalid donor ID");
        require(donors[_donorId].isActive, "Donor already deactivated");
        
        donors[_donorId].isActive = false;
        
        emit DonorDeactivated(_donorId);
    }
    
    /**
     * @notice Transfer ownership of the contract
     * @param _newOwner Address of the new owner
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "New owner cannot be zero address");
        owner = _newOwner;
    }
}