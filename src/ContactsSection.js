import React from 'react';

function ContactsSection({ pageData, setPageData, labelStyle, sectionStyle }) {
  
  const contactCardStyle = {
    padding: "20px",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    textAlign: "center",
    cursor: "pointer",
  };

  const radioContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const radioGroupStyle = {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  };

  const radioOptionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
  };

  const emailInputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "2px solid #E2E8F0",
    borderRadius: "6px",
    fontSize: "13px",
    transition: "all 0.3s ease",
    background: "#FFFFFF",
    marginTop: "8px",
  };

  const contactTeams = [
    {
      key: "l0ProductionSupport",
      emailKey: "l0ProductionSupportEmail",
      title: "L0 Production Support",
      icon: "🚨",
      description: "24/7 Production Issues & Incident Response",
      borderColor: "#E74C3C",
      backgroundColor: "linear-gradient(145deg, #FDEAEA, #FFFFFF)",
      textColor: "#E74C3C"
    },
    {
      key: "l2MulesoftSupport",
      emailKey: "l2MulesoftSupportEmail", 
      title: "L2 Mulesoft Support",
      icon: "🔧",
      description: "Mulesoft Platform & Integration Support",
      borderColor: "#3498DB",
      backgroundColor: "linear-gradient(145deg, #EBF3FD, #FFFFFF)",
      textColor: "#3498DB"
    },
    {
      key: "integrationDevTeam",
      emailKey: "integrationDevTeamEmail",
      title: "Integration Dev Team", 
      icon: "💻",
      description: "Development & Technical Implementation",
      borderColor: "#27AE60",
      backgroundColor: "linear-gradient(145deg, #D5F4E6, #FFFFFF)",
      textColor: "#27AE60"
    },
    {
      key: "businessTeam",
      emailKey: "businessTeamEmail",
      title: "Business Team",
      icon: "📊", 
      description: "Business Requirements & Process Owners",
      borderColor: "#9B59B6",
      backgroundColor: "linear-gradient(145deg, #F4F1F8, #FFFFFF)",
      textColor: "#9B59B6"
    }
  ];

  const handleContactChange = (teamKey, value) => {
    setPageData({ 
      ...pageData, 
      [teamKey]: value 
    });
  };

  const handleEmailChange = (emailKey, value) => {
    setPageData({
      ...pageData,
      [emailKey]: value
    });
  };

  return (
    <div style={{
      ...sectionStyle,
      marginBottom: "30px",
    }}>
      <h3 style={{
        color: "#2C3E50",
        fontSize: "1.3rem",
        fontWeight: "600",
        marginBottom: "25px",
        textAlign: "center",
        borderBottom: "3px solid #8E44AD",
        paddingBottom: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}>
        👥 Team Contacts & Support
      </h3>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "20px",
      }}>
        
        {contactTeams.map((team) => (
          <div 
            key={team.key}
            style={{
              ...contactCardStyle,
              border: `2px solid ${team.borderColor}`,
              background: team.backgroundColor,
              minHeight: "280px", // Increased height to accommodate email field
            }}
          >
            {/* Team Header */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: "10px", 
              marginBottom: "15px" 
            }}>
              <span style={{ fontSize: "1.5rem" }}>{team.icon}</span>
              <label style={{ 
                ...labelStyle, 
                marginBottom: "0", 
                fontSize: "1rem", 
                color: team.textColor, 
                fontWeight: "600" 
              }}>
                {team.title}
              </label>
            </div>

            {/* Radio Button Selection */}
            <div style={radioContainerStyle}>
              <label style={{ 
                fontSize: "13px", 
                fontWeight: "500", 
                color: "#2C3E50" 
              }}>
                Include Team Contact:
              </label>
              <div style={radioGroupStyle}>
                <label style={radioOptionStyle}>
                  <input
                    type="radio"
                    name={team.key}
                    value="yes"
                    checked={pageData[team.key] === "yes"}
                    onChange={(e) => handleContactChange(team.key, e.target.value)}
                    style={{ transform: "scale(1.1)" }}
                  />
                  <span style={{ 
                    fontSize: "14px", 
                    color: "#27AE60", 
                    fontWeight: "500" 
                  }}>
                    Yes
                  </span>
                </label>
                <label style={radioOptionStyle}>
                  <input
                    type="radio"
                    name={team.key}
                    value="no"
                    checked={pageData[team.key] === "no"}
                    onChange={(e) => handleContactChange(team.key, e.target.value)}
                    style={{ transform: "scale(1.1)" }}
                  />
                  <span style={{ 
                    fontSize: "14px", 
                    color: "#E74C3C", 
                    fontWeight: "500" 
                  }}>
                    No
                  </span>
                </label>
              </div>
            </div>

            {/* Email Input - Only show when "Yes" is selected */}
            {pageData[team.key] === "yes" && (
              <div style={{ marginTop: "15px" }}>
                <label style={{ 
                  fontSize: "12px", 
                  fontWeight: "500", 
                  color: "#2C3E50",
                  display: "block",
                  marginBottom: "5px"
                }}>
                  📧 Contact Email: <span style={{ color: "#E74C3C" }}>*</span>
                </label>
                <input
                  type="email"
                  value={pageData[team.emailKey] || ""}
                  onChange={(e) => handleEmailChange(team.emailKey, e.target.value)}
                  placeholder={`Enter ${team.title.toLowerCase()} email`}
                  style={{
                    ...emailInputStyle,
                    borderColor: pageData[team.emailKey] && pageData[team.emailKey].includes('@') 
                      ? "#27AE60" 
                      : "#E2E8F0"
                  }}
                  required={pageData[team.key] === "yes"}
                />
                {pageData[team.emailKey] && !pageData[team.emailKey].includes('@') && (
                  <div style={{
                    fontSize: "11px",
                    color: "#E74C3C",
                    marginTop: "4px",
                    fontStyle: "italic"
                  }}>
                    Please enter a valid email address
                  </div>
                )}
              </div>
            )}

            {/* Team Description */}
            <div style={{ 
              fontSize: "11px", 
              color: "#7F8C8D", 
              marginTop: "10px", 
              fontStyle: "italic",
              lineHeight: "1.4"
            }}>
              {team.description}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Summary Section */}
      <div style={{
        marginTop: "20px",
        padding: "15px",
        background: "linear-gradient(145deg, #F8F9FA, #E9ECEF)",
        borderRadius: "10px",
        border: "1px solid #DEE2E6",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "10px"
        }}>
          <span style={{ fontSize: "1.2rem" }}>📋</span>
          <span style={{ 
            fontSize: "14px", 
            fontWeight: "600", 
            color: "#495057" 
          }}>
            Selected Teams & Contacts Summary
          </span>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap"
        }}>
          {contactTeams.map((team) => (
            pageData[team.key] === "yes" && (
              <div 
                key={team.key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  padding: "8px 12px",
                  background: team.textColor,
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "500",
                  minWidth: "140px"
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {team.icon} {team.title}
                </span>
                <span style={{ 
                  fontSize: "10px", 
                  opacity: 0.9,
                  textAlign: "center",
                  wordBreak: "break-all"
                }}>
                  {pageData[team.emailKey] || "Email not provided"}
                </span>
              </div>
            )
          ))}
          {!contactTeams.some(team => pageData[team.key] === "yes") && (
            <span style={{
              fontSize: "12px",
              color: "#6C757D",
              fontStyle: "italic"
            }}>
              No teams selected yet
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactsSection;