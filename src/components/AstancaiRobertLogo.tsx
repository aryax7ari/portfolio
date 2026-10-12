import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'yellow' | 'red';
  withHover?: boolean;
  style?: React.CSSProperties;
}

export const AstancaiRobertLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  color = 'red',
  withHover = true,
  style = {},
}) => {
  const sizeClasses = {
    sm: 'text-2xl sm:text-3xl',
    md: 'text-3xl sm:text-4xl lg:text-5xl',
    lg: 'text-4xl sm:text-5xl lg:text-6xl',
    xl: 'text-5xl sm:text-6xl lg:text-7xl',
    '2xl': 'text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem]',
  };

  // Pulito, senza effetto neon / illuminato / bagliore
  const colorClasses =
    color === 'yellow'
      ? 'text-[#FACC15] hover:text-[#FDE047]'
      : 'text-red-600 hover:text-red-500';

  return (
    <motion.div
      whileHover={withHover ? { scale: 1.05 } : undefined}
      whileTap={withHover ? { scale: 0.97 } : undefined}
      className={`inline-flex items-center select-none cursor-pointer ${className}`}
      title="Astancai Robert"
      style={style}
    >
      <span
        className={`font-['Caveat',_'Marck_Script',_cursive] font-bold tracking-wide leading-none inline-block transition-colors duration-200 ${colorClasses} ${sizeClasses[size]}`}
        style={{
          fontFamily: "'Caveat', 'Marck Script', cursive",
        }}
      >
        Astancai Robert
      </span>
    </motion.div>
  );
};
