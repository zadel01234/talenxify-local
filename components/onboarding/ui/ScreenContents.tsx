export const OnboardingContent = ({ onNavigate }: { onNavigate: (type: string) => void }): JSX.Element => (
  <main className="action-section">
    <div className="action-content">
      <img className="logo" alt="Talenxify logo" src="/talenxify-logo-1.png" />
      <div className="action-main">
        <div className="action-text">
          <h2 className="action-title">
            <span className="italic-dark">What Brings you <br />to </span>
            <span className="italic-blue">Talenxify?</span>
          </h2>
          <p className="action-subtitle">
            We&apos;d like to personalize your experience so you find what you&apos;re looking for!
          </p>
        </div>
        <div className="action-buttons">
          <button className="action-button-hire" onClick={() => onNavigate("hirer")}>I want to Hire Talent</button>
          <button className="action-button" onClick={() => onNavigate("talent")}>Looking for My next Role</button>
        </div>
      </div>
    </div>
  </main>
);

export const LoginContent = ({ onNavigate, onSignUpClick, onForgotPasswordClick }: { onNavigate: () => void; onSignUpClick: () => void; onForgotPasswordClick: () => void }): JSX.Element => (
  <main className="login-section">
    <div className="login-content">
      <img className="logo" alt="Talenxify logo" src="/talenxify-logo-1.png" />
      <div className="login-tabs">
        <button className="login-tab" onClick={onSignUpClick}>Sign Up</button>
        <button className="login-tab active">Sign In</button>
      </div>
      <form className="login-form">
        <div className="form-group">
          <label className="form-label">Email Id</label>
          <input type="email" className="form-input" placeholder="" />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="password-wrapper">
            <input type="password" className="form-input" placeholder="Enter Password" />
            <button type="button" className="password-toggle">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4C4.5 4 1.5 10 1.5 10s3 6 8.5 6 8.5-6 8.5-6-3-6-8.5-6z" stroke="#596CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="10" r="2.5" stroke="#596CFF" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
        <a href="#" className="forgot-password" onClick={onForgotPasswordClick}>Forgot Password?</a>
        <button type="button" className="signin-btn" onClick={onNavigate}>Sign In</button>
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

export const SignUpContent = ({ onNavigate, onSignInClick }: { onNavigate: () => void; onSignInClick: () => void }): JSX.Element => (
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
            <label className="form-label">Date Of Birth</label>
            <input type="text" className="form-input" placeholder="Enter date of birth" />
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
            <label className="form-label">Nationality</label>
            <select className="form-select">
              <option>Select your nationality</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Bio</label>
            <input type="text" className="form-input" placeholder="Tell us about yourself..." />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input type="password" className="form-input" placeholder="Enter Password" />
              <button type="button" className="password-toggle">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4C4.5 4 1.5 10 1.5 10s3 6 8.5 6 8.5-6 8.5-6-3-6-8.5-6z" stroke="#596CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="10" cy="10" r="2.5" stroke="#596CFF" strokeWidth="1.5" />
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
                  <path d="M10 4C4.5 4 1.5 10 1.5 10s3 6 8.5 6 8.5-6 8.5-6-3-6-8.5-6z" stroke="#596CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="10" cy="10" r="2.5" stroke="#596CFF" strokeWidth="1.5" />
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

export const OTPContent = ({ onNavigate }: { onNavigate: () => void }): JSX.Element => (
  <main className="otp-section">
    <div className="otp-content">
      <img className="logo" alt="Talenxify logo" src="/talenxify-logo-1.png" />
      <h1 className="otp-title">OTP Verification</h1>
      <p className="otp-subtitle">
        Enter the verification code we just sent to your email address
      </p>
      <div className="otp-inputs">
        <input type="text" maxLength={1} className="otp-input" onChange={(e) => e.target.className = e.target.value ? 'otp-input filled' : 'otp-input'} />
        <input type="text" maxLength={1} className="otp-input" onChange={(e) => e.target.className = e.target.value ? 'otp-input filled' : 'otp-input'} />
        <input type="text" maxLength={1} className="otp-input" onChange={(e) => e.target.className = e.target.value ? 'otp-input filled' : 'otp-input'} />
        <input type="text" maxLength={1} className="otp-input" onChange={(e) => e.target.className = e.target.value ? 'otp-input filled' : 'otp-input'} />
        <input type="text" maxLength={1} className="otp-input" onChange={(e) => e.target.className = e.target.value ? 'otp-input filled' : 'otp-input'} />
        <input type="text" maxLength={1} className="otp-input" onChange={(e) => e.target.className = e.target.value ? 'otp-input filled' : 'otp-input'} />
      </div>
      <button className="verify-btn" onClick={onNavigate}>Verify</button>
      <p className="resend-text">
        Didn&apos;t receive a code? <a href="#" className="resend-link">Resend</a>
      </p>
    </div>
  </main>
);

export const CustomizeContent = ({ onNavigate }: { onNavigate: () => void }): JSX.Element => (
  <main className="customize-section">
    <div className="customize-content">
      <img className="customize-logo" alt="Talenxify logo" src="/talenxify-logo-1.png" />
      <p className="page-indicator">1 / 2</p>
      <h1 className="customize-title">Customize your Experience</h1>
      <p className="customize-subtitle">
        Tell us about Skills to personalize your job search.
      </p>
      <form className="customize-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Experience</label>
            <select className="form-select">
              <option>Select your experience</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Current Status</label>
            <select className="form-select">
              <option>Select current status</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Level Of Experience</label>
            <select className="form-select">
              <option>Select level of experience</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Availability</label>
            <select className="form-select">
              <option>Select availability</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Country of Residence</label>
            <select className="form-select">
              <option>Select country</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">City of Residence</label>
            <select className="form-select">
              <option>Select city</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">LinkedIn</label>
            <input type="text" className="form-input" placeholder="Link to your linkedin profile" />
          </div>
          <div className="form-group">
            <label className="form-label">Job Role</label>
            <select className="form-select">
              <option>Select job role</option>
            </select>
          </div>
        </div>
        <button type="button" className="create-account-btn" onClick={onNavigate}>Create Account</button>
      </form>
    </div>
  </main>
);

export const ForgotPasswordContent = ({ onNavigate }: { onNavigate: () => void }): JSX.Element => (
  <main className="forgot-password-section">
    <div className="forgot-password-content">
      <img className="logo" alt="Talenxify logo" src="/talenxify-logo-1.png" />

      <h1 className="forgot-password-title">Forgot Password?</h1>
      <p className="forgot-password-subtitle">
        To reset your password, enter your registered email address
      </p>

      <form className="forgot-password-form">
        <div className="form-group">
          <label className="form-label">Email Id</label>
          <input type="email" className="form-input" placeholder="" />
        </div>

        <button type="button" className="send-otp-btn" onClick={onNavigate}>Send Otp</button>
      </form>
    </div>
  </main>
);

export const NewPasswordContent = ({ onNavigate }: { onNavigate: () => void }): JSX.Element => (
  <main className="new-password-section">
    <div className="new-password-content">
      <img className="logo" alt="Talenxify logo" src="/talenxify-logo-1.png" />

      <h1 className="new-password-title">Enter New Password</h1>
      <p className="new-password-subtitle">
        Create a new password to access your dashboard
      </p>

      <form className="new-password-form">
        <div className="form-group">
          <label className="form-label">New Password</label>
          <div className="password-wrapper">
            <input type="password" className="form-input" placeholder="Enter new Password" />
            <button type="button" className="password-toggle">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4C4.5 4 1.5 10 1.5 10s3 6 8.5 6 8.5-6 8.5-6-3-6-8.5-6z" stroke="#596CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="10" r="2.5" stroke="#596CFF" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Confirm New Password</label>
          <div className="password-wrapper">
            <input type="password" className="form-input" placeholder="Confirm new Password" />
            <button type="button" className="password-toggle">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4C4.5 4 1.5 10 1.5 10s3 6 8.5 6 8.5-6 8.5-6-3-6-8.5-6z" stroke="#596CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="10" r="2.5" stroke="#596CFF" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <button type="button" className="verify-password-btn" onClick={onNavigate}>Verify</button>
      </form>
    </div>
  </main>
);

export const SuccessContent = ({ onNavigate }: { onNavigate: () => void }): JSX.Element => (
  <main className="success-section">
    <div className="success-content">
      <img className="success-logo" alt="Talenxify logo" src="/talenxify-logo-1.png" />
      <img className="success-badge" alt="Success" src="/checked.png" />
      <h1 className="success-title">Account created successfully!</h1>
      <p className="success-subtitle">
        Welcome aboard! Start your success journey with Talenxify!
      </p>
      <button className="dashboard-btn" onClick={onNavigate}>Done</button>
    </div>
  </main>
);



// export const SuccessContent = (): JSX.Element => {
//   const router = useRouter();

//   const handleDone = () => {
//     router.push("/login"); // route where LoginPage lives
//   };

//   return (
//     <main className="success-section">
//       <div className="success-content">
//         <img
//           className="success-logo"
//           alt="Talenxify logo"
//           src="/talenxify-logo-1.png"
//         />
//         <img
//           className="success-badge"
//           alt="Success"
//           src="/checked.png"
//         />
//         <h1 className="success-title">Account created successfully!</h1>
//         <p className="success-subtitle">
//           Welcome aboard! Start your success journey with Talenxify!
//         </p>
//         <button className="dashboard-btn" onClick={handleDone}>
//           Done
//         </button>
//       </div>
//     </main>
//   );
// };
