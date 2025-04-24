
'use client';
import { useState } from 'react';

export default function AlertPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('This is an emergency alert from Live Shield.');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/send-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, message })
    });

    if (res.ok) {
      setStatus('Alert sent successfully!');
    } else {
      const errorData = await res.json();
      setStatus(`Failed to send alert: ${errorData.error}`);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Send Emergency Alert</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send Alert
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
