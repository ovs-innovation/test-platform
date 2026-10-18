import { describe, it, expect } from 'vitest';
import {
  getOptionMediaUrls,
  getQuestionDiagrams,
  hasQuestionDiagram,
} from '../lib/media.js';

describe('Question Diagram & Option Media Isolation', () => {
  it('extracts all option media URLs accurately', () => {
    const q = {
      options: [
        { key: 'A', text: 'Option A', image_url: '/uploads/opt-a.png' },
        { key: 'B', text: 'Option B', media: [{ url: '/uploads/opt-b.png' }] },
        { key: 'C', text: 'Option C', image: '/uploads/opt-c.png' },
        { key: 'D', text: 'Option D', media: ['/uploads/opt-d.png'] },
      ],
    };

    const urls = getOptionMediaUrls(q);
    expect(urls.has('/uploads/opt-a.png')).toBe(true);
    expect(urls.has('/uploads/opt-b.png')).toBe(true);
    expect(urls.has('/uploads/opt-c.png')).toBe(true);
    expect(urls.has('/uploads/opt-d.png')).toBe(true);
    expect(urls.size).toBe(4);
  });

  it('returns empty array when question has no question diagram even if options have diagrams', () => {
    // Exactly like Q40 / Q43 in the user screenshots
    const q = {
      question_text: 'Which of following represent pair of Diastereomers?',
      image_url: '/uploads/opt-a.png', // Stale fallback pointing to option A
      media: [
        { id: 'opt-0-img', type: 'diagram', url: '/uploads/opt-a.png', description: 'diagram for option A' },
        { id: 'opt-1-img', type: 'diagram', url: '/uploads/opt-b.png', description: 'diagram for option B' },
      ],
      options: [
        { key: 'A', text: '', image_url: '/uploads/opt-a.png' },
        { key: 'B', text: '', image_url: '/uploads/opt-b.png' },
      ],
    };

    const diagrams = getQuestionDiagrams(q);
    expect(diagrams).toEqual([]);
    expect(hasQuestionDiagram(q)).toBe(false);
  });

  it('keeps genuine question diagrams while stripping out option diagrams', () => {
    // Exactly like Q26 / Q27 in Screenshot 4 where there is a reaction scheme + 4 option diagrams
    const q = {
      question_text: 'The product A and B in the following sequence of reactions, respectively are',
      image_url: null,
      media: [
        { id: 'q26-scheme', type: 'diagram', url: '/uploads/q26-reaction-scheme.png', description: 'Reaction scheme' },
        { id: 'opt-0-img', type: 'diagram', url: '/uploads/q26-opt-a.png', description: 'diagram for option A' },
        { id: 'opt-1-img', type: 'diagram', url: '/uploads/q26-opt-b.png', description: 'diagram for option B' },
        { id: 'opt-2-img', type: 'diagram', url: '/uploads/q26-opt-c.png', description: 'diagram for option C' },
        { id: 'opt-3-img', type: 'diagram', url: '/uploads/q26-opt-d.png', description: 'diagram for option D' },
      ],
      options: [
        { key: 'A', text: '', image_url: '/uploads/q26-opt-a.png' },
        { key: 'B', text: '', image_url: '/uploads/q26-opt-b.png' },
        { key: 'C', text: '', image_url: '/uploads/q26-opt-c.png' },
        { key: 'D', text: '', image_url: '/uploads/q26-opt-d.png' },
      ],
    };

    const diagrams = getQuestionDiagrams(q);
    expect(diagrams.length).toBe(1);
    expect(diagrams[0].url).toBe('/uploads/q26-reaction-scheme.png');
    expect(diagrams[0].id).toBe('q26-scheme');
    expect(hasQuestionDiagram(q)).toBe(true);
  });

  it('strips solution diagrams and explanation media from question diagrams', () => {
    const q = {
      question_text: 'Solve for x',
      solution_image_url: '/uploads/solution.png',
      media: [
        { id: 'sol-diagram', type: 'solution', url: '/uploads/solution.png' },
        { id: 'exp-1', type: 'explanation', url: '/uploads/exp.png' },
      ],
      options: ['1', '2', '3', '4'],
    };

    const diagrams = getQuestionDiagrams(q);
    expect(diagrams).toEqual([]);
    expect(hasQuestionDiagram(q)).toBe(false);
  });

  it('correctly uses legitimate image_url as single question diagram', () => {
    const q = {
      question_text: 'Find the current in the circuit',
      image_url: '/uploads/circuit.png',
      media: [],
      options: [
        { key: 'A', text: '1A' },
        { key: 'B', text: '2A' },
      ],
    };

    const diagrams = getQuestionDiagrams(q);
    expect(diagrams.length).toBe(1);
    expect(diagrams[0].url).toBe('/uploads/circuit.png');
    expect(hasQuestionDiagram(q)).toBe(true);
  });
});
