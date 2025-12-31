import React from 'react';

const StreamLoader = ({ progress = 0 }: { progress?: number }) => {
    return (
        <div className="w-full py-1">
            <div className="loading-bar-background w-full">
                <div
                    className="loading-bar transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                >
                    <div className="white-bars-container">
                        {[...Array(40)].map((_, i) => (
                            <div key={i} className="white-bar" />
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .loading-bar-background {
          --height: 12px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 2px;
          height: var(--height);
          background-color: #f8fafc;
          box-shadow: rgba(0, 0, 0, 0.03) -1px 1px 2px 0px inset;
          border-radius: calc(var(--height) / 2);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }

        .loading-bar {
          position: relative;
          display: flex;
          justify-content: center;
          flex-direction: column;
          --height: 8px;
          height: var(--height);
          overflow: hidden;
          background: linear-gradient(
            90deg,
            #0031F2 0%,
            #006DFE 100%
          );
          border-radius: calc(var(--height) / 2);
        }

        .white-bars-container {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 24px;
          left: -200px;
          width: 2000px;
          animation: moveBars 2s linear infinite;
        }

        .white-bar {
          background: linear-gradient(
            -45deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          width: 12px;
          height: 40px;
          opacity: 0.25;
          transform: rotate(45deg);
        }

        @keyframes moveBars {
          0% { transform: translateX(0); }
          100% { transform: translateX(36px); }
        }
      ` }} />
        </div>
    );
}

export default StreamLoader;
