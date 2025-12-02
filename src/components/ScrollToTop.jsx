import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll vers le haut à chaque changement de page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth" // Animation fluide
    });
  }, [pathname]);

  return null;
}