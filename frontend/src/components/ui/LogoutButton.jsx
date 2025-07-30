import { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { useActiveAccount, useDisconnect } from "thirdweb/react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ 
  variant = "outline", 
  size = "default", 
  showUserInfo = true,
  redirectTo = "/",
  className = "" 
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Disconnect the wallet
      await disconnect();
      
      // Optional: Clear any local storage or session data
      // localStorage.removeItem('userPreferences');
      // sessionStorage.clear();
      
      // Show success message
      console.log("User logged out successfully");
      
      // Redirect to specified page
      if (redirectTo) {
        navigate(redirectTo);
      }
      
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Don't render if no account is connected
  if (!account) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showUserInfo && (
        <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>
            {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </span>
        </div>
      )}
      
      <Button
        variant={variant}
        size={size}
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex items-center space-x-2"
      >
        <LogOut className="h-4 w-4" />
        <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
      </Button>
    </div>
  );
}

// Alternative compact version for mobile/small spaces
export function CompactLogoutButton({ className = "" }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await disconnect();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!account) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`p-2 ${className}`}
      title="Logout"
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
}

// Dropdown version for navigation menus
export function DropdownLogoutButton({ onLogout }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await disconnect();
      
      // Call parent callback if provided
      if (onLogout) {
        onLogout();
      }
      
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!account) return null;

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
    >
      <LogOut className="mr-3 h-4 w-4" />
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}