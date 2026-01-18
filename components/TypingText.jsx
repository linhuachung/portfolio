'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TYPING_ANIMATION } from '@/constants/animations';

const CURSOR_ANIMATION = {
  animate: { opacity: [1, 0] },
  transition: {
    duration: TYPING_ANIMATION.CURSOR_BLINK_DURATION,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

function TypingText( {
  text = '',
  speed = TYPING_ANIMATION.DEFAULT_SPEED,
  showCursor = true,
  cursorChar = TYPING_ANIMATION.CURSOR_CHAR,
  onComplete,
  className = ''
} ) {
  const [displayedText, setDisplayedText] = useState( '' );

  useEffect( () => {
    if ( !text ) {
      setDisplayedText( '' );
      return;
    }

    setDisplayedText( '' );
    let currentIndex = 0;

    const typingInterval = setInterval( () => {
      if ( currentIndex < text.length ) {
        setDisplayedText( text.substring( 0, currentIndex + 1 ) );
        currentIndex++;
      } else {
        clearInterval( typingInterval );
        if ( onComplete ) {
          onComplete();
        }
      }
    }, speed );

    return () => {
      clearInterval( typingInterval );
    };
  }, [text, speed, onComplete] );

  const lines = displayedText.split( '\n' );

  return (
    <span className={ className }>
      { lines.map( ( line, index ) => (
        <span key={ index }>
          { line }
          { index < lines.length - 1 && <br /> }
        </span>
      ) ) }
      { showCursor && (
        <motion.span
          className="inline-block ml-1 text-accent-light dark:text-accent"
          animate={ CURSOR_ANIMATION.animate }
          transition={ CURSOR_ANIMATION.transition }
        >
          { cursorChar }
        </motion.span>
      ) }
    </span>
  );
}

export default TypingText;
