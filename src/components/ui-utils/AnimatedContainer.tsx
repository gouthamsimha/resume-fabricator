
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade" | "slide-up" | "slide-right" | "scale";
  delay?: number;
}

const AnimatedContainer = ({
  children,
  className,
  animation = "fade",
  delay = 0,
}: AnimatedContainerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";

    switch (animation) {
      case "fade":
        return "animate-fade-in";
      case "slide-up":
        return "animate-slide-in-up";
      case "slide-right":
        return "animate-slide-in-right";
      case "scale":
        return "animate-scale-in";
      default:
        return "animate-fade-in";
    }
  };

  return (
    <div
      className={cn(
        getAnimationClass(),
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
