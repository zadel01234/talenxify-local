export const HirerSignUpContent = ({ onNavigate, onSignInClick }: { onNavigate: () => void; onSignInClick: () => void }): JSX.Element => (
  <main className="signup-section">
    <div className="signup-content">
      <img className="logo" alt="Talenxify logo" src="/talenxify-logo-1.png" />
      
      <div className="signup-tabs">
        <button className="signup-tab active">Sign Up</button>
        <button className="signup-tab" onClick={onSignInClick}>Sign In</button>
      </div>

      <form className="signup-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="Enter your full name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="Enter your email" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nationality</label>
            <select className="form-select">
              <option>Select your nationality</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select className="form-select">
              <option>Select gender</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input type="password" className="form-input" placeholder="Enter Password" />
              <button type="button" className="password-toggle">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4C4.5 4 1.5 10 1.5 10s3 6 8.5 6 8.5-6 8.5-6-3-6-8.5-6z" stroke="#596CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="10" r="2.5" stroke="#596CFF" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="password-wrapper">
              <input type="password" className="form-input" placeholder="Confirm Password" />
              <button type="button" className="password-toggle">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4C4.5 4 1.5 10 1.5 10s3 6 8.5 6 8.5-6 8.5-6-3-6-8.5-6z" stroke="#596CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="10" r="2.5" stroke="#596CFF" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button type="button" className="create-account-btn" onClick={onNavigate}>Create Account</button>

        <div className="divider">
          <span className="divider-text">OR</span>
        </div>

        <button type="button" className="google-btn">
          <img src="https://www.google.com/favicon.ico" alt="Google" className="google-icon" />
          Continue with Google
        </button>
      </form>
    </div>
  </main>
);