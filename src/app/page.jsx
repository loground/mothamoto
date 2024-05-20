'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  // State to hold the regular input text and the transformed text
  const [inputText, setInputText] = useState('');
  const [transformedText, setTransformedText] = useState('');

  // Function to transform the input based on specific mappings
  const transformText = (text) => {
    const mappings = {
      a: 'ä',
      b: 'ƀ',
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
      B: 'ƀ',
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
  return (
    <>
      <div className="bg-black h-screen w-full flex flex-col items-center justify-center">
        <h1 className="text-yellow-400 text-4xl text-center">Speak mothamotonese, bitch!</h1>
        <div>
          <Image
            className="outline hover:outline-4 outline-yellow-400 rounded-xl"
            src="/mothomoto.jpg"
            width={600}
            height={600}
            alt="mothomoto"
          />
        </div>
        <div className="flex flex-row gap-5">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="mt-4 w-[500px] rounded-xl"
          />
          <button
            onClick={() => clearButton()}
            className="mt-4 bg-red-500 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded">
            Clear
          </button>
        </div>
        <p className="text-white mt-5 text-xl">{transformedText}</p>

        <button
          onClick={copyToClipboard}
          className="mt-10 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded">
          Copy to Clipboard
        </button>
      </div>
    </>
  );
}
