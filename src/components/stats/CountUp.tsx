import React from "react";
import { useState, useEffect, useRef } from "react";

export default function CountUp({ end, duration = 500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  // Start counting when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStart(true),
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
  }, []);

  // Animation (equal time for all numbers)
  useEffect(() => {
    if (!start) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime!) / duration, 1);

      // Smooth number increase
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, end, duration]);

  return <span ref={ref}>{count}+</span>;
}
