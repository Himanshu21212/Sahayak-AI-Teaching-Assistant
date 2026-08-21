// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// const DashboardLayout = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <Sidebar />
//       <div className="lg:pl-64">
//         <Header />
//         <main className="p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 text-slate-800 overflow-hidden">
      {/* Background gradient blob decorations */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-300 opacity-20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        className="z-20"
      >
        <Sidebar />
      </motion.div>

      {/* Main content area */}
      <div className="lg:pl-64 flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-10 backdrop-blur-lg bg-white/60 border-b border-slate-200 shadow-sm"
        >
          <Header />
        </motion.div>

        {/* Main dashboard content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="p-6 lg:p-8"
        >
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg border border-slate-200 p-6 min-h-[80vh]">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
