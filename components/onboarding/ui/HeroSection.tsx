export const HeroSection = (): JSX.Element => {
  return (
    <section className="hero-section">
      <div className="hero-background" />
      <img className="hero-decoration" alt="Rectangle" src="/rectangle-36.svg" />
      <div className="hero-content">
        <header className="hero-header">
          <h1 className="hero-title">Welcome to Talenxify</h1>
          <p className="hero-subtitle">Your go-to platform for hiring exceptional talent.</p>
        </header>
        <img className="hero-image" alt="Group" src="/group-4.png" />
        <div className="hero-footer">
          <div className="feature-box">
            <h2 className="feature-title">Hiring Talent Platform</h2>
            <p className="feature-description">
              <span>...</span>
              <span className="bold"> connecting businesses with<br /> exceptional talent across the African continent.</span>
            </p>
          </div>
          <nav className="pagination" aria-label="Pagination">
            <div className="pagination-dot active" />
            <div className="pagination-dot" />
            <div className="pagination-dot" />
          </nav>
        </div>
      </div>
    </section>
  );
};