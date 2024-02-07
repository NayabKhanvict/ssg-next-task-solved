import React, { FC } from "react";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p
      id="filled_error_help"
      className="mt-2 text-xs text-red-600 dark:text-red-400"
    >
      <span className="font-medium">{message}</span>
    </p>
  );
};
