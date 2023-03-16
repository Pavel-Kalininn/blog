import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="wrapper">
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/">Return to homepage</Link>
    </div>
  );
}
