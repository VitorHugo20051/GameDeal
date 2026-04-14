import {register} from '@/lib/api';
import { useState } from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            await register(email, password);
            router.push('/login');
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container animate-in">
            <h2 className="form-title" style={{color: 'var(--accent)'}}>Create an Account</h2>
            <p className="text-center mb-4" style={{color: 'var(--muted)'}}>Join us to track the best game deals.</p>
            
            <div className="flex-col gap-2">
                <label style={{fontSize: '14px', fontWeight: 500}}>Email address</label>
                <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            
            <div className="flex-col gap-2 mb-4">
                <label style={{fontSize: '14px', fontWeight: 500}}>Password</label>
                <input className="input" type="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleRegister()} />
            </div>
            
            <button className="btn btn-primary" style={{justifyContent: 'center', padding: '12px'}} onClick={handleRegister} disabled={loading}>
                {loading ? <span className="spinner"></span> : 'Register'}
            </button>
            
            <p className="text-center mt-4" style={{fontSize: '14px', color: 'var(--muted)'}}>
                Already have an account? <Link href="/login" style={{color: 'var(--accent)'}}>Log in</Link>
            </p>
        </div>
    );
}