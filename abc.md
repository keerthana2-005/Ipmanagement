import React, { useState, useEffect } from 'react';
import { Wallet, Users, CheckCircle } from 'lucide-react';

// Directly include the `cn` function
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Mock user data and connect function
const mockUser = {
    name: "blockchain_creator",
    username: "blockchain_creator", // Add username property here
    isConnected: false,
    address: null,
    bio: "Intellectual Property Creator and Manager"
};

const connectWallet = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ address: "0x1234567890abcdef..." });
        }, 1500);
    });
};

const UserDetails = () => {
    const [user, setUser] = useState(mockUser);
    const [isLoading, setIsLoading] = useState(false);
    const [showFullAddress, setShowFullAddress] = useState(false);

    const handleConnectWallet = async () => {
        setIsLoading(true);
        try {
            const { address: connectedAddress } = await connectWallet();
            const username = "blockchain_creator"; // This is hardcoded for now; update as needed.

            setUser((prevUser) => ({
                ...prevUser,
                isConnected: true,
                address: connectedAddress,
                username: username // Store username when connected
            }));

            // Store wallet data (address and username) in localStorage
            localStorage.setItem('walletAddress', connectedAddress);
            localStorage.setItem('username', username);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const storedAddress = localStorage.getItem('walletAddress');
        const storedUsername = localStorage.getItem('username');

        // If data is stored in localStorage, update the state
        if (storedAddress && storedUsername) {
            setUser((prevUser) => ({
                ...prevUser,
                isConnected: true,
                address: storedAddress,
                username: storedUsername // Retrieve username from localStorage
            }));
        }
    }, []);

    const toggleAddressDisplay = () => {
        setShowFullAddress(!showFullAddress);
    };

    return (
        <div style={{ ...styles.container, width: '100%' }}>
            <div style={styles.userSection}>
                <div style={styles.userAvatar}>
                    <Users style={{ ...styles.userIcon, color: '#fff' }} size={48} />
                </div>
                <div style={styles.userInfo}>
                    <h1 style={{ ...styles.userName, color: '#fff' }}>
                        {user.username} {/* Display username here */}
                    </h1>
                    <p style={{ ...styles.userBio, color: '#d1d5db' }}>{user.bio}</p>
                    {user.isConnected && user.address && (
                        <div style={styles.addressContainer} onClick={toggleAddressDisplay} title="Click to show/hide full address">
                            <span style={{ ...styles.walletLabel, color: '#9ca3af' }}>Wallet Address: </span>
                            <span style={{ ...styles.walletAddress, color: '#fff' }}>
                                {showFullAddress ? user.address : `${user.address.substring(0, 6)}...${user.address.substring(user.address.length - 4)}`}
                            </span>
                            <CheckCircle style={{ ...styles.checkCircle, color: '#fff' }} />
                        </div>
                    )}
                </div>
            </div>

            {!user.isConnected && (
                <button
                    onClick={handleConnectWallet}
                    disabled={isLoading}
                    className={cn(
                        "w-auto",
                        "bg-gradient-to-r from-black to-black",
                        "text-white",
                        "px-4 py-2",
                        "rounded-md",
                        "shadow-lg",
                        "transition-all duration-200",
                        "font-semibold text-sm",
                        "hover:from-gray-800 hover:to-gray-800",
                        "hover:scale-103",
                        "hover:shadow-xl",
                        "active:scale-98",
                        "active:shadow-sm",
                        "flex items-center justify-center gap-2 border border-gray-700"
                    )}
                >
                    <Wallet className="w-4 h-4 text-white" />
                    {isLoading ? "Connecting..." : "Connect Metamask"}
                </button>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2.5rem',
        backgroundColor: '#000',
        borderRadius: '1.25rem',
        boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.4)',
        width: '100%',
        margin: '0 auto',
        transition: 'all 0.3s ease',
        border: '1px solid #374151',
        boxSizing: 'border-box'
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        marginBottom: '2.5rem',
        width: '100%',
        textAlign: 'left',
        flexDirection: 'column',
        boxSizing: 'border-box',
    },
    userAvatar: {
        width: '7rem',
        height: '7rem',
        borderRadius: '9999px',
        backgroundColor: '#242424',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
        border: '3px solid #4a5568',
        transition: 'all 0.2s ease',
    },
    userIcon: {
        color: '#fff',
        width: '3.5rem',
        height: '3.5rem',
        filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4))'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.75rem',
        width: '100%',
        boxSizing: 'border-box',
    },
    userName: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '0.5rem',
        textShadow: '2px 3px 5px rgba(0, 0, 0, 0.8)',
        letterSpacing: '-0.02em'
    },
    userBio: {
        fontSize: '1.1rem',
        color: '#d1d5db',
        opacity: 0.9,
        marginBottom: '1.25rem',
        lineHeight: '1.7',
    },
    walletAddress: {
        fontSize: '0.95rem',
        color: '#fff',
        wordBreak: 'break-all',
        opacity: 0.8,
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        cursor: 'pointer',
        padding: '0.375rem',
        borderRadius: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid #4a5568',
    },
    walletLabel: {
        fontSize: '0.95rem',
        color: '#9ca3af',
        marginRight: '0.375rem',
        fontWeight: 'medium'
    },
    addressContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '0.75rem',
        width: 'fit-content',
        backgroundColor: '#374151',
        border: '1px solid #4a5568'
    },
    checkCircle: {
        color: '#fff',
        width: '1.25rem',
        height: '1.25rem',
        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))'
    },
};

export default UserDetails;
