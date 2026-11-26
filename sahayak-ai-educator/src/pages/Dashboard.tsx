// src/pages/Dashboard.tsx
import WaveLab from '@/components/WaveLab';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import LessonForm from '@/components/LessonForm';
import LocalLessonForm from '@/components/LocalLessonForm';
import QuizForm from '@/components/QuizForm';
import SplitText from '@/components/SplitText'; // <- your GSAP SplitText component
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, MapPin, FileQuestion } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('lesson');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <div className="hero-section relative overflow-hidden bg-gradient-to-br from-[#2d2757] via-[#3d3170] to-[#2d2757]">
        {/* soft background blobs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-white">AI-Teaching Assistant</span>
                  <span className="px-4 py-1 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white text-sm font-semibold rounded-full">
                    Teacher
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
                <span className="text-[#9b8fc7] font-semibold text-lg">Education Dashboard</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Education &<br />
                Teaching Management<br />
                System<br />
              </h1>
            </div>
          </div>
        </div>

        {/* RIGHT-PANEL: decorative purple area with SplitText animation (hidden on small screens) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hidden md:block absolute right-12 top-20 z-20"
          aria-hidden="true"
        >
          <div className="relative w-80 h-80 rounded-2xl bg-gradient-to-br from-[#3b2b6b] to-[#4b3a88] shadow-2xl border border-white/10 overflow-hidden">
            {/* subtle decorative shapes */}
            <div className="absolute -left-10 -top-8 w-56 h-56 bg-purple-500/20 rounded-full blur-2xl" />
            <div className="absolute right-2 bottom-2 w-40 h-40 bg-indigo-400/10 rounded-full blur-2xl" />

            {/* central content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
              <div className="flex flex-col items-center gap-1">
                <div className="px-3 py-1 bg-white/8 rounded-full text-[11px] font-semibold text-white/90">
                  Live features
                </div>
                <div className="text-white text-lg font-bold tracking-tight">Sahayak</div>
                <div className="text-white/80 text-sm">AI-powered classroom tools</div>
              </div>

              {/* SplitText lines animation */}
              <div className="mt-4 w-full flex items-center justify-center">
                <SplitText
                  text={`Generate lesson plans\nCreate quizzes instantly\nPersonalize learning\nSave time with AI`}
                  className="text-white text-center text-sm leading-snug"
                  delay={80}
                  duration={0.6}
                  ease="power3.out"
                  splitType="lines"
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.15}
                  rootMargin="-80px"
                  textAlign="center"
                  tag="p"
                  onLetterAnimationComplete={() => {
                    /* optional callback when the animated lines complete */
                  }}
                />
              </div>

              {/* badges */}
              <div className="mt-4 flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/8 text-xs text-white/90">Notes</span>
                <span className="px-3 py-1 rounded-full bg-white/8 text-xs text-white/90">Quizzes</span>
                <span className="px-3 py-1 rounded-full bg-white/8 text-xs text-white/90">Analytics</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MAIN */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Teacher Dashboard</h2>
            <p className="text-muted-foreground">
              Generate AI-powered lesson plans, local content, and quizzes
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
              <TabsTrigger value="lesson" className="flex items-center gap-2 py-3">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Lesson Plan</span>
                <span className="sm:hidden">Lesson</span>
              </TabsTrigger>

              <TabsTrigger value="local" className="flex items-center gap-2 py-3">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Local Lesson</span>
                <span className="sm:hidden">Local</span>
              </TabsTrigger>

              <TabsTrigger value="quiz" className="flex items-center gap-2 py-3">
                <FileQuestion className="h-4 w-4" />
                <span className="hidden sm:inline">Quiz</span>
                <span className="sm:hidden">Quiz</span>
              </TabsTrigger>
              <TabsTrigger value="animation">Science Lab</TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="lesson" className="mt-0">
                <LessonForm />
              </TabsContent>

              <TabsContent value="local" className="mt-0">
                <LocalLessonForm />
              </TabsContent>

              <TabsContent value="quiz" className="mt-0">
                <QuizForm />
              </TabsContent>
            </div>
            <TabsContent value="animation">
  <WaveLab />
</TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
