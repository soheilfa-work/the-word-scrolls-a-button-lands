"use client";
import React, { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
type Props = {};

function resetScrollToStart() {
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  ScrollTrigger.clearScrollMemory("manual");
}

const SpotlightSection = (props: Props) => {
  useEffect(() => {
    resetScrollToStart();
    const lenis = new Lenis();
    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    resetScrollToStart();

    const spotlightHeaders = document.querySelectorAll(".spotlight-header");
    const frontHeader = spotlightHeaders[spotlightHeaders.length - 1];
    const frontSvg = frontHeader.querySelector("svg");
    const letterPath = frontSvg?.querySelectorAll("path")[2];

    const letterGroup = document.createElementNS(SVG_NAMESPACE, "g");
    letterPath?.parentNode?.insertBefore(letterGroup, letterPath);
    letterGroup?.appendChild(letterPath as Node);

    const letterBounds = letterPath?.getBBox();
    const letterCenterX =
      (letterBounds?.x ?? 0) + (letterBounds?.width ?? 0) / 2;
    const letterCenterY =
      (letterBounds?.y ?? 0) + (letterBounds?.height ?? 0) / 2;

    gsap.set(letterGroup, {
      svgOrigin: `${letterCenterX} ${letterCenterY}`,
    });

    const labelText = "Lets Do It";

    const labelElement = document.createElementNS(SVG_NAMESPACE, "text");
    labelElement.setAttribute("class", "i-link-text");
    labelElement.setAttribute("x", letterCenterX.toString());
    labelElement.setAttribute("y", letterCenterY.toString());
    labelElement.setAttribute("text-anchor", "middle");
    labelElement.setAttribute("dominant-baseline", "central");
    labelElement.setAttribute(
      "transform",
      `rotate(-90 ${letterCenterX} ${letterCenterY})`,
    );
    Object.defineProperty(labelElement, "innerHTML", {
      configurable: true,
      get() {
        return this.textContent ?? "";
      },
      set(value: string) {
        this.textContent = value.replaceAll("&nbsp;", " ");
      },
    });
    labelElement.textContent = "";
    letterGroup.appendChild(labelElement);

    const labelRevealTween = gsap.to(labelElement, {
      duration: 0.75,
      scrambleText: {
        text: labelText.toUpperCase(),
        chars: "upperCase",
        revealDelay: 0.1,
        speed: 0.5,
      },
      paused: true,
    });

    let isLabelRevealed = false;

    let letterSlideDistance = 0;
    let letterTargetScale = 1;
    let cascadeShiftStep = 5;

    const measureLetterDrop = () => {
      const isMobileViewport = window.innerWidth < 1000;
      letterTargetScale = isMobileViewport ? 1.6 : 1;
      cascadeShiftStep = isMobileViewport ? 20 : 5;

      gsap.set(letterGroup, { y: 0, rotation: 0, scale: 1 });
      gsap.set(spotlightHeaders, { y: 0, scale: 1 });

      const section = document.querySelector(".spotlight");
      if (!letterPath || !section) return;

      const before = letterPath.getBoundingClientRect();
      gsap.set(letterGroup, { y: 100 });
      const after = letterPath.getBoundingClientRect();
      gsap.set(letterGroup, { y: 0, rotation: 0, scale: 1 });

      const pixelsPerUnit = (after.top - before.top) / 100 || 1;
      const frontIndex = spotlightHeaders.length - 1;
      const frontFinalScale = 1 - frontIndex * 0.075;
      const parentShift = frontIndex * cascadeShiftStep;
      const sectionBox = section.getBoundingClientRect();
      const headerBox = frontHeader.getBoundingClientRect();
      const letterCenter = before.top + before.height / 2;
      const scaleShift =
        (headerBox.bottom - letterCenter) * (1 - frontFinalScale);
      const startCenter = letterCenter + parentShift + scaleShift;
      const rotatedHalfHeight =
        (before.width * frontFinalScale * letterTargetScale) / 2;
      const targetCenter = sectionBox.bottom - 32 - rotatedHalfHeight;

      letterSlideDistance =
        (targetCenter - startCenter) / (pixelsPerUnit * frontFinalScale);
    };

    measureLetterDrop();

    const onResize = () => {
      measureLetterDrop();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const trigger = ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top 50%",
      end: "bottom 50%",
      scrub: true,
      onUpdate: (self) => {
        const scrollProgress = self.progress;
        const cascadeProgress = Math.min(scrollProgress / 0.5, 1);

        spotlightHeaders.forEach((header, index) => {
          const finalScale = 1 - index * 0.075;
          const scale = 1 + (finalScale - 1) * cascadeProgress;
          const y = index * cascadeShiftStep * cascadeProgress;

          gsap.set(header, {
            y,
            scale,
          });
        });

        const letterIProgress = gsap.utils.clamp(
          0,
          1,
          (scrollProgress - 0.5) / 0.5,
        );

        gsap.set(letterGroup, {
          rotation: gsap.utils.interpolate(0, 90, letterIProgress),
          y: gsap.utils.interpolate(0, letterSlideDistance, letterIProgress),
          scale: gsap.utils.interpolate(1, letterTargetScale, letterIProgress),
        });

        if (scrollProgress > 0.75 && !isLabelRevealed) {
          isLabelRevealed = true;
          labelRevealTween.play();
        } else if (scrollProgress < 0.75 && isLabelRevealed) {
          isLabelRevealed = false;
          labelRevealTween.reverse();
        }
      },
    });

    return () => {
      window.removeEventListener("resize", onResize);
      trigger.kill();
    };
  }, []);

  return (
    <section className="spotlight relative h-screen w-full overflow-hidden bg-[#070c0b]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8ee0c4] opacity-20 blur-3xl"
      />
      {/* max-w-6xl px-8 sm:px-12 lg:px-16 */}
      <div className="spotlight-stage relative z-10 mx-auto h-full w-full max-w-8xl px-8 sm:px-12 lg:px-16">
        <div className="spotlight-header">
          <svg
            width="45"
            height="9"
            viewBox="0 0 45 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.84 0V1.872H4.584V8.46H2.232V1.872H0V0H6.84Z"
              fill="black"
            />
            <path
              d="M16.9622 0V8.46H14.6102V5.064H11.7422V8.46H9.39019V0H11.7422V3.18H14.6102V0H16.9622Z"
              fill="black"
            />
            <path d="M22.3402 0V8.46H19.9882V0H22.3402Z" fill="black" />
            <path
              d="M33.1956 8.46H30.8436L27.7116 3.732V8.46H25.3596V0H27.7116L30.8436 4.788V0H33.1956V8.46Z"
              fill="black"
            />
            <path
              d="M41.2193 8.46L38.5673 4.752V8.46H36.2153V0H38.5673V3.648L41.1953 0H43.9073L40.7993 4.104L44.0633 8.46H41.2193Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="spotlight-header">
          <svg
            width="45"
            height="9"
            viewBox="0 0 45 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.84 0V1.872H4.584V8.46H2.232V1.872H0V0H6.84Z"
              fill="black"
            />
            <path
              d="M16.9622 0V8.46H14.6102V5.064H11.7422V8.46H9.39019V0H11.7422V3.18H14.6102V0H16.9622Z"
              fill="black"
            />
            <path d="M22.3402 0V8.46H19.9882V0H22.3402Z" fill="black" />
            <path
              d="M33.1956 8.46H30.8436L27.7116 3.732V8.46H25.3596V0H27.7116L30.8436 4.788V0H33.1956V8.46Z"
              fill="black"
            />
            <path
              d="M41.2193 8.46L38.5673 4.752V8.46H36.2153V0H38.5673V3.648L41.1953 0H43.9073L40.7993 4.104L44.0633 8.46H41.2193Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="spotlight-header">
          <svg
            width="45"
            height="9"
            viewBox="0 0 45 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.84 0V1.872H4.584V8.46H2.232V1.872H0V0H6.84Z"
              fill="black"
            />
            <path
              d="M16.9622 0V8.46H14.6102V5.064H11.7422V8.46H9.39019V0H11.7422V3.18H14.6102V0H16.9622Z"
              fill="black"
            />
            <path d="M22.3402 0V8.46H19.9882V0H22.3402Z" fill="black" />
            <path
              d="M33.1956 8.46H30.8436L27.7116 3.732V8.46H25.3596V0H27.7116L30.8436 4.788V0H33.1956V8.46Z"
              fill="black"
            />
            <path
              d="M41.2193 8.46L38.5673 4.752V8.46H36.2153V0H38.5673V3.648L41.1953 0H43.9073L40.7993 4.104L44.0633 8.46H41.2193Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="spotlight-header">
          <svg
            width="45"
            height="9"
            viewBox="0 0 45 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.84 0V1.872H4.584V8.46H2.232V1.872H0V0H6.84Z"
              fill="black"
            />
            <path
              d="M16.9622 0V8.46H14.6102V5.064H11.7422V8.46H9.39019V0H11.7422V3.18H14.6102V0H16.9622Z"
              fill="black"
            />
            <path d="M22.3402 0V8.46H19.9882V0H22.3402Z" fill="black" />
            <path
              d="M33.1956 8.46H30.8436L27.7116 3.732V8.46H25.3596V0H27.7116L30.8436 4.788V0H33.1956V8.46Z"
              fill="black"
            />
            <path
              d="M41.2193 8.46L38.5673 4.752V8.46H36.2153V0H38.5673V3.648L41.1953 0H43.9073L40.7993 4.104L44.0633 8.46H41.2193Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="spotlight-header">
          <svg
            width="45"
            height="9"
            viewBox="0 0 45 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.84 0V1.872H4.584V8.46H2.232V1.872H0V0H6.84Z"
              fill="black"
            />
            <path
              d="M16.9622 0V8.46H14.6102V5.064H11.7422V8.46H9.39019V0H11.7422V3.18H14.6102V0H16.9622Z"
              fill="black"
            />
            <path d="M22.3402 0V8.46H19.9882V0H22.3402Z" fill="black" />
            <path
              d="M33.1956 8.46H30.8436L27.7116 3.732V8.46H25.3596V0H27.7116L30.8436 4.788V0H33.1956V8.46Z"
              fill="black"
            />
            <path
              d="M41.2193 8.46L38.5673 4.752V8.46H36.2153V0H38.5673V3.648L41.1953 0H43.9073L40.7993 4.104L44.0633 8.46H41.2193Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="spotlight-header">
          <svg
            width="45"
            height="9"
            viewBox="0 0 45 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.84 0V1.872H4.584V8.46H2.232V1.872H0V0H6.84Z"
              fill="black"
            />
            <path
              d="M16.9622 0V8.46H14.6102V5.064H11.7422V8.46H9.39019V0H11.7422V3.18H14.6102V0H16.9622Z"
              fill="black"
            />
            <path d="M22.3402 0V8.46H19.9882V0H22.3402Z" fill="black" />
            <path
              d="M33.1956 8.46H30.8436L27.7116 3.732V8.46H25.3596V0H27.7116L30.8436 4.788V0H33.1956V8.46Z"
              fill="black"
            />
            <path
              d="M41.2193 8.46L38.5673 4.752V8.46H36.2153V0H38.5673V3.648L41.1953 0H43.9073L40.7993 4.104L44.0633 8.46H41.2193Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
