import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ye line page ko top-left corner (0,0) par scroll kar degi
    window.scrollTo(0, 0);
  }, [pathname]); // Jab bhi path badlega, ye trigger hoga

  return null;
};

export default ScrollToTop;