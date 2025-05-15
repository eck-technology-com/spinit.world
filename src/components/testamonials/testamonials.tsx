"use client"
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

import { TestamonialProps } from '@i/testamonials';
import { ArrowLeftCircle, ArrowRightCircle} from "react-feather";
import styles from "./testamonials.module.css";

export function Testamonial({ Quote, Guest } : Readonly<{Quote: string; Guest: string;}>) {
  return <></>;
}

export default function Testamonials({children} : Readonly<{children: React.ReactNode;}> ) {

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const testimonials: TestamonialProps[] = React.Children.toArray(children)
    .filter((child) => {
      if (!React.isValidElement(child)) return false;
      const element = child as React.ReactElement<{ Quote: string; Guest: string }>;
      if (element.props.Quote === undefined ) return false;
      return child
    })
    .map((child) => {
      const element = child as React.ReactElement<{ Quote: string; Guest: string }>;
      return {
        Quote: element.props.Quote,
        Guest: element.props.Guest,
      };
    });

  const introductions: React.ReactNode[] = React.Children.toArray(children)
    .filter((child) => {
      if (!React.isValidElement(child) || typeof child.type === "function")  return false;
      return child;
    })
    .map((child) => {
      return child;
    });
    
  // Auto-rotate testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 20000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  });  

  const goToPrevious = (): void => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (): void => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious
  });

  return (
    <div className={styles.band} {...handlers}>
      <div className={styles.content}>
        <div className={styles.introduction}>
          {introductions}
        </div>
        <div className={styles.testimonials} >
          <p className={`${styles.quote} ${styles.fadein}`}>{testimonials[currentIndex].Quote}</p>
          <p className={styles.guest}>{testimonials[currentIndex].Guest}</p>
        </div>
      </div>
      <div className={styles.controls}>
        <button title="Previous" onClick={goToPrevious}><ArrowLeftCircle /></button>
        <button title="Next" onClick={goToNext}><ArrowRightCircle /></button>
      </div>
    </div>
  );
}





