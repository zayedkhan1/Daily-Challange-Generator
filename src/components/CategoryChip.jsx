import React from "react";
import clsx from "clsx";

/**
 * Small chip used to display category selections. Accepts `selected` prop.
 */

export default function CategoryChip({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1 rounded-full text-sm font-medium transition-shadow",
        selected ? "bg-indigo-600 text-white shadow" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border"
      )}
    >
      {label}
    </button>
  );
}
