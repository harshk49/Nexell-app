import { createContext, useContext, useState } from "react";

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [isReversed, setIsReversed] = useState(false);

  return (
    <AnimationContext.Provider value={{ isReversed, setIsReversed }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
