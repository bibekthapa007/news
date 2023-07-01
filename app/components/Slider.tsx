import React, { useState, useEffect, ReactNode } from "react";
import SlickSlider, { Settings } from "react-slick";
import ErrorBoundary from "./ErrorBoundary";

interface SliderProps {
  children: ReactNode;
  responsive: any | null;
  [x: string]: any;
}

const Slider = React.forwardRef<SlickSlider, Settings>(
  ({ children, responsive, ...rest }, ref) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    return (
      <ErrorBoundary>
        <SlickSlider
          ref={ref}
          key={isClient ? "client" : "server"}
          responsive={isClient ? responsive : undefined}
          {...rest}
        >
          {children}
        </SlickSlider>
      </ErrorBoundary>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
