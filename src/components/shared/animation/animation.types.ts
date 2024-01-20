import { motion } from 'framer-motion';
import { ComponentProps, ReactNode } from 'react';

export type Variant =
  | 'fadeIn'
  | 'slideUp'
  | 'slideLeft'
  | 'slideRight'
  | 'resizeHorizontal';

export interface AnimationProps extends ComponentProps<typeof motion.div> {
  children: ReactNode;
  duration?: number;
  variant: Variant;
}
