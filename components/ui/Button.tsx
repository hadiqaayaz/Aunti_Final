import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-soft active:bg-[#10131c] disabled:opacity-50 disabled:cursor-not-allowed",
  outline:
    "bg-transparent text-ink border border-border hover:bg-black/[0.03] active:bg-black/[0.06]",
  ghost:
    "bg-transparent text-ink hover:bg-black/[0.03] active:bg-black/[0.06]",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`w-full rounded-md px-5 py-3 text-sm font-medium transition-colors duration-150 ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
