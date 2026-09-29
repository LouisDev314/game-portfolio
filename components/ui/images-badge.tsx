'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ImagesBadgeProps {
  text: string;
  images: string[];
  className?: string;
  /** Optional link URL */
  href?: string;
  /** Link target attribute (e.g., "_blank" for new tab) */
  target?: string;
  /** Folder dimensions { width, height } in pixels */
  folderSize?: { width: number; height: number };
  /** Image dimensions when teased (peeking) { width, height } in pixels */
  teaserImageSize?: { width: number; height: number };
  /** Image dimensions when hovered { width, height } in pixels */
  hoverImageSize?: { width: number; height: number };
  /** How far images translate up on hover in pixels */
  hoverTranslateY?: number;
  /** How far images spread horizontally on hover in pixels */
  hoverSpread?: number;
  /** Rotation angle for fanned images on hover in degrees */
  hoverRotation?: number;
}

const DEFAULT_FOLDER_SIZE = { width: 32, height: 24 };
const DEFAULT_TEASER_IMAGE_SIZE = { width: 20, height: 14 };
const DEFAULT_HOVER_IMAGE_SIZE = { width: 48, height: 32 };
const DEFAULT_HOVER_TRANSLATE_Y = -35;
const DEFAULT_HOVER_SPREAD = 20;
const DEFAULT_HOVER_ROTATION = 15;

function finiteNumber(value: number | undefined, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function finiteSize(
  size: { width: number; height: number } | undefined,
  fallback: { width: number; height: number },
): { width: number; height: number } {
  return {
    width: Math.max(1, finiteNumber(size?.width, fallback.width)),
    height: Math.max(1, finiteNumber(size?.height, fallback.height)),
  };
}

export function ImagesBadge({
  text,
  images,
  className,
  href,
  target,
  folderSize,
  teaserImageSize,
  hoverImageSize,
  hoverTranslateY,
  hoverSpread,
  hoverRotation,
}: ImagesBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const safeFolderSize = finiteSize(folderSize, DEFAULT_FOLDER_SIZE);
  const safeTeaserImageSize = finiteSize(teaserImageSize, DEFAULT_TEASER_IMAGE_SIZE);
  const safeHoverImageSize = finiteSize(hoverImageSize, DEFAULT_HOVER_IMAGE_SIZE);
  const safeHoverTranslateY = finiteNumber(hoverTranslateY, DEFAULT_HOVER_TRANSLATE_Y);
  const safeHoverSpread = finiteNumber(hoverSpread, DEFAULT_HOVER_SPREAD);
  const safeHoverRotation = finiteNumber(hoverRotation, DEFAULT_HOVER_ROTATION);

  // Limit to max 3 images
  const displayImages = images.slice(0, 3);

  // Calculate folder tab dimensions proportionally
  const tabWidth = safeFolderSize.width * 0.375;
  const tabHeight = safeFolderSize.height * 0.25;

  const Component = href ? 'a' : 'div';

  return (
    <Component
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={cn('inline-flex cursor-pointer items-center gap-2 perspective-[1000px] transform-3d', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Folder Container */}
      <motion.div
        className="relative"
        style={{
          width: safeFolderSize.width,
          height: safeFolderSize.height,
          transformStyle: 'preserve-3d',
        }}>
        {/* Folder Back */}
        <div className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-amber-400 to-amber-500 shadow-sm dark:from-amber-500 dark:to-amber-600">
          {/* Folder Tab */}
          <div
            className="absolute left-0.5 rounded-t-[2px] bg-gradient-to-b from-amber-300 to-amber-400 dark:from-amber-400 dark:to-amber-500"
            style={{
              top: -tabHeight * 0.65,
              width: tabWidth,
              height: tabHeight,
            }}
          />
        </div>

        {/* Images that pop out */}
        {displayImages.map((image, index) => {
          const totalImages = displayImages.length;

          // Calculate rotation based on index
          const baseRotation =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * safeHoverRotation
                : (index - 1) * safeHoverRotation;

          // Hover positions - fan out
          const hoverY = safeHoverTranslateY - (totalImages - 1 - index) * 3;
          const hoverX =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * safeHoverSpread
                : (index - 1) * safeHoverSpread;

          // Teaser positions - slight peek from folder
          const teaseY = -4 - (totalImages - 1 - index) * 1;
          const teaseRotation = totalImages === 1 ? 0 : totalImages === 2 ? (index - 0.5) * 3 : (index - 1) * 3;
          const currentSize = isHovered ? safeHoverImageSize : safeTeaserImageSize;
          const left = safeFolderSize.width / 2 + (isHovered ? hoverX : 0) - currentSize.width / 2;

          return (
            <motion.div
              key={index}
              className="absolute top-0.5 origin-bottom overflow-hidden rounded-[3px] bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-800 dark:shadow-white/10 dark:ring-white/10"
              animate={{
                left,
                y: isHovered ? hoverY : teaseY,
                rotate: isHovered ? baseRotation : teaseRotation,
                width: currentSize.width,
                height: currentSize.height,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                delay: index * 0.03,
              }}
              style={{
                left,
                width: currentSize.width,
                height: currentSize.height,
                zIndex: 10 + index,
              }}>
              <Image src={image} alt={`Preview ${index + 1}`} fill sizes="48px" className="object-cover" />
            </motion.div>
          );
        })}

        {/* Folder Front (flattens on hover) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[85%] origin-bottom rounded-[4px] bg-gradient-to-b from-amber-300 to-amber-400 shadow-sm dark:from-amber-400 dark:to-amber-500"
          animate={{
            rotateX: isHovered ? -45 : -25,
            scaleY: isHovered ? 0.8 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          style={{
            transformStyle: 'preserve-3d',
            zIndex: 20,
          }}>
          {/* Folder line detail */}
          <div className="absolute top-1 right-1 left-1 h-px bg-amber-200/50 dark:bg-amber-300/50" />
        </motion.div>
      </motion.div>

      {/* Text */}
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{text}</span>
    </Component>
  );
}
