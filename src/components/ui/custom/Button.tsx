
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    icon, 
    iconPosition = 'left', 
    fullWidth = false, 
    loading = false, 
    className, 
    children, 
    disabled, 
    ...props 
  }, ref) => {
    
    const variants = {
      primary: 'bio-button-primary',
      secondary: 'bio-button-secondary',
      outline: 'bg-transparent border border-bio-neutral-300 text-bio-neutral-800 hover:bg-bio-neutral-100 focus:ring-bio-neutral-200',
      ghost: 'bg-transparent text-bio-neutral-800 hover:bg-bio-neutral-100 focus:ring-bio-neutral-200'
    };
    
    const sizes = {
      sm: 'text-sm h-9 px-3',
      md: 'text-base h-11 px-6',
      lg: 'text-lg h-12 px-8'
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          'bio-button',
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          (disabled || loading) ? 'opacity-70 cursor-not-allowed' : '',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        <span className="relative flex items-center justify-center">
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          )}
          
          <span className={cn(
            'flex items-center',
            loading ? 'opacity-0' : '',
            iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse'
          )}>
            {icon && (
              <span className={cn(
                iconPosition === 'left' ? 'mr-2' : 'ml-2'
              )}>
                {icon}
              </span>
            )}
            {children}
          </span>
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
