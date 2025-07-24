const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Helper function to get the real IP address
function getRealIP(req) {
  // Check various headers that might contain the real IP
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  const clientIP = req.headers['x-client-ip'];
  const forwardedProto = req.headers['x-forwarded-proto'];
  
  // If behind a proxy/load balancer, get the first IP from x-forwarded-for
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim();
  }
  
  // Check other possible headers
  if (realIP) {
    return realIP;
  }
  
  if (clientIP) {
    return clientIP;
  }
  
  // Fallback to connection remote address
  if (req.connection && req.connection.remoteAddress) {
    return req.connection.remoteAddress;
  }
  
  // Fallback to socket remote address
  if (req.socket && req.socket.remoteAddress) {
    return req.socket.remoteAddress;
  }
  
  // Last resort - req.ip (Express built-in)
  return req.ip || req.connection.remoteAddress || '127.0.0.1';
}

// Main API endpoint: /api/whoami
app.get('/api/whoami', (req, res) => {
  try {
    // Extract IP address (handle proxies and load balancers)
    const ipaddress = getRealIP(req);
    
    // Extract preferred language from Accept-Language header
    const language = req.headers['accept-language'] || 'en-US';
    
    // Extract user agent (software) from User-Agent header
    const software = req.headers['user-agent'] || 'Unknown';
    
    // Return the parsed header information
    res.json({
      ipaddress: ipaddress,
      language: language,
      software: software
    });
    
  } catch (error) {
    // Handle any errors
    console.error('Error parsing headers:', error);
    res.status(500).json({
      error: 'Unable to parse request headers'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Request Header Parser Microservice'
  });
});

// Handle 404 for API routes
app.get('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    available: ['/api/whoami', '/api/health']
  });
});

// Start the server
app.listen(PORT, () => {
  console.log('🚀 Request Header Parser Microservice running on port', PORT);
  console.log('📡 API available at: http://localhost:' + PORT + '/api/whoami');
  console.log('🌐 Frontend available at: http://localhost:' + PORT);
});
