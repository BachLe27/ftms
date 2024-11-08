import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'centerHover' | 'slideHover' | 'skewCurtain' | 'shine' | 'swipe' | 'curtain' | 'smoosh' | 'alternate' | 'circleHover' | 'hideBackground';
}

const CustomButton: React.FC<ButtonProps> = ({ text, variant = 'centerHover', ...rest }) => {
  const baseClass = styles.base;
  const variantClass = styles[variant];

  return (
    <button {...rest} className={`${baseClass} ${variantClass} px-4 py-2 rounded-lg`}> <span className={styles.text}>{text}</span>
    </button>
  );
};

export default CustomButton;

