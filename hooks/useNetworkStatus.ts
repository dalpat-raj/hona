"use client";
import { useEffect, useState } from "react";

export const useNetworkStatus = () => {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    const checkSpeed = () => {
      if (!connection) return;

      const effectiveType = connection.effectiveType;

      // slow networks: 2g or 3g
      if (effectiveType === "2g" || effectiveType === "3g") {
        setIsSlow(true);
      } else {
        setIsSlow(false);
      }
    };

    checkSpeed();

    connection?.addEventListener("change", checkSpeed);

    return () => {
      connection?.removeEventListener("change", checkSpeed);
    };
  }, []);

  return isSlow;
};