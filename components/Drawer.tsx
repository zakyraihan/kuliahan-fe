"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import Button from "./Button";
import { useSpring, animated } from "@react-spring/web";

interface DrawerProps {
  isOpen: boolean;
  children: ReactNode;
  title: string;
  onSubmit: () => void;
  onClear: () => void;
  onClose: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  title,
  children,
  onSubmit,
  onClear,
  onClose,
}) => {
  const springs = useSpring({
    from: { transform: "translateX(100%)", opacity: 0 },
    to: {
      transform: isOpen ? "translateX(0%)" : "translateX(100%)",
      opacity: isOpen ? 1 : 0,
    },
  });

  return (
    <animated.div
      style={{
        ...springs,
        height: "100vh",
        right: 0,
        position: "fixed",
        zIndex: 50,
      }}
      className={clsx(
        "shadow-lg md:w-[50%] lg:w-[30%] xl:w-[25%] w-full bg-white dark:bg-gray-800 px-5",
        { hidden: !isOpen }
      )}
    >
      <section className="h-[5%] pt-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              onClear();
              onClose();
            }}
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
        <h5 className="text-gray-800 dark:text-gray-100 text-lg font-bold mt-3">
          {title}
        </h5>
      </section>
      <section className="h-[90%] py-5 overflow-y-auto">{children}</section>
      <section className="absolute right-0 left-0 bottom-1 px-5 py-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <Button
          onClick={() => {
            onSubmit();
            onClose();
          }}
          title="Terapkan"
          colorSchema="blue"
        />
      </section>
    </animated.div>
  );
};
