import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function WaveLab() {
  const [playing, play] = useState(false);
  const [time, setTime] = useState(0);
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(35);

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      setTime(t => (t + 0.04) % 100);
    }, 40);

    return () => window.clearInterval(timer);
  }, [playing]);

  const points = Array.from({ length: 301 }, (_, i) => {
    const y = 80 - amplitude * Math.sin(
      2 * Math.PI * frequency * (i / 100 - time)
    );

    return `${i * 2},${y.toFixed(2)}`;
  }).join(" ");

  return (
    <section className="bg-card border rounded-xl p-6 space-y-5">
      <h3 className="text-2xl font-semibold">
        Travelling Wave
      </h3>

      <p>
        Explore how frequency and amplitude affect a wave.
      </p>

      <svg
        viewBox="0 0 600 160"
        className="w-full bg-slate-50 rounded"
      >
        <path
          d="M0 80H600"
          stroke="#94a3b8"
          strokeDasharray="4 4"
        />

        <polyline
          points={points}
          fill="none"
          stroke="#6249a8"
          strokeWidth="3"
        />
      </svg>

      <label className="block">
        Frequency — {frequency} Hz

        <input
          className="block w-full"
          type="range"
          min="0.5"
          max="3"
          step="0.5"
          value={frequency}
          onChange={e => setFrequency(Number(e.target.value))}
        />
      </label>

      <label className="block">
        Amplitude — {amplitude} display units

        <input
          className="block w-full"
          type="range"
          min="5"
          max="65"
          step="5"
          value={amplitude}
          onChange={e => setAmplitude(Number(e.target.value))}
        />
      </label>

      <Button onClick={() => play(!playing)}>
        {playing ? "Pause" : "Play animation"}
      </Button>
    </section>
  );
}
