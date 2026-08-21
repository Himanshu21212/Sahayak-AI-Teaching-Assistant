// import { useAuth } from '@/context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { GraduationCap, LogOut } from 'lucide-react';
// import { toast } from 'sonner';

// const Navbar = () => {
//   const { teacher, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     toast.success('Logged out successfully');
//     navigate('/login');
//   };

//   return (
//     <nav className="sticky top-0 z-50 border-b bg-card shadow-sm">
//       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
//             <GraduationCap className="h-6 w-6 text-primary-foreground" />
//           </div>
//           <span className="text-xl font-bold text-foreground">Sahayak</span>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="hidden md:flex flex-col items-end">
//             <span className="text-sm font-medium text-foreground">{teacher?.name}</span>
//             <span className="text-xs text-muted-foreground">{teacher?.school}</span>
//           </div>
          
//           <Avatar className="h-9 w-9 border-2 border-primary/20">
//             <AvatarFallback className="bg-primary/10 text-primary font-semibold">
//               {teacher?.name.charAt(0).toUpperCase()}
//             </AvatarFallback>
//           </Avatar>

//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleLogout}
//             className="gap-2"
//           >
//             <LogOut className="h-4 w-4" />
//             <span className="hidden md:inline">Logout</span>
//           </Button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar.tsx
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  User,
  Key,
  Settings,
  ChevronDown,
  HelpCircle,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/Gemini_Generated_Image_qymyvnqymyvnqymy.png"; // 👈 Add your uploaded logo path

const Navbar: React.FC = () => {
  const { teacher, logout } = useAuth() as any;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (btnRef.current && btnRef.current.contains(e.target as Node)) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
      toast.error("Logout failed");
    } finally {
      setOpen(false);
    }
  };

  const items = [
    { id: "profile", label: "Your profile", icon: <User className="w-4 h-4" />, action: () => navigate("/profile") },
    { id: "change_password", label: "Change password", icon: <Key className="w-4 h-4" />, action: () => navigate("/change-password") },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" />, action: () => navigate("/settings") },
    { id: "helps", label: "Helps", icon: <HelpCircle className="w-4 h-4" />, action: () => navigate("/help") },
    { id: "feedback", label: "Give feedbacks", icon: <Star className="w-4 h-4" />, action: () => navigate("/feedback") },
  ];

  const initials = teacher?.name
    ? teacher.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : "T";

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-md shadow-sm">
      <style>{`
        /* Animated gradient headline for Sahayak */
        @keyframes gradShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .brand-gradient {
          background: linear-gradient(90deg, #7c3aed, #2563eb, #06b6d4);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradShift 6s ease infinite;
          font-weight: 900;
          letter-spacing: -0.01em;
        }
      `}</style>

      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="relative h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center overflow-hidden shadow-md">
              <img
                src={Logo}
                alt="Sahayak AI Logo"
                className="object-cover w-full h-full scale-110"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <div className="brand-gradient text-lg md:text-xl">Sahayak</div>
              <div className="text-xs text-muted-foreground">AI Teaching Assistant</div>
            </div>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-sm font-medium text-foreground">{teacher?.name}</span>
          </div>

          <div className="relative">
            <button
              ref={btnRef}
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="flex items-center gap-2 rounded-full p-1.5 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              title="Account"
            >
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className={`w-4 h-4 text-foreground transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {open && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 8, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 700, damping: 35 }}
                  className="absolute right-0 mt-2 w-56 bg-card/95 backdrop-blur-md border border-border shadow-xl rounded-xl z-50 overflow-hidden"
                  style={{ transformOrigin: "top right" }}
                >
                  <div className="py-2">
                    {items.map((it) => (
                      <button
                        key={it.id}
                        onClick={() => {
                          it.action();
                          setOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-primary/5 transition-colors text-foreground"
                      >
                        <span className="text-slate-500">{it.icon}</span>
                        <span className="text-sm font-medium">{it.label}</span>
                      </button>
                    ))}

                    <div className="border-t border-border my-1" />

                    <div className="px-3 py-2 flex flex-col gap-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md bg-gradient-to-r from-primary to-blue-600 text-white font-semibold hover:opacity-95 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Compact logout on mobile */}
          <div className="md:hidden">
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
