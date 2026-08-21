// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { GraduationCap } from 'lucide-react';
// import { toast } from 'sonner';
// import { api } from '@/services/api';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [loginData, setLoginData] = useState({ email: '', password: '' });
//   const [registerData, setRegisterData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     school: '',
//     location: '',
//   });
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!loginData.email || !loginData.password) {
//       toast.error('Please fill all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await api.login(loginData);
//       login(response.token, response.teacher);
//       toast.success('Welcome back, Teacher!');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error('Login failed. Please check your credentials.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (Object.values(registerData).some((v) => !v)) {
//       toast.error('Please fill all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await api.register(registerData);
//       login(response.token, response.teacher);
//       toast.success('Registration successful! Welcome to Sahayak!');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error('Registration failed. Please try again.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4">
//       <Card className="w-full max-w-md shadow-xl">
//         <CardHeader className="space-y-4 text-center">
//           <div className="flex justify-center">
//             <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
//               <GraduationCap className="h-8 w-8 text-primary" />
//             </div>
//           </div>
//           <CardTitle className="text-2xl font-bold">Welcome to Sahayak</CardTitle>
//           <CardDescription className="text-base">
//             AI Teaching Assistant — Your classroom companion
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="login" className="w-full">
//             <TabsList className="grid w-full grid-cols-2 mb-6">
//               <TabsTrigger value="login">Login</TabsTrigger>
//               <TabsTrigger value="register">Register</TabsTrigger>
//             </TabsList>

//             <TabsContent value="login">
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="login-email">Email</Label>
//                   <Input
//                     id="login-email"
//                     type="email"
//                     placeholder="teacher@school.com"
//                     value={loginData.email}
//                     onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="login-password">Password</Label>
//                   <Input
//                     id="login-password"
//                     type="password"
//                     placeholder="••••••••"
//                     value={loginData.password}
//                     onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                   />
//                 </div>
//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? 'Logging in...' : 'Login'}
//                 </Button>
//               </form>
//             </TabsContent>

//             <TabsContent value="register">
//               <form onSubmit={handleRegister} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="register-name">Name</Label>
//                   <Input
//                     id="register-name"
//                     placeholder="Your name"
//                     value={registerData.name}
//                     onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="register-email">Email</Label>
//                   <Input
//                     id="register-email"
//                     type="email"
//                     placeholder="teacher@school.com"
//                     value={registerData.email}
//                     onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="register-password">Password</Label>
//                   <Input
//                     id="register-password"
//                     type="password"
//                     placeholder="••••••••"
//                     value={registerData.password}
//                     onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="register-school">School</Label>
//                   <Input
//                     id="register-school"
//                     placeholder="School name"
//                     value={registerData.school}
//                     onChange={(e) => setRegisterData({ ...registerData, school: e.target.value })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="register-location">Location</Label>
//                   <Input
//                     id="register-location"
//                     placeholder="City/Town"
//                     value={registerData.location}
//                     onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
//                   />
//                 </div>
//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? 'Registering...' : 'Register'}
//                 </Button>
//               </form>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { GraduationCap } from "lucide-react";
import { api } from "@/services/api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [flipped, setFlipped] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    school: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await api.login(loginData);
      login(response.token, response.teacher);
      toast.success("Welcome back, Teacher!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(registerData).some((v) => !v)) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await api.register(registerData);
      login(response.token, response.teacher);
      toast.success("Registration successful! Welcome to Sahayak!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-6">
      <style>{`
        .panel { width: 760px; max-width: 96vw; display:flex; gap:10px; align-items:center; justify-content:center; flex-direction:column; }
        .top-labels { display:flex; gap:18px; align-items:center; justify-content:center; margin-bottom: 6px; }
        .side-label { color:#323232; font-weight:700; font-size:15px; }
        .toggle-btn { background:transparent; border:2px dashed rgba(37,99,235,0.16); padding:8px 12px; border-radius:999px; color:#2563eb; font-weight:700; cursor:pointer; }
        .flip-card-outer { width:360px; height:520px; perspective:1000px; }
        .flip-inner { width:100%; height:100%; position:relative; transition: transform 0.8s; transform-style: preserve-3d; }
        .flipped { transform: rotateY(180deg); }
        .face { position:absolute; width:100%; height:100%; -webkit-backface-visibility:hidden; backface-visibility:hidden; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; gap:16px; padding:26px; border-radius:14px; border:2px solid #323232; box-shadow:8px 8px rgba(50,50,50,0.08); background: linear-gradient(180deg, rgba(255,255,255,0.94), rgba(245,245,247,0.94)); }
        .back { transform: rotateY(180deg); }
        .title { font-size:20px; font-weight:800; color:#323232; margin-bottom: 8px; text-align:center; }
        .gradient-head { background: linear-gradient(90deg,#2563eb,#06b6d4); -webkit-background-clip: text; background-clip: text; color:transparent; font-weight:900; font-size:22px; }
        .auth-input { width: 300px; max-width:86%; height:44px; border-radius:10px; border:2px solid #323232; background:#fff; box-shadow:4px 4px #323232; padding:8px 12px; font-weight:600; outline:none; }
        .auth-input:focus { border: 2px solid #2d8cf0; box-shadow: 0 0 0 6px rgba(45,140,240,0.06); }
        .auth-btn { width:140px; height:44px; border-radius:10px; border:2px solid #323232; background: linear-gradient(90deg,#2563eb,#1e40af); color:white; font-weight:800; box-shadow:4px 4px #323232; cursor:pointer; }
        .muted { color: #64748b; font-weight:600; font-size:13px; text-align:center; margin-top:8px; }
        @media (max-width:420px) {
          .flip-card-outer { height:600px; }
          .auth-input { width:220px; }
          .panel { gap:12px; }
        }
      `}</style>

      <div className="panel">
        {/* Decorative headline (kept once) */}
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <div className="gradient-head">Welcome to Sahayak</div>
          <div
            style={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: 14,
              color: "#475569",
              marginTop: 6,
            }}
          >
            AI Teaching Assistant — Your classroom companion
          </div>
        </div>

        {/* Toggle buttons */}
        <div className="top-labels">
          <div
            className="side-label"
            style={{ textDecoration: !flipped ? "underline" : "none" }}
          >
            Log in
          </div>
          <button
            className="toggle-btn"
            onClick={() => setFlipped((s) => !s)}
            aria-pressed={flipped}
          >
            {flipped ? "Switch to Login" : "Switch to Register"}
          </button>
          <div
            className="side-label"
            style={{ textDecoration: flipped ? "underline" : "none" }}
          >
            Sign up
          </div>
        </div>

        {/* Flip card */}
        <div className="flip-card-outer">
          <div className={`flip-inner ${flipped ? "flipped" : ""}`}>
            {/* FRONT - LOGIN */}
            <div className="face" aria-hidden={flipped}>
              {/* Keep GraduationCap only on login side */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 999,
                  background: "rgba(37,99,235,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 6,
                }}
              >
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>

              <div className="title">Log in</div>

              <form
                onSubmit={handleLogin}
                className="flex flex-col items-center gap-10"
                style={{ marginTop: 12 }}
              >
                <input
                  className="auth-input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
                <input
                  className="auth-input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <button type="submit" className="auth-btn" disabled={loading}>
                  {loading ? "Logging in..." : "Let's go!"}
                </button>
              </form>
            </div>

            {/* BACK - SIGN UP (no GraduationCap, spacing adjusted) */}
            <div className="face back" aria-hidden={!flipped}>
              <div className="title" style={{ marginTop: 10 }}>
                Sign up
              </div>

              <form
                onSubmit={handleRegister}
                className="flex flex-col items-center gap-8"
                style={{ marginTop: 16 }}
              >
                <input
                  className="auth-input"
                  placeholder="Name"
                  type="text"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                />
                <input
                  className="auth-input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                />
                <input
                  className="auth-input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                />
                <input
                  className="auth-input"
                  placeholder="School name"
                  type="text"
                  value={registerData.school}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, school: e.target.value })
                  }
                />
                <input
                  className="auth-input"
                  placeholder="City/Town"
                  type="text"
                  value={registerData.location}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      location: e.target.value,
                    })
                  }
                />
                <button type="submit" className="auth-btn" disabled={loading}>
                  {loading ? "Registering..." : "Confirm!"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
