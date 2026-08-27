import { useState } from "react";
import Dashboard from "../pages/Dashboard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    LayoutDashboard,
    Layers,
    Receipt,
    LogOut,
    Menu,
    X,
    Wallet
} from "lucide-react";

const NAV_LINKS = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/categories", label: "Categories", icon: Layers },
    { to: "/expenses", label: "Expenses", icon: Receipt },
];

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const isActive = (to) =>
        location.pathname === to || location.pathname.startsWith(`${to}/`);

    const handleLogout = async () => {
        setMobileOpen(false);
        await logout();
        navigate("/login", { replace: true });
    };

    const linkClasses = (to) =>
        `inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isActive(to)
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`;

    const mobileLinkClasses = (to) =>
        `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive(to)
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`;

    return (
        <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg"
                >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white">
                        <Wallet className="w-4 h-4" />
                    </span>
                    <span className="text-base font-semibold tracking-tight">
                        Expense Tracker
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className={linkClasses(to)}
                            aria-current={isActive(to) ? "page" : undefined}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Desktop right side */}
                <div className="hidden md:flex items-center gap-4">
                    {user?.username && (
                        <span className="text-sm text-slate-500">
                            {user.username}
                        </span>
                    )}
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>

                {/* Mobile menu toggle */}
                <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu panel */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
                    {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setMobileOpen(false)}
                            className={mobileLinkClasses(to)}
                            aria-current={isActive(to) ? "page" : undefined}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    ))}

                    <div className="pt-2 mt-2 border-t border-slate-100">
                        {user?.username && (
                            <p className="px-3.5 pb-2 text-sm text-slate-500">
                                {user.username}
                            </p>
                        )}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;