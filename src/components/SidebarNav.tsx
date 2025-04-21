
import { Home, User, Users, Book, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/doctor-register", label: "Register Doctor", icon: User },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/patient-history", label: "Patient History", icon: Book },
];

export default function SidebarNav() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <aside
      className="bg-white shadow-md h-screen w-56 flex flex-col border-r border-gray-200"
      aria-label="Sidebar"
    >
      <div className="flex-grow py-6">
        <nav>
          <ul className="space-y-2">
            {nav.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-md hover:bg-blue-50 text-gray-700 transition-colors",
                    location.pathname === to && "bg-blue-100 font-semibold"
                  )}
                >
                  <Icon className="mr-3 w-5 h-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button
        className="mx-4 mb-6 flex items-center px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 mr-2" />
        Log out
      </button>
    </aside>
  );
}
