import { ComponentProps, ReactNode } from 'react';

import { motion } from 'framer-motion';

export type Variant = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';

export interface AnimationProps extends ComponentProps<typeof motion.div> {
  children: ReactNode;
  duration?: number;
  variant: Variant;
}
