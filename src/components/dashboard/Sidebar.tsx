import React from "react";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  User
} from "lucide-react";
import shopper from "@/assets/Loanshopper_Logo.png"; // Make sure the file path is correct

const menuItems = [
  // { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "profile", label: "Profile", icon: User },
  { id: "documents", label: "Documents", icon: FileText },
  // { id: "users", label: "Users", icon: Users },
  // { id: "analytics", label: "Analytics", icon: BarChart3 },
  // { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeItem, onItemClick }) => {
  return (
    <div className="h-100 bg-[#4e73df] text-white">
      <div className="p-3 border-bottom border-secondary flex justify-center">
        <img
          src={shopper}
          alt="LoanShopper Logo"
          style={{
            maxWidth: "150px",
            height: "auto",
            display: "block"
          }}
        />
      </div>

      <nav className="p-3">
        <ul className="nav nav-pills flex-column">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="nav-item mb-1">
                <button
                  onClick={() => onItemClick(item.id)}
                  className={`nav-link d-flex align-items-center w-100 text-start border-0 ${
                    activeItem === item.id
                      ? "active bg-primary text-white"
                      : "text-light bg-transparent"
                  }`}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Icon className="me-3" size={20} />
                  <span className="fw-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
