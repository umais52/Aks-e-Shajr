import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Trees, Lock, RotateCcw, Eye, EyeOff, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardContent } from '../../../components/ui/card';

// Real auth SDK — calls POST /api/auth/reset-password on the Express server
import { resetPassword } from '../../../lib/auth-client';

/* ─── Password requirement hint ─── */
function HintRow({ met, text }) {
  return (
    <div className="flex items-center gap-2">
      {met
        ? <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2.5} />
        : <XCircle     className="w-3.5 h-3.5 text-muted-foreground shrink-0" strokeWidth={2} />
      }
      <span className={`text-xs ${met ? 'text-primary' : 'text-muted-foreground'}`}>{text}</span>
    </div>
  );
}

/* ─── Password input with show/hide toggle ─── */
function PasswordField({ id, label, icon: Icon, value, onChange, placeholder, error }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-semibold text-muted">{label}</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`pl-10 pr-10 ${error ? 'border-destructive focus-visible:ring-destructive' : 'border-border focus-visible:ring-primary'}`}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          tabIndex={-1}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-white transition-colors"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <span className="text-destructive text-xs">{error}</span>}
    </div>
  );
}

/* ─── Main Page ─── */
export default function SetNewPassword() {
  const navigate      = useNavigate();

  // Read the ?token= query parameter injected by the reset email link.
  // react-router-dom v6 useSearchParams is the correct way to read URL params.
  const [searchParams] = useSearchParams();
  const token          = searchParams.get('token');

  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors]                   = useState({ password: '', confirmPassword: '' });
  const [authError, setAuthError]             = useState('');  // API-level error
  const [success, setSuccess]                 = useState(false);
  const [loading, setLoading]                 = useState(false);

  /* Requirements */
  const isLong  = password.length >= 8;
  const isMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  const validate = () => {
    const e = { password: '', confirmPassword: '' };
    let ok = true;
    if (!password)                   { e.password = 'Password is required';           ok = false; }
    else if (password.length < 8)    { e.password = 'Must be at least 8 characters';  ok = false; }
    if (!confirmPassword)            { e.confirmPassword = 'Please confirm your password'; ok = false; }
    else if (password !== confirmPassword) { e.confirmPassword = 'Passwords do not match'; ok = false; }
    setErrors(e);
    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Guard: if there's no token in the URL, the page was opened incorrectly
    if (!token) {
      setAuthError('Invalid or missing reset token. Please request a new password reset link.');
      return;
    }

    setLoading(true);
    setAuthError('');

    try {
      // POST /api/auth/reset-password
      // Better Auth validates the token against the `verifications` collection,
      // checks it hasn't expired (1 hour TTL), then updates the user's password hash.
      const { error } = await resetPassword({
        newPassword: password,
        token,
      });

      if (error) {
        // Common errors: "Token expired", "Invalid token", etc.
        setAuthError(error.message || 'Failed to reset password. Your link may have expired.');
        return;
      }

      // ── Success ──────────────────────────────────────────────────────────
      setSuccess(true);
      // Redirect to login after 2 seconds so user can sign in with new password
      setTimeout(() => navigate('/auth'), 2200);

    } catch (err) {
      console.error('Reset password error:', err);
      setAuthError('Could not reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden font-sans">

      {/* Background Abstract Rays — identical to AuthScreen */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent rotate-45 transform origin-center" />
        <div className="absolute top-0 right-1/4 w-[200%] h-[50%] bg-gradient-to-b from-white/[0.02] to-transparent rotate-[-30deg] transform origin-top-right blur-3xl" />
      </div>

      {/* ── Brand Header — same as AuthScreen ── */}
      <div className="text-center mb-6 flex flex-col items-center relative z-10">
        <Trees className="text-primary w-12 h-12 mb-4" strokeWidth={2} />
        <h1 className="text-2xl font-bold text-white mb-2 tracking-wide">AKS-E-SHAJR</h1>
        <p className="text-gray-400 text-xs">Ecological Monitoring &amp; Analysis</p>
      </div>

      {/* ── Main Card ── */}
      <Card className="w-full max-w-[400px] bg-surface-elevated rounded-lg shadow-2xl relative z-10 flex flex-col items-center border border-border">
        <CardContent className="w-full flex flex-col items-center pt-8">

          {/* Card heading */}
          <div className="text-center mb-6 w-full">
            <h2 className="text-lg font-bold text-primary mb-1 tracking-wide">Reset Password</h2>
            <p className="text-muted text-[13px] leading-relaxed">
              Please enter a new, secure password for your account.
            </p>
          </div>

          {/* Missing token warning */}
          {!token && (
            <div className="w-full flex items-start gap-2 mb-4 p-3 rounded border border-destructive/30 bg-destructive/10">
              <p className="text-destructive text-xs leading-relaxed">
                No reset token found in the URL. Please click the link from your email, or{' '}
                <button onClick={() => navigate('/auth')} className="underline text-destructive font-medium">
                  request a new one
                </button>.
              </p>
            </div>
          )}

          {/* API error banner */}
          {authError && (
            <div className="w-full flex items-start gap-2 mb-4 p-3 rounded border border-destructive/30 bg-destructive/10">
              <p className="text-destructive text-xs leading-relaxed">{authError}</p>
            </div>
          )}

          {/* ── Success state ── */}
          {success ? (
            <div className="flex flex-col items-center gap-3 py-6 w-full">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-primary" strokeWidth={2} />
              </div>
              <p className="text-primary font-semibold text-sm">Password updated successfully!</p>
              <p className="text-muted text-xs">Redirecting to login…</p>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 w-full">

              <PasswordField
                id="new-password"
                label="NEW PASSWORD"
                icon={Lock}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                error={errors.password}
              />

              <PasswordField
                id="confirm-password"
                label="CONFIRM PASSWORD"
                icon={RotateCcw}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                error={errors.confirmPassword}
              />

              {/* Live requirement indicators */}
              <div className="flex flex-col gap-1.5 pt-1">
                <HintRow met={isLong}  text="At least 8 characters long" />
                {confirmPassword.length > 0 && (
                  <HintRow met={isMatch} text="Passwords match" />
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading || !token}
                className="w-full mt-2 h-11 font-semibold flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-background"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Update Password
                    {/* Swap arrows icon — matches Figma design */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 16V4m0 0L3 8m4-4 4 4"/><path d="M17 8v12m0 0 4-4m-4 4-4-4"/>
                    </svg>
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Back to Login */}
          {!success && (
            <div className="w-full mt-6">
              <hr className="border-border mb-6" />
              <Button
                variant="ghost"
                type="button"
                onClick={() => navigate('/auth')}
                className="w-full flex items-center justify-center gap-2 text-sm text-muted hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                BACK TO LOGIN
              </Button>
            </div>
          )}

        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-8 text-[10px] text-gray-500 font-mono tracking-widest text-center w-full px-4">
        © 2024 AKS-E-SHAJR ENVIRONMENTAL SYSTEMS
      </div>
    </div>
  );
}
