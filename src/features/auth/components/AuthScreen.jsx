import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Trees, User, RotateCcw, ArrowLeft, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardContent } from '../../../components/ui/card';

// Real auth SDK — talks to Express → Better Auth → MongoDB
import { signIn, signUp, requestPasswordReset } from '../../../lib/auth-client';

export default function AuthScreen() {
  const navigate = useNavigate();
  const [view, setView] = useState('login'); // 'login' | 'signup' | 'reset'

  // ── Form State ──────────────────────────────────────────────────────────────
  const [fullName, setFullName]             = useState('');
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms]         = useState(false);

  // ── UI State ────────────────────────────────────────────────────────────────
  const [loading, setLoading]       = useState(false);
  const [authError, setAuthError]   = useState('');   // API-level error message
  const [resetSent, setResetSent]   = useState(false); // Show "email sent" confirmation
  const [resendSuccess, setResendSuccess] = useState(false); // Show "resend success" notification

  // ── Client-side Validation ──────────────────────────────────────────────────
  const [errors, setErrors] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', agreeTerms: '',
  });

  const validate = () => {
    let isValid = true;
    const e = { fullName: '', email: '', password: '', confirmPassword: '', agreeTerms: '' };

    if (view === 'signup' && !fullName.trim()) {
      e.fullName = 'Full Name is required';
      isValid = false;
    }
    if (!email) {
      e.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      e.email = 'Please enter a valid email';
      isValid = false;
    }
    if (view !== 'reset' && view !== 'reset-success') {
      if (!password) {
        e.password = 'Password is required';
        isValid = false;
      } else if (password.length < 8) {
        e.password = 'Password must be at least 8 characters';
        isValid = false;
      }
    }
    if (view === 'signup') {
      if (!confirmPassword) {
        e.confirmPassword = 'Please confirm your password';
        isValid = false;
      } else if (password !== confirmPassword) {
        e.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
      if (!agreeTerms) {
        e.agreeTerms = 'You must agree to the Terms of Service';
        isValid = false;
      }
    }

    setErrors(e);
    return isValid;
  };

  // ── Resend Reset Email ──────────────────────────────────────────────────────
  const handleResendResetEmail = async () => {
    setLoading(true);
    setAuthError('');
    setResendSuccess(false);

    try {
      const { error } = await requestPasswordReset({
        email,
        redirectTo: '/auth/set-password',
      });
      if (error) {
        setAuthError(error.message || 'Could not resend email. Please try again.');
        return;
      }
      setResendSuccess(true);
      // Automatically clear success notification after 5 seconds
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err) {
      console.error('Resend error:', err);
      setAuthError('Could not reach the server. Make sure the API server is running.');
    } finally {
      setLoading(false);
    }
  };

  // ── Form Submit — calls real Better Auth API ────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAuthError('');

    try {
      if (view === 'login') {
        // ── Sign In ────────────────────────────────────────────────────────
        // Better Auth verifies the bcrypt hash and sets a session cookie.
        const { error } = await signIn.email({ email, password });
        if (error) {
          // Better Auth returns descriptive errors: "Invalid email or password", etc.
          setAuthError(error.message || 'Login failed. Please check your credentials.');
          return;
        }
        navigate('/map');

      } else if (view === 'signup') {
        // ── Sign Up ────────────────────────────────────────────────────────
        // Better Auth hashes the password with bcrypt before storing.
        // Creates entries in: users + accounts collections.
        const { error } = await signUp.email({
          email,
          password,
          name: fullName.trim(),
        });
        if (error) {
          setAuthError(error.message || 'Registration failed. This email may already be in use.');
          return;
        }
        navigate('/map');

      } else if (view === 'reset') {
        // ── Forgot Password ────────────────────────────────────────────────
        // Better Auth generates a secure token, stores it in the `verifications`
        // collection, then fires sendResetPassword → Resend sends the email.
        const { error } = await requestPasswordReset({
          email,
          redirectTo: '/auth/set-password',
        });
        if (error) {
          setAuthError(error.message || 'Could not send reset email. Please try again.');
          return;
        }
        // Redirect to beautiful reset success screen
        setView('reset-success');
      }

    } catch (err) {
      // Network error, server down, etc.
      console.error('Auth error:', err);
      setAuthError('Could not reach the server. Make sure the API server is running.');
    } finally {
      setLoading(false);
    }
  };

  // ── Switch between login / signup / reset views ─────────────────────────────
  const switchView = (newView) => {
    setView(newView);
    setAuthError('');
    setResetSent(false);
    setResendSuccess(false);
    setErrors({ fullName: '', email: '', password: '', confirmPassword: '', agreeTerms: '' });
    if (newView !== 'signup') setFullName('');
    if (newView === 'login' || newView === 'reset' || newView === 'reset-success') {
      setConfirmPassword('');
      setAgreeTerms(false);
    }
    if (newView === 'reset' || newView === 'reset-success') setPassword('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden font-sans">
      {/* Background Abstract Rays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent rotate-45 transform origin-center" />
        <div className="absolute top-0 right-1/4 w-[200%] h-[50%] bg-gradient-to-b from-white/[0.02] to-transparent rotate-[-30deg] transform origin-top-right blur-3xl" />
      </div>

      {/* ── Brand Header (above card) ── */}
      <div className="text-center mb-6 flex flex-col items-center relative z-10">
        {view === 'reset' || view === 'reset-success' ? (
          <>
            <div className="w-12 h-12 rounded border border-primary/30 flex items-center justify-center mb-4 bg-surface-elevated/50 shadow-[0_0_15px_rgba(41,168,90,0.15)]">
              {view === 'reset-success' ? (
                <Mail className="text-primary w-5 h-5 animate-pulse" />
              ) : (
                <RotateCcw className="text-primary w-5 h-5" />
              )}
            </div>
            <h1 className="text-xl font-bold text-white mb-2 tracking-wide">
              {view === 'reset-success' ? 'Check Your Inbox' : 'Reset Password'}
            </h1>
            <p className="text-gray-400 text-xs">AKS-E-SHAJR Secure Access</p>
          </>
        ) : (
          <>
            <Trees className="text-primary w-12 h-12 mb-4" strokeWidth={2} />
            <h1 className="text-2xl font-bold text-white mb-2 tracking-wide">AKS-E-SHAJR</h1>
            <p className="text-gray-400 text-xs">Ecological Monitoring &amp; Analysis</p>
          </>
        )}
      </div>

      {/* ── Main Card ── */}
      <Card className={`w-full max-w-[400px] bg-surface-elevated rounded-lg shadow-2xl relative z-10 flex flex-col items-center border ${view === 'reset' || view === 'reset-success' ? 'border-t-2 border-primary border-x-border border-b-border' : 'border-border'}`}>
        <CardContent className="w-full flex flex-col items-center pt-8">

          {/* Forgot-password intro text */}
          {view === 'reset' && (
            <p className="text-muted text-[13px] leading-relaxed mb-6 w-full text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          )}

          {/* ── API error banner ── */}
          {authError && (
            <div className="w-full flex items-start gap-2 mb-4 p-3 rounded border border-destructive/30 bg-destructive/10">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-destructive text-xs leading-relaxed">{authError}</p>
            </div>
          )}

          {/* ── Reset-sent confirmation ── */}
          {view === 'reset-success' ? (
            <div className="w-full flex flex-col items-center py-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(41,168,90,0.2)]">
                <CheckCircle2 className="w-9 h-9 text-primary animate-bounce" />
              </div>
              <p className="text-white font-bold text-base text-center mb-2">Verification Sent!</p>
              <p className="text-muted text-xs text-center leading-relaxed mb-6">
                We've sent a secure password reset link to <strong className="text-white font-semibold">{email}</strong>. Please check your email account.
              </p>

              {resendSuccess && (
                <div className="w-full flex items-start gap-2 mb-4 p-3 rounded border border-primary/30 bg-primary/10">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-primary text-xs leading-relaxed">A new reset link has been successfully sent!</p>
                </div>
              )}

              <div className="w-full flex flex-col gap-3">
                <Button
                  onClick={handleResendResetEmail}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-hover text-background font-semibold h-11 flex items-center justify-center gap-2 group shadow-[0_0_10px_rgba(41,168,90,0.2)] hover:shadow-[0_0_20px_rgba(41,168,90,0.4)] transition-all"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Resend Email</span>
                      <RotateCcw className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => switchView('login')}
                  className="w-full text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2 h-11 border border-border bg-transparent hover:bg-white/[0.02]"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Button>
              </div>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full" noValidate>

              {/* Full Name (signup only) */}
              {view === 'signup' && (
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold text-muted">Full Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className={`pl-10 ${errors.fullName ? 'border-destructive focus-visible:ring-destructive' : 'border-border focus-visible:ring-primary'}`}
                      placeholder="Dr. Jane Doe"
                    />
                  </div>
                  {errors.fullName && <span className="text-destructive text-xs">{errors.fullName}</span>}
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-muted">
                  {view === 'login' ? 'Email' : 'Email Address'}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : 'border-border focus-visible:ring-primary'}`}
                    placeholder={view === 'reset' ? 'analyst@domain.com' : 'jane@institute.org'}
                  />
                </div>
                {errors.email && <span className="text-destructive text-xs">{errors.email}</span>}
              </div>

              {/* Password (login + signup only) */}
              {view !== 'reset' && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs font-semibold text-muted">Password</Label>
                    {view === 'login' && (
                      <Button
                        variant="link"
                        type="button"
                        onClick={() => switchView('reset')}
                        className="text-xs text-muted hover:text-white p-0 h-auto font-normal no-underline"
                      >
                        Forgot password?
                      </Button>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className={`pl-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : 'border-border focus-visible:ring-primary'}`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && <span className="text-destructive text-xs">{errors.password}</span>}
                </div>
              )}

              {/* Confirm Password (signup only) */}
              {view === 'signup' && (
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold text-muted">Confirm Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className={`pl-10 ${errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : 'border-border focus-visible:ring-primary'}`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <span className="text-destructive text-xs">{errors.confirmPassword}</span>}
                </div>
              )}

              {/* Terms checkbox (signup only) */}
              {view === 'signup' && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeTerms}
                      onChange={e => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 bg-surface-input border-border rounded text-primary focus:ring-primary focus:ring-offset-surface-elevated appearance-none checked:bg-primary transition-colors cursor-pointer"
                    />
                    {agreeTerms && (
                      <svg className="w-3 h-3 absolute left-0.5 top-0.5 pointer-events-none text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <Label htmlFor="terms" className="text-[11px] text-muted cursor-pointer font-normal">
                    I agree to the <span className="text-primary hover:underline">Terms of Service</span> and <span className="text-primary hover:underline">Privacy Policy</span>.
                  </Label>
                </div>
              )}
              {view === 'signup' && errors.agreeTerms && (
                <span className="text-destructive text-xs -mt-2">{errors.agreeTerms}</span>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                disabled={loading}
                className={`w-full mt-2 font-semibold flex items-center justify-center gap-2 group h-11 ${
                  view === 'reset'
                    ? 'bg-primary hover:bg-primary-hover text-background'
                    : 'bg-primary-dark hover:bg-primary text-foreground hover:text-background'
                }`}
              >
                {loading ? (
                  // Loading spinner
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {view === 'login' ? 'Login' : view === 'signup' ? 'Create Account' : 'Send Reset Link'}
                    </span>
                    {view === 'reset'
                      ? <Send className="w-4 h-4" />
                      : <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    }
                  </>
                )}
              </Button>
            </form>
          )}

          {/* ── Footer navigation ── */}
          {view !== 'reset-success' && (
            view === 'reset' ? (
              <div className="w-full mt-6">
                <hr className="border-border mb-6" />
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => switchView('login')}
                  className="w-full flex items-center justify-center gap-2 text-sm text-muted hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Button>
              </div>
            ) : (
              <div className="mt-6 text-center text-sm text-muted">
                {view === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <Button
                  variant="link"
                  type="button"
                  onClick={() => switchView(view === 'login' ? 'signup' : 'login')}
                  className="text-primary hover:text-primary-hover p-0 h-auto font-medium"
                >
                  {view === 'login' ? 'Sign up' : 'Log in'}
                </Button>
              </div>
            )
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
