export const UploadPhoto = ({ onNavigate }) => {
  return (
    <div className="customize-container">
      <div className="customize-content">
        <img className="customize-logo" alt="Talenxify logo" src="/talenxify-logo-1.png" />
        <p className="page-indicator">2 / 2</p>
        <h1 className="customize-title">Customize your Organization</h1>
        <p className="customize-subtitle">
          Tell us about your organization.
        </p>

        <div className="upload-avatar-wrapper">
            <img src="/profiledefault.png" alt="Profile placeholder" className="upload-avatar-image" />
        </div>

        <button type="button" onClick={onNavigate} className="create-account-btn">
          Upload Photo
        </button>
      </div>
    </div>
  );
};