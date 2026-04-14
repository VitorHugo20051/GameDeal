import {register} from '@/lib/api';
import { useState } from 'react';
import {useRouter} from 'next/router';

export default function Register() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={async() => {
            await register(email, password);
            router.push('/login');
        }}>Register</button>
        </div>
    );

}