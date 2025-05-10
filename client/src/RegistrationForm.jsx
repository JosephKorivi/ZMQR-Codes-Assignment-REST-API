import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register/users', formData);
            setMessage(res.data.message);
            setFormData({ name: '', email: '', password: '' });
        } catch (err) {
            setMessage(err.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2 style={styles.heading}>Create Your Account</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputContainer}>
                        <label htmlFor="name" style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputContainer}>
                        <label htmlFor="email" style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputContainer}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            style={styles.input}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    {message && <p style={styles.message}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)', 
        backgroundColor: '#f4f7fc',
    },
    formWrapper: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center',
    },
    heading: {
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: '14px',
        color: '#444',
        marginBottom: '8px',
        fontWeight: '600',
    },
    input: {
        padding: '12px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '100%',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    inputFocus: {
        borderColor: '#4CAF50',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
    message: {
        marginTop: '15px',
        color: '#FF6F61',
        fontSize: '14px',
    },
};

export default RegistrationForm;
