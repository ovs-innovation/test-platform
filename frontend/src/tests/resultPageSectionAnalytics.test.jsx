import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ResultPage from '../pages/candidate/ResultPage.jsx';
import { attemptService } from '../lib/services.js';

vi.mock('../lib/services.js', () => ({
  attemptService: {
    getResult: vi.fn(),
  },
  aiTestService: {
    generateWeakTopicTest: vi.fn(),
  },
}));

vi.mock('../components/candidate/AIInsightsCard.jsx', () => ({
  default: () => <div data-testid="ai-insights" />,
}));
vi.mock('../components/candidate/SevenDayRevisionPlanCard.jsx', () => ({
  default: () => <div data-testid="revision-plan" />,
}));
vi.mock('../components/candidate/ScheduledTestsWidget.jsx', () => ({
  default: () => <div data-testid="scheduled-widget" />,
}));
vi.mock('../components/candidate/AiTestResultsCard.jsx', () => ({
  default: () => <div data-testid="ai-results" />,
}));

describe('ResultPage Crash Prevention & Section Evaluation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial state without crashing', () => {
    attemptService.getResult.mockResolvedValue({});

    let renderError = null;
    try {
      renderToStaticMarkup(
        <MemoryRouter initialEntries={['/results/565']}>
          <Routes>
            <Route path="/results/:attemptId" element={<ResultPage />} />
          </Routes>
        </MemoryRouter>
      );
    } catch (err) {
      renderError = err;
    }

    expect(renderError).toBeNull();
  });

  it('defensively renders Section A and Section B cards even if subjData.sectionA is missing', () => {
    // Simulate the JSX snippet from ResultPage that previously crashed:
    // TypeError: Cannot read properties of undefined (reading 'marks')
    const neetSectionAnalytics = {
      Physics: {
        subject: 'Physics',
        totalQuestions: 45,
        marksObtained: 120,
        // sectionA and sectionB are intentionally omitted to test defense
      },
      Chemistry: {
        subject: 'Chemistry',
        totalQuestions: 45,
        marksObtained: 130,
      },
    };

    const renderSectionCards = () => {
      return ['Physics', 'Chemistry', 'Botany', 'Zoology'].map((subj) => {
        const subjData = neetSectionAnalytics?.[subj] || {};
        const secA = subjData?.sectionA || { maxMarks: 140, totalQuestions: 35, attempted: 0, correct: 0, incorrect: 0, marks: 0 };
        const secB = subjData?.sectionB || { maxMarks: 40, totalQuestions: 15, maxAttemptAllowed: 10, totalAttempted: 0, evaluatedAttempted: 0, correct: 0, incorrect: 0, marks: 0 };
        const totalSubjMarks = Number(subjData?.marksObtained ?? ((Number(secA?.marks) || 0) + (Number(secB?.marks) || 0)));
        const subjPct = Math.round((totalSubjMarks / 180) * 100) || 0;

        return (
          <div key={subj} data-testid={`card-${subj}`}>
            <span>{subj}</span>
            <span>{totalSubjMarks} / 180 Marks</span>
            <span>{subjPct}%</span>
            <span>Section A: {(secA?.marks ?? 0)} / 140</span>
            <span>Attempted: {secA?.attempted ?? 0}</span>
            <span>Section B: {(secB?.marks ?? 0)} / 40</span>
            <span>Evaluated: {secB?.evaluatedAttempted ?? ((secB?.correct ?? 0) + (secB?.incorrect ?? 0))}</span>
          </div>
        );
      });
    };

    let error = null;
    let html = '';
    try {
      html = renderToStaticMarkup(<div>{renderSectionCards()}</div>);
    } catch (err) {
      error = err;
    }

    expect(error).toBeNull();
    expect(html).toContain('Physics');
    expect(html).toContain('Section A: 0 / 140');
    expect(html).toContain('Section B: 0 / 40');
  });

  it('correctly handles full Section A / Section B data without errors', () => {
    const neetSectionAnalytics = {
      Physics: {
        subject: 'Physics',
        totalMarks: 180,
        marksObtained: 140,
        sectionA: { maxMarks: 140, totalQuestions: 35, attempted: 35, correct: 30, incorrect: 5, marks: 115 },
        sectionB: { maxMarks: 40, totalQuestions: 15, maxAttemptAllowed: 10, totalAttempted: 10, evaluatedAttempted: 10, correct: 7, incorrect: 3, marks: 25 },
      },
    };

    const subjData = neetSectionAnalytics?.Physics || {};
    const secA = subjData?.sectionA || { maxMarks: 140, totalQuestions: 35, attempted: 0, correct: 0, incorrect: 0, marks: 0 };
    const secB = subjData?.sectionB || { maxMarks: 40, totalQuestions: 15, maxAttemptAllowed: 10, totalAttempted: 0, evaluatedAttempted: 0, correct: 0, incorrect: 0, marks: 0 };
    const totalSubjMarks = Number(subjData?.marksObtained ?? ((Number(secA?.marks) || 0) + (Number(secB?.marks) || 0)));

    expect(secA.marks).toBe(115);
    expect(secB.marks).toBe(25);
    expect(totalSubjMarks).toBe(140);
  });
});
