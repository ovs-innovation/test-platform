// NEET Heat and Thermodynamics PYQ Full Dataset: 163 Questions
import { THERMO_PYQ_PART1 } from './thermo_pyq_part1.mjs';
import { THERMO_PYQ_PART2 } from './thermo_pyq_part2.mjs';
import { THERMO_PYQ_PART3 } from './thermo_pyq_part3.mjs';
import { THERMO_PYQ_PART4 } from './thermo_pyq_part4.mjs';
import { THERMO_PYQ_PART5 } from './thermo_pyq_part5.mjs';

const rawList = [
  ...THERMO_PYQ_PART1,
  ...THERMO_PYQ_PART2,
  ...THERMO_PYQ_PART3,
  ...THERMO_PYQ_PART4,
  ...THERMO_PYQ_PART5
];

export const THERMO_PYQ_QUESTIONS = rawList.map((q) => {
  let qText = q.question.trim();
  let imgUrl = q.image_url || q.imageUrl || null;

  // Extract markdown image from question text if present
  const mdMatch = qText.match(/!\[.*?\]\(((?:https?:\/\/|\/)[^)]+)\)/i);
  if (mdMatch) {
    if (!imgUrl) imgUrl = mdMatch[1];
    qText = qText.replace(/!\[.*?\]\((?:https?:\/\/|\/)[^)]+\)/gi, '').trim();
  }

  // Handle options: check if any option has markdown image or is an image
  const processedOptions = q.options.map((opt, idx) => {
    const key = String.fromCharCode(65 + idx);
    if (typeof opt === 'object' && opt !== null) {
      return {
        key: opt.key || key,
        text: opt.text || '',
        image_url: opt.image_url || opt.image || ''
      };
    }
    const optStr = String(opt).trim();
    const optMd = optStr.match(/!\[.*?\]\(((?:https?:\/\/|\/)[^)]+)\)/i);
    if (optMd) {
      return {
        key,
        text: optStr.replace(/!\[.*?\]\((?:https?:\/\/|\/)[^)]+\)/gi, '').trim(),
        image_url: optMd[1]
      };
    }
    if (optStr.startsWith('http://') || optStr.startsWith('https://')) {
      return {
        key,
        text: '',
        image_url: optStr
      };
    }
    return {
      key,
      text: optStr,
      image_url: ''
    };
  });

  return {
    ...q,
    question: qText,
    image_url: imgUrl,
    imageUrl: imgUrl,
    options: processedOptions
  };
});

export default THERMO_PYQ_QUESTIONS;
