

import React, { useState } from 'react';
import {
  FileText,
  Award,
  BookOpen,
  TrendingUp,
  CalendarDays,
  Eye,
  X,
  Info,
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import './DashboardPages.css';

const sampleResults = [
  { subject: 'Mathematics', code: 'MTH101', test: 18, exam: 62, total: 80, grade: 'A', remark: 'Excellent' },
  { subject: 'English Language', code: 'ENG101', test: 16, exam: 58, total: 74, grade: 'B', remark: 'Very Good' },
  { subject: 'Basic Science', code: 'BSC101', test: 19, exam: 65, total: 84, grade: 'A', remark: 'Excellent' },
  { subject: 'Computer Studies', code: 'CST101', test: 17, exam: 60, total: 77, grade: 'B', remark: 'Very Good' },
  { subject: 'Civic Education', code: 'CVE101', test: 14, exam: 49, total: 63, grade: 'B', remark: 'Good' },
  { subject: 'Islamic Studies', code: 'ISS101', test: 20, exam: 68, total: 88, grade: 'A', remark: 'Excellent' },
];

function Results() {
  const [term, setTerm] = useState('First Term');
  const [selectedResult, setSelectedResult] = useState(null);

  const average =
    sampleResults.reduce((sum, result) => sum + result.total, 0) /
    sampleResults.length;

  const gradeFor = (score) => {
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    if (score >= 40) return 'E';
    return 'F';
  };

  return (
    <DashboardLayout role="STUDENT">
      <div className="results-page">
        <section className="academics-welcome">
          <div>
            <span className="academics-eyebrow">ACADEMIC PERFORMANCE</span>
            <h1>My Results</h1>
            <p>Review your assessment scores, grades, and academic progress.</p>
          </div>
          <div className="academics-welcome-icon">
            <Award size={32} />
          </div>
        </section>

        <section className="academics-stats">
          <article className="academics-stat-card">
            <div className="academics-stat-icon"><Award size={21} /></div>
            <span>Average Score</span>
            <strong>{average.toFixed(1)}%</strong>
            <small>Across displayed subjects</small>
          </article>
          <article className="academics-stat-card">
            <div className="academics-stat-icon"><BookOpen size={21} /></div>
            <span>Subjects</span>
            <strong>{sampleResults.length}</strong>
            <small>In this sample report</small>
          </article>
          <article className="academics-stat-card">
            <div className="academics-stat-icon"><TrendingUp size={21} /></div>
            <span>Highest Score</span>
            <strong>{Math.max(...sampleResults.map((r) => r.total))}%</strong>
            <small>Best displayed subject score</small>
          </article>
        </section>

        <section className="results-panel">
          <div className="results-panel-header">
            <div>
              <h2>Academic Report</h2>
              <p>Choose a term to review your results.</p>
            </div>
            <label className="results-term-select">
              <CalendarDays size={17} />
              <select value={term} onChange={(event) => setTerm(event.target.value)}>
                <option>First Term</option>
                <option>Second Term</option>
                <option>Third Term</option>
              </select>
            </label>
          </div>

          <div className="results-sample-notice">
            <Info size={18} />
            <span>
              These are demonstration results. Official results will appear here
              when published by your school.
            </span>
          </div>

          <div className="results-table-wrap">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Test / 20</th>
                  <th>Exam / 80</th>
                  <th>Total / 100</th>
                  <th>Grade</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {sampleResults.map((result) => (
                  <tr key={result.code}>
                    <td>
                      <strong>{result.subject}</strong>
                      <small>{result.code}</small>
                    </td>
                    <td>{result.test}</td>
                    <td>{result.exam}</td>
                    <td><strong>{result.total}</strong></td>
                    <td>
                      <span className={`results-grade grade-${gradeFor(result.total).toLowerCase()}`}>
                        {gradeFor(result.total)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="results-view-button"
                        onClick={() => setSelectedResult(result)}
                        aria-label={`View ${result.subject} result`}
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {selectedResult && (
          <div
            className="assignment-modal-backdrop"
            onClick={() => setSelectedResult(null)}
          >
            <section
              className="assignment-modal"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="result-modal-title"
            >
              <button
                className="assignment-modal-close"
                onClick={() => setSelectedResult(null)}
                aria-label="Close result details"
              >
                <X size={20} />
              </button>
              <h2 id="result-modal-title">{selectedResult.subject}</h2>
              <p>{selectedResult.code} · {term}</p>
              <div className="results-detail-score">
                <strong>{selectedResult.total}%</strong>
                <span>Overall score</span>
              </div>
              <div className="assignment-modal-info">
                <div>Continuous assessment: <strong>{selectedResult.test}/20</strong></div>
                <div>Examination: <strong>{selectedResult.exam}/80</strong></div>
                <div>Grade: <strong>{gradeFor(selectedResult.total)}</strong></div>
                <div>Teacher's remark: <strong>{selectedResult.remark}</strong></div>
              </div>
              <div className="assignment-modal-note">
                This is sample data for the page preview, not an official school result.
              </div>
              <button
                className="assignment-view-button assignment-modal-done"
                onClick={() => setSelectedResult(null)}
              >
                Close details
              </button>
            </section>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Results;
