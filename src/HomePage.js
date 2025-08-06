import React, { useState, useEffect } from "react";

function HomePage({ onStart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // ITAIS Header Section
  const ITAISSection = () => (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "20px",
        zIndex: 3,
        textAlign: "left",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.3)",
          padding: "8px 16px",
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
        }}
      >
        <img
          src="/logo-classicbluewhite-one.svg"
          alt="Intel"
          style={{
            height: "50px",
            marginRight: "12px",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
          }}
        />
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          ITAIS - PPTD
        </h1>
      </div>
    </div>
  );



  // Left Column Component
  const LeftColumn = () => (
    <div
      style={{
        width: "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "80px 10px 20px 10px",
        zIndex: 2,
        position: "relative",
      }}
    >

      {/* AI Automation Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "15px",
          color: "white",
        }}
      >
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            margin: "0 0 6px 0",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          🤖 AI Automation
        </h2>
      </div>

      {/* Enhanced Action Card */}
      <div
        style={{
          width: "240px",
          height: "180px",
          perspective: "1000px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
        onClick={onStart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transition: "transform 0.6s",
            transformStyle: "preserve-3d",
            transform: isHovered ? "rotateY(10deg) scale(1.05)" : "rotateY(0deg) scale(1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              background: "linear-gradient(145deg, #3498DB, #2980B9)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              borderRadius: "15px",
              boxShadow: isHovered 
                ? "0 20px 40px rgba(52, 152, 219, 0.4)" 
                : "0 10px 20px rgba(52, 152, 219, 0.2)",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                marginBottom: "8px",
                animation: animationPhase === 0 ? "pulse 1s ease-in-out" : "none",
              }}
            >
              ⚡
            </div>
            <h3
              style={{
                margin: "0 0 6px 0",
                fontSize: "1.2rem",
                fontWeight: "600",
              }}
            >
              Start Generation
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                opacity: 0.8,
                textAlign: "center",
              }}
            >
              Click to begin automated<br />wiki creation
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Right Column Component
  const RightColumn = () => (
    <div
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "80px 20px 20px 20px",
        background: "rgba(255,255,255,0.98)",
        backdropFilter: "blur(15px)",
        margin: "60px 10px 80px 10px",
        borderRadius: "20px",
        boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
        border: "1px solid rgba(255,255,255,0.2)",
        zIndex: 2,
        position: "relative",
      }}
    >

      {/* Header for content area */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        <h2
          style={{
            color: "#2C3E50",
            fontSize: "1.6rem",
            margin: "0 0 6px 0",
            fontWeight: "600",
            background: "linear-gradient(135deg, #3498DB, #9B59B6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Powered by Advanced AI
        </h2>
        <p
          style={{
            color: "#666",
            fontSize: "1rem",
            margin: 0,
          }}
        >
          Transform your development workflow with intelligent automation
        </p>
      </div>

      {/* Main content area with benefits on left and image on right */}
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        
        {/* Benefits section - Left side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: "0 0 200px", // Fixed width for benefits
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>⏱️</div>
            <div style={{ color: "#2C3E50", fontWeight: "600", fontSize: "0.85rem" }}>Save Time</div>
            <div style={{ color: "#7F8C8D", fontSize: "0.7rem" }}>Automated processes</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>🎯</div>
            <div style={{ color: "#2C3E50", fontWeight: "600", fontSize: "0.85rem" }}>Accuracy</div>
            <div style={{ color: "#7F8C8D", fontSize: "0.7rem" }}>AI-powered precision</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>📈</div>
            <div style={{ color: "#2C3E50", fontWeight: "600", fontSize: "0.85rem" }}>Efficiency</div>
            <div style={{ color: "#7F8C8D", fontSize: "0.7rem" }}>Optimized workflows</div>
          </div>
        </div>

        {/* Technology Integration Images - Right side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            gap: "15px",
          }}
        >
          {/* Supply Chain Integration Display */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(145deg, #ECF0F1, #BDC3C7)",
                padding: "12px",
                borderRadius: "15px",
                boxShadow: "0 10px 25px rgba(52, 152, 219, 0.12)",
                transition: "transform 0.3s ease",
                transform: animationPhase === 1 ? "scale(1.02)" : "scale(1)",
                width: "100%",
                border: "2px solid rgba(52, 152, 219, 0.1)",
              }}
            >
              <img
                src="/dist/images/logos/unboxed/PPTD-SC.png"
                alt="Supply Chain Integration - Gen AI, MuleSoft, Apigee, Denodo"
                style={{
                  width: "100%",
                  height: "250px", // Increased from 140px to 200px
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </div>
            <h3
              style={{
                color: "#2C3E50",
                fontSize: "1rem",
                margin: "10px 0 3px 0",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Supply Chain Integration
            </h3>
            <p
              style={{
                color: "#7F8C8D",
                fontSize: "0.85rem",
                margin: 0,
                textAlign: "center",
              }}
            >
              Gen AI • MuleSoft • Apigee • Denodo
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(135deg, #2C3E50 0%, #3498DB 30%, #9B59B6 70%, #E74C3C 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Animated background particles */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "80%",
          background: `radial-gradient(circle at ${20 + animationPhase * 30}% ${30 + animationPhase * 20}%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          animation: "float 6s ease-in-out infinite",
          zIndex: 1,
        }}
      />

      {/* ITAIS Header Section */}
      <ITAISSection />

      {/* Left Column */}
      <LeftColumn />

      {/* Right Column */}
      <RightColumn />

      {/* SC-bg.gif at bottom outside columns */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "0px",
          right: "40px",
          zIndex: 3,
          background: "transparent",
        }}
      >
        <img
          src="/dist/images/logos/unboxed/SC-bg.gif"
          alt="Supply Chain Background"
          style={{
            height: "50px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
            background: "transparent",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

export default HomePage;