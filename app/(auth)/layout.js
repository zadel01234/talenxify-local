import "../../Onboarding-UI/src/index.css";
import "./onboarding-overrides.css";

export default function AuthLayout({ children }) {
  return <div className="onboarding-root">{children}</div>;
}
