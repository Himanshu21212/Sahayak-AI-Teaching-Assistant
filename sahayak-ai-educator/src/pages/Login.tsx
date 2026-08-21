// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { GraduationCap } from "lucide-react";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (email && password) {
//       toast.success("Welcome back, Teacher!");
//       setTimeout(() => {
//         navigate("/dashboard/generate");
//       }, 500);
//     } else {
//       toast.error("Please fill in all fields");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(208,25%,98%)] to-[hsl(204,100%,94%)] p-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="space-y-4 text-center">
//           <div className="flex justify-center">
//             <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
//               <GraduationCap className="h-8 w-8 text-primary" />
//             </div>
//           </div>
//           <CardTitle className="text-2xl font-bold">Welcome to Sahayak</CardTitle>
//           <CardDescription className="text-base">
//             AI Teaching Assistant — Login to your teacher dashboard
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="teacher@school.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="h-11"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="h-11"
//               />
//             </div>
//             <Button type="submit" className="w-full h-11 bg-gradient-to-r from-[hsl(221,83%,60%)] to-[hsl(221,83%,53%)] hover:opacity-90 transition-opacity">
//               Login
//             </Button>
//             <p className="text-center text-sm text-muted-foreground">
//               Don't have an account?{" "}
//               <a href="#" className="text-primary hover:underline font-medium">
//                 Sign Up
//               </a>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;


// Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GraduationCap } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast.success("Welcome back, Teacher!");
      setTimeout(() => navigate("/dashboard/generate"), 500);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(208,25%,98%)] to-[hsl(204,100%,94%)] p-6">
      <style>{`
        .auth-card {
          width: 380px;
          max-width: 94vw;
          border-radius: 14px;
          border: 2px solid #e6e9ef;
          box-shadow: 8px 8px rgba(50,50,50,0.08);
          background: linear-gradient(180deg, rgba(255,255,255,0.92), rgba(250,250,252,0.92));
          padding: 28px;
        }
        .logo-wrap { width:76px; height:76px; border-radius:999px; background: rgba(37,99,235,0.08); display:flex; align-items:center; justify-content:center; margin: 0 auto 10px; box-shadow: inset 0 -6px 12px rgba(0,0,0,0.03); transition: transform .25s ease; }
        .logo-wrap:hover { transform: translateY(-4px) rotate(-6deg); }
        .gradient-title {
          background: linear-gradient(90deg,#2563eb,#06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: 20px;
        }
        .subline {
          color: #475569;
          font-weight: 600;
          margin-top: 6px;
          text-align: center;
          font-size: 13px;
        }
        .form-row { display:flex; flex-direction:column; gap:12px; margin-top:16px; align-items:center; }
        .auth-input { width: 300px; max-width:88%; height:44px; border-radius:10px; border:2px solid #333; background:#fff; box-shadow:4px 4px #333; padding:8px 12px; font-weight:600; }
        .auth-input:focus { outline: none; border-color: #2d8cf0; box-shadow: 0 0 0 6px rgba(45,140,240,0.06); }
        .auth-btn { width:160px; height:44px; border-radius:10px; border:2px solid #323232; background: linear-gradient(90deg,#2563eb,#1e40af); color:white; font-weight:800; box-shadow:4px 4px #323232; cursor:pointer; }
        .muted { color:#64748b; font-size:13px; text-align:center; margin-top:10px; }
        @media (max-width:420px) {
          .auth-input { width:220px; }
          .auth-card { padding:20px; }
        }
      `}</style>

      <div className="auth-card">
        <div className="logo-wrap" aria-hidden>
          <GraduationCap className="w-6 h-6 text-primary" />
        </div>

        {/* Decorative headline (exact sentence included once) */}
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <div className="gradient-title">Welcome to Sahayak</div>
          <div className="subline">AI Teaching Assistant — Your classroom companion</div>
        </div>

        {/* Form (no duplicate sentence inside card) */}
        <form onSubmit={handleLogin} className="form-row" aria-label="login form">
          <input
            className="auth-input"
            placeholder="teacher@school.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-btn">Let&apos;s go!</button>

          <div className="muted">
            Don&apos;t have an account?{" "}
            <a href="/signup" style={{ color: "#2563eb", fontWeight: 800 }}>Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
