import React, { useState, useEffect, useRef } from 'react';
import { Camera, Heart, Calendar, Sparkles } from 'lucide-react';

/**
 * Calculates dynamic years together starting from a milestone anniversary date.
 * Example milestone date: July 31st (Month index 6, Day 31).
 * Every July 31st, the year count increments automatically.
 */
function calculateYearsTogether(startDate = new Date(2025, 6, 31)) {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();

  // Anniversary date for current year
  const anniversaryThisYear = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());

  if (now < anniversaryThisYear) {
    years--;
  }

  return Math.max(1, years);
}

const getStatsData = () => [
  { icon: Camera, label: 'Photos', target: 12, suffix: '+' },
  { icon: Heart, label: 'Memories', target: 500, suffix: '+' },
  { icon: Calendar, label: 'Years Together', target: calculateYearsTogether(), suffix: '' },
  { icon: Sparkles, label: 'Beautiful Moments', target: 1000, suffix: '+' },
];

const StatCard = ({ icon: Icon, label, target, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    let animationFrame;

    const updateCount = () => {
      start += increment;
      if (start >= target) {
        setCount(target);
      } else {
        setCount(Math.floor(start));
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target]);

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-stone-200/60 shadow-sm hover:shadow-md transition duration-300">
      <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
        <Icon size={22} />
      </div>
      <span className="text-3xl md:text-4xl font-cormorant font-bold text-stone-800 tracking-tight">
        {count}
        {suffix}
      </span>
      <span className="text-xs uppercase tracking-widest font-semibold text-stone-500 mt-1">
        {label}
      </span>
    </div>
  );
};

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const statsData = getStatsData();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 px-4 fade">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat, idx) => (
          <StatCard key={idx} {...stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
};

export default AnimatedStats;
