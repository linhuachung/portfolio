export const HOME_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  },

  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  },

  title: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  },

  name: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.3
      }
    }
  },

  button: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.8
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  }
};

export const TYPING_ANIMATION = {
  DEFAULT_SPEED: 8,
  CURSOR_BLINK_DURATION: 0.8,
  CURSOR_CHAR: '|'
};

export const SOCIAL_ANIMATIONS = {
  item: {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: ( index ) => ( {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    } ),
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2
      }
    }
  }
};
