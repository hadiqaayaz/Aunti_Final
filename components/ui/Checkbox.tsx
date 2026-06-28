"use client";

import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, id, checked, onChange, ...rest }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 text-sm text-ink cursor-pointer select-none"
    >
      <span
        className={`relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors ${
          checked
            ? "border-orange bg-orange"
            : "border-border bg-white"
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          {...rest}
        />
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}
