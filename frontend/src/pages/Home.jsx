import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Hero Section */}
      <div style={{
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        padding: '2.5rem 6%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: '4.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--badge-bg)',
              color: 'var(--badge-text)',
              fontSize: '0.85rem',
              fontWeight: '700',
              marginBottom: '1.8rem',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
            }}>
              ⚙ AI-Powered Campus Learning
            </div>

            <h1 style={{
              fontSize: '3.8rem',
              lineHeight: '1.12',
              fontWeight: '900',
              letterSpacing: '-1.8px',
              marginBottom: '1.4rem',
              color: 'var(--heading-color)'
            }}>
              Discover Your Perfect Prep & Placement Growth
            </h1>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.12rem',
              lineHeight: '1.65',
              marginBottom: '2.4rem',
              maxWidth: '520px'
            }}>
              NovaCampusAI analyzes your core subjects, identifies syllabus gaps, and prepares personalized interview Q&A roadmaps tailored to your placement goals.
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link to="/interview-prep" style={{
                padding: '0.9rem 1.8rem',
                backgroundColor: 'var(--btn-primary-bg)',
                color: '#ffffff',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1rem',
                boxShadow: '0 6px 20px var(--btn-primary-shadow)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Start Learning Free →
              </Link>

              <Link to="/summarize" style={{
                padding: '0.9rem 1.8rem',
                backgroundColor: 'var(--btn-secondary-bg)',
                color: 'var(--btn-secondary-text)',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1rem',
                border: '1.5px solid var(--btn-secondary-border)',
                display: 'inline-block'
              }}>
                Explore Features
              </Link>
            </div>
          </div>

          {/* Right Column Showcase Image */}
          <div>
            <div style={{
              borderRadius: '26px',
              overflow: 'hidden',
              border: '1px solid var(--card-border)',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.15)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                alt="Learning platform interface"
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase Section (SkillPath AI Styled Cards) */}
      <div style={{
        padding: '5rem 6%',
        maxWidth: '1360px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <span style={{
          color: 'var(--heading-color)',
          fontSize: '0.85rem',
          fontWeight: '800',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '0.8rem'
        }}>
          Why Choose Us
        </span>

        <h2 style={{
          fontSize: '2.8rem',
          fontWeight: '900',
          letterSpacing: '-1px',
          color: 'var(--text-primary)',
          marginBottom: '1rem'
        }}>
          Smart Features for Faster Mastery
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          maxWidth: '560px',
          margin: '0 auto 4rem auto'
        }}>
          Designed to take you from classroom fundamentals to job-ready placement confidence with minimal friction.
        </p>

        {/* 3 Grid Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {/* Card 1 */}
          <div style={{
            backgroundColor: 'var(--btn-secondary-bg)',
            border: '1.5px solid var(--btn-secondary-border)',
            borderRadius: '24px',
            padding: '2.8rem 2rem',
            textAlign: 'left',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            transition: 'transform 0.2s ease'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: 'var(--nav-active-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.6rem',
              fontSize: '1.6rem'
            }}>
              🤖
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
              Interview Q&A Engine
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.65' }}>
              Input any tech stack or engineering subject to instantly receive comprehensive, recruiter-level questions with breakdown answers.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{
            backgroundColor: 'var(--btn-secondary-bg)',
            border: '1.5px solid var(--btn-secondary-border)',
            borderRadius: '24px',
            padding: '2.8rem 2rem',
            textAlign: 'left',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            transition: 'transform 0.2s ease'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: 'var(--nav-active-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.6rem',
              fontSize: '1.6rem'
            }}>
              ⚡
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
              High-Yield Summarizer
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.65' }}>
              Condense voluminous textbook chapters, documentation, and messy lecture notes into clean, revision-ready bullet points.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{
            backgroundColor: 'var(--btn-secondary-bg)',
            border: '1.5px solid var(--btn-secondary-border)',
            borderRadius: '24px',
            padding: '2.8rem 2rem',
            textAlign: 'left',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            transition: 'transform 0.2s ease'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: 'var(--nav-active-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.6rem',
              fontSize: '1.6rem'
            }}>
              📚
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
              Personal Revision Vault
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.65' }}>
              Save all generated insights securely into your personal cloud database. Revisit, revise, and manage your study notes anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;