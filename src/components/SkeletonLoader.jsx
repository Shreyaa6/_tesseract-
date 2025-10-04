import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="repositories-overview">
      <div className="overview-header">
        <div className="overview-title">
          <div className="skeleton-title"></div>
          <div className="skeleton-subtitle"></div>
        </div>
      </div>

      <div className="repositories-table">
        <div className="table-header">
          <div className="table-cell">REPOSITORY</div>
          <div className="table-cell">ACTIVITY</div>
          <div className="table-cell">PULL REQUESTS</div>
          <div className="table-cell">CONTRIBUTORS</div>
          <div className="table-cell">COMMITS</div>
          <div className="table-cell">LAST 30 DAYS</div>
        </div>

        {/* Generate 3 skeleton rows */}
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="table-row skeleton-row">
            <div className="table-cell">
              <div className="repo-cell">
                <div className="repo-info-cell">
                  <div className="skeleton-repo-name"></div>
                  <div className="skeleton-repo-org"></div>
                </div>
              </div>
            </div>
            <div className="table-cell">
              <div className="skeleton-activity-indicator"></div>
            </div>
            <div className="table-cell">
              <div className="skeleton-pr-info">
                <div className="skeleton-pr-count"></div>
                <div className="skeleton-pr-stats"></div>
              </div>
            </div>
            <div className="table-cell">
              <div className="skeleton-contributors">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-avatar"></div>
                <div className="skeleton-avatar"></div>
                <div className="skeleton-count"></div>
              </div>
            </div>
            <div className="table-cell">
              <div className="skeleton-commits-info">
                <div className="skeleton-commit-date"></div>
                <div className="skeleton-commit-count"></div>
              </div>
            </div>
            <div className="table-cell">
              <div className="skeleton-activity-graph">
                <div className="skeleton-graph"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
