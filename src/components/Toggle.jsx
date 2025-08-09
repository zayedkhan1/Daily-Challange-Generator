import React from "react";
import clsx from "clsx";

/**
 * Small toggle switch component controlled externally.
 * props: checked, onChange, label
 */

export default function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <div className="flex flex-col">
        {label && <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>}
        <div
          onClick={() => onChange(!checked)}
          className={clsx(
            "w-12 h-7 rounded-full p-1 transition-colors",
            checked ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"
          )}
        >
          <div className={clsx("w-5 h-5 rounded-full bg-white shadow transform transition-transform", checked ? "translate-x-5" : "translate-x-0")}></div>
        </div>
      </div>
    </label>
  );
}
