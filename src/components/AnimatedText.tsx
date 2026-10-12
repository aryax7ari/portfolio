import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible select-none" aria-hidden="true">
        {char}
      </span>
      <motion.span style={{ opacity }} className="absolute inset-0 select-none">
        {char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const elementRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Calculate total characters for progression mapping
  const totalChars = text.length;
  const words = text.split(' ');

  let globalCharIndex = 0;

  return (
    <p
      ref={elementRef}
      className={`font-medium text-center leading-relaxed ${className.includes('text-') ? className : `text-[#D7E2EA] ${className}`}`}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const renderedWord = (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const start = globalCharIndex / totalChars;
              const end = Math.min(1, (globalCharIndex + 1) / totalChars);
              globalCharIndex += 1;

              return (
                <Character
                  key={`char-${globalCharIndex}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );

        // Account for the space character in indexing
        if (wordIndex < words.length - 1) {
          globalCharIndex += 1;
        }

        return (
          <React.Fragment key={`frag-${wordIndex}`}>
            {renderedWord}
            {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </React.Fragment>
        );
      })}
    </p>
  );
};
