import Link from 'next/link'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  href?: string
}

// When href is provided the component renders as a Next.js Link;
// otherwise it renders as a <button> and accepts all button HTML attributes.
export type ButtonProps = ButtonBaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
    | { href: string; [key: string]: unknown }
  )

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-obsidian text-chalk border-transparent',
    'hover:bg-bark',
    'active:bg-espresso',
    'disabled:bg-obsidian disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),

  secondary: [
    'bg-transparent text-obsidian border border-obsidian',
    'hover:bg-obsidian hover:text-chalk',
    'active:bg-espresso active:border-espresso active:text-chalk',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),

  ghost: [
    'bg-transparent text-obsidian border-transparent border-b border-b-obsidian',
    'hover:opacity-60',
    'active:text-bark',
    'disabled:text-stone disabled:border-b-transparent disabled:opacity-100 disabled:cursor-not-allowed',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[10px] min-w-[100px]',
  md: 'h-12 px-6 text-[11px] min-w-[140px]',
  lg: 'h-14 px-8 text-[12px] min-w-[180px]',
}

const baseClasses = [
  // Typography
  'inline-flex items-center justify-center',
  'font-body font-medium uppercase tracking-[0.1em]',
  // Shape — brand signature: zero border-radius
  'rounded-none',
  // Interaction
  'cursor-pointer select-none',
  'transition-[background-color,color,border-color,opacity] duration-300',
  '[transition-timing-function:cubic-bezier(0.76,0,0.24,1)]',
  // Focus
  'focus-visible:outline-2 focus-visible:outline-fjord focus-visible:outline-offset-2',
  // Whitespace
  'whitespace-nowrap',
].join(' ')

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...rest
}: ButtonProps & { className?: string; children?: React.ReactNode }) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
