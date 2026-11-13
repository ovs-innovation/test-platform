import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

// Check which questions have diagram drawings in their slices
// We can crop diagrams directly from slices or pages
const diagramQuestions = [
  // Question with diagram in body:
  1, 5, 7, 11, 24, 31, 40, 44, 46, 51, 52, 55, 56, 60, 63, 64, 70, 73, 83, 88, 90, 94, 95, 102, 107,
  // Question with diagrams in options:
  15, 19, 27, 28, 30, 33, 39, 47, 53, 57, 62, 66, 68, 72, 77, 78, 79, 82, 89, 97, 100
];

console.log('Total questions needing diagram inspection:', diagramQuestions.length);

