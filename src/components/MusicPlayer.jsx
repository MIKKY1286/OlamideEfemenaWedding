import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [statusText, setStatusText] = useState("Paused");
  const audioRef = useRef(null);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
      setStatusText("Playing");
      localStorage.setItem("music", "on");
    } else {
      audio.pause();
      setIsPlaying(false);
      setStatusText("Paused");
      localStorage.setItem("music", "off");
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (localStorage.getItem("music") === "on") {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setStatusText("Playing");
        })
        .catch((err) => {
          console.log(
            "Autoplay blocked by browser. User interaction required.",
          );
          setIsPlaying(false);
          setStatusText("Paused");
          console.error(err);
        });
    }
  }, []);

  return (
    <div class="player fixed bottom-6 left-6 z-50 flex items-center bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-stone-100 shadow-lg hover:shadow-xl transition duration-300 hover:scale-[1.02]">
      <button
        onClick={toggleMusic}
        id="musicPlayBtn"
        class={`w-10 h-10 rounded-full bg-linear-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md focus:outline-none transition duration-300 hover:scale-105 ${
          isPlaying ? "animate-spin-slow" : ""
        }`}
      >
        <span id="musicIcon" class="text-xs flex items-center justify-center">
          {isPlaying ? (
            <Pause size={14} fill="currentColor" />
          ) : (
            <Play size={14} fill="currentColor" class="ml-0.5" />
          )}
        </span>
      </button>
      <div class="ml-3 pr-2 flex items-center gap-3">
        <div>
          <p class="text-xs font-semibold text-stone-800 whitespace-nowrap">
            Our Song
          </p>
          <p
            id="musicStatus"
            class="text-[10px] text-stone-500 whitespace-nowrap font-light"
          >
            {statusText}
          </p>
        </div>
        {/* Interactive bouncing visualizer wave bars */}
        <div
          id="waveVisualizer"
          class={`flex items-end gap-0.5 h-3 w-4 opacity-55 ${
            isPlaying ? "animate-wave" : ""
          }`}
        >
          <div class="wave-bar bar1 bg-amber-500 w-[2.5px] rounded-full"></div>
          <div class="wave-bar bar2 bg-amber-500 w-[2.5px] rounded-full"></div>
          <div class="wave-bar bar3 bg-amber-500 w-[2.5px] rounded-full"></div>
          <div class="wave-bar bar4 bg-amber-500 w-[2.5px] rounded-full"></div>
        </div>
      </div>
      <audio ref={audioRef} id="audio" loop>
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default MusicPlayer;
