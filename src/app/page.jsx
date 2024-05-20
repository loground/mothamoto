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
      i: 'ĭ',
      l: 'ľ',
      o: 'ø',
      n: 'ň',
      s: 'ş',
      t: 'ţ',
      u: 'ŭ',
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
      S: 'Ş',
      T: 'Ţ',
      U: 'Ŭ',
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

  return (
    <>
      <div className="bg-black h-screen w-full flex flex-col items-center justify-center">
        <h1 className="text-yellow-400 text-4xl text-center">Speak mothamotonese, bitch!</h1>
        <div>
          <Image
            className="outline outline-4 outline-yellow-400 rounded-xl"
            src="/mothomoto.jpg"
            width={600}
            height={600}
            alt="mothomoto"
          />
        </div>
        <div>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="mt-4 w-[250px]"
          />
        </div>
        <p className="text-white mt-2">{transformedText}</p>
        <button
          onClick={copyToClipboard}
          className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded">
          Copy to Clipboard
        </button>
      </div>
    </>
  );
}