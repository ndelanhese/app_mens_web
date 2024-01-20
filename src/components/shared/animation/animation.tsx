'use client';

import { motion } from 'framer-motion';

import { AnimationProps } from './animation.types';

/**
 * CAUTION! This component requires framer motion's
 * <AnimatePresence/> component as a parent element
 * to be able to make its unmount animation work.
 *
 * This component makes animation based the value passed on
 * the "variant" prop.
 *
 * @param children the Element that will be wrapped in this
 * component.
 * @param duration how much time the animation will take to be
 * completed.
 * @param variant the variant defines which animation will be used
 * among the available animations. Ex.: 'slideUp', 'slideLeft', etc.
 * @returns JSX.Element
 */

export const Animation = ({
  children,
  variant,
  duration = 0.3,
  ...args
}: AnimationProps) => {
  function generateVariants() {
    const src = {
      fadeIn: {
        enter: {
          opacity: 0,
        },
        center: {
          opacity: 1,
        },
        exit: {
          opacity: 0,
        },
      },

      slideUp: {
        enter: {
          opacity: 0,
          height: 0,
          overflow: 'hidden',
        },
        center: {
          opacity: 1,
          height: 'auto',
          overflow: 'hidden',
        },
        exit: {
          opacity: 0,
          height: 0,
          overflow: 'hidden',
        },
      },

      slideLeft: {
        enter: (direction: number) => ({
          x: direction > 0 ? -1000 : 1000,
          opacity: 1,
        }),
        center: {
          zIndex: 1,
          x: 0,
          opacity: 1,
        },
        exit: (direction: number) => ({
          zIndex: 0,
          x: direction < 0 ? -1000 : 1000,
          opacity: 1,
        }),
      },

      slideRight: {
        enter: { x: '-100%', opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: '-100%', opacity: 0 },
      },

      resizeHorizontal: {
        enter: {
          width: 0,
          opacity: 0,
        },
        center: {
          width: 'auto',
          opacity: 1,
        },
        exit: {
          width: 0,
          opacity: 0,
        },
      },
    };

    return src[variant];
  }

  const variants = generateVariants();

  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      variants={variants}
      transition={{ duration }}
      {...args}
    >
      {children}
    </motion.div>
  );
};
