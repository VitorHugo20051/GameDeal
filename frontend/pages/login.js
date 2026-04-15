import { login } from '@/lib/api';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {useAuth} from '@/context/AuthContext';


export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const {checkUser} = useAuth();

    const handleLogin = async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            await login(email, password);
            await checkUser();
            router.push('/');
        } catch (e) {
            console.error(e);
            setErrorMsg(e.response?.data?.error || 'Error logging in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container animate-in">
            <h2 className="form-title" style={{ color: 'var(--accent2)' }}>Welcome Back</h2>
            <p className="text-center mb-4" style={{ color: 'var(--muted)' }}>Log in to access your watchlist and deals.</p>

            {errorMsg && (
                <div style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '12px', borderRadius: 'var(--radius)', textAlign: 'center', fontSize: '14px', marginBottom: '8px' }}>
                    {errorMsg}
                </div>
            )}

            <div className="flex-col gap-2">
                <label style={{ fontSize: '14px', fontWeight: 500 }}>Email address</label>
                <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="flex-col gap-2 mb-4">
                <label style={{ fontSize: '14px', fontWeight: 500 }}>Password</label>
                <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>

            <button className="btn btn-primary" style={{ justifyContent: 'center', padding: '12px' }} onClick={handleLogin} disabled={loading}>
                {loading ? <span className="spinner"></span> : 'Login'}
            </button>

            <p className="text-center mt-4" style={{ fontSize: '14px', color: 'var(--muted)' }}>
                Dont have an account? <Link href="/register" style={{ color: 'var(--accent)' }}>Sign up</Link>
            </p>
        </div>
    );
}