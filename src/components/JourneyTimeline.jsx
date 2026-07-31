import React from 'react';
import { Heart } from 'lucide-react';

const timelineSteps = [
  { title: 'First Meeting', description: 'Where our story began' },
  { title: 'Engagement', description: 'The promise of forever' },
  { title: 'Traditional Wedding', description: 'Honoring rich heritage & culture' },
  { title: 'White Wedding', description: 'Exchanging vows before loved ones' },
  { title: 'Today', description: 'Building a beautiful life together' },
];

const JourneyTimeline = () => {
  return (
    <section className="py-16 px-4 bg-amber-500/5 fade">
      <div className="max-w-4xl mx-auto text-center">
        <span className="font-alex text-amber-600 text-3xl block mb-1 font-semibold">
          Our Story
        </span>
        <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-stone-800 mb-4">
          Journey Timeline
        </h2>
        <div className="flex items-center justify-center gap-3 mb-10 text-amber-500">
          <div className="h-[1px] w-12 bg-amber-300"></div>
          <Heart size={16} fill="currentColor" className="text-amber-500" />
          <div className="h-[1px] w-12 bg-amber-300"></div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 z-0"></div>

          {timelineSteps.map((step, idx) => (
            <div
              key={idx}
              className="relative z-10 flex flex-col items-center group cursor-default"
            >
              <div className="w-14 h-14 rounded-full bg-white border-2 border-amber-400 shadow-md flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white text-amber-600 transition duration-300 mb-3">
                <span className="font-cormorant text-xl font-bold">{idx + 1}</span>
              </div>
              <h3 className="font-cormorant font-bold text-stone-800 text-lg mb-1 group-hover:text-amber-600 transition duration-200">
                {step.title}
              </h3>
              <p className="text-xs text-stone-500 font-light max-w-[140px] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
