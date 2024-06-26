'use client';

import React, { useState, useRef, useEffect } from 'react';
import StickyCountdown from './Countdown.jsx';
import MouseLiveDrawing from './Drawing.jsx';
import Image from 'next/image';

export default function Home() {
  // State to hold the regular input text and the transformed text
  const [inputText, setInputText] = useState('');
  const [transformedText, setTransformedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set the initial state based on the current window size
    handleResize();

    // Add event listener for resizing
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to transform the input based on specific mappings
  const transformText = (text) => {
    const mappings = {
      a: 'ä',
      b: 'b',
      c: 'č',
      e: 'ë',
      g: 'ġ',
      h: 'ĥ',
      i: 'ï',
      l: 'ľ',
      o: 'ø',
      n: 'ň',
      s: 'š',
      t: 't',
      u: 'ŭ',
      y: 'ÿ',
      w: 'ŵ',
      A: 'Ä',
      B: 'B',
      C: 'Č',
      E: 'Ë',
      G: 'Ġ',
      H: 'Ĥ',
      I: 'Ĭ',
      L: 'Ľ',
      O: 'Ø',
      N: 'Ň',
      S: 'Š',
      T: 'T',
      U: 'Ŭ',
      Y: 'Ÿ',
      W: 'Ŵ',
    };

    // Replace each character in the text using the mappings
    return text
      .split('')
      .map((char) => mappings[char] || char)
      .join('');
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
    setTransformedText(transformText(newText));
  };

  // Function to copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transformedText).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  const clearButton = () => {
    setInputText('');
    setTransformedText('');
  };

  const audioRef = useRef(null);
  // Ref to hold the audio object
  useEffect(() => {
    // Initialize the audio object within useEffect to ensure it's client-side
    audioRef.current = new Audio('/song.mp3');
    audioRef.current.volume = 0.5;
  }, []);

  const soundManager = () => {
    if (!audioRef.current) return; // Additional safety check
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="bg-black h-screen lg:h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-yellow-400 text-4xl text-center">Speak mothamotonese!</h1>
        <div className="lg:flex flex-col lg:flex-row gap-5 lg:h-[500px] mt-2">
          <Image
            className="outline hover:outline-4 outline-yellow-400 rounded-xl w-full max-w-[250px] sm:max-w-sm md:max-w-md lg:max-w-[600px]"
            src="/mothomoto.jpg"
            width={600}
            height={600}
            alt="mothomoto"
          />
          {!isMobile && <MouseLiveDrawing />}
        </div>

        <div className="flex flex-row gap-5 mt-10">
          <input
            type="text"
            placeholder="Translate your text here"
            value={inputText}
            onChange={handleInputChange}
            className="mt-4 w-[220px] md:w-[400px] lg:w-[500px] rounded-xl"
          />
          <button
            onClick={() => clearButton()}
            className="mt-4 bg-red-500 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded">
            Clear
          </button>
        </div>
        <p className="text-white mt-5 text-xl">{transformedText}</p>

        <div className="gap-10 lg:gap-20 m-2 flex flex-row">
          <button
            onClick={soundManager}
            className="mt-10 bg-white hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded">
            {isPlaying ? 'Stop Music' : 'Play Sound'}
          </button>

          <button
            onClick={copyToClipboard}
            className="mt-10  bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded">
            Copy to Clipboard
          </button>
        </div>
      </div>
    </>
  );
}
