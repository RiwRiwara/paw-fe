'use client';

import AuthDebug from '../../components/AuthDebug';

export default function AuthDebugPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Authentication Debug Page</h1>
      <p className="mb-4">
        This page helps debug authentication issues by displaying session information 
        and testing API requests.
      </p>
      
      <AuthDebug />
    </div>
  );
}
