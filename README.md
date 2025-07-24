# 🔍 Request Header Parser Microservice

FreeCodeCamp Back End Development and APIs Project - Request Header Parser Microservice

## 📋 Project Description

A microservice that parses HTTP request headers and returns information about the client making the request, including IP address, preferred language, and user agent software.

## 🚀 Live Demo

- **Frontend Interface**: [Your deployed URL here]
- **API Endpoint**: [Your deployed URL]/api/whoami

## 📋 API Documentation

### Endpoint
```
GET /api/whoami
```

### Response Format
```json
{
  "ipaddress": "192.168.1.100",
  "language": "en-US,en;q=0.9,vi;q=0.8",
  "software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}
```

### Response Fields

| Field | Description | Source Header |
|-------|-------------|---------------|
| `ipaddress` | Client's IP address | `x-forwarded-for`, `x-real-ip`, or connection IP |
| `language` | Preferred language(s) | `accept-language` |
| `software` | User agent string | `user-agent` |

## 🧪 Test Cases

### Basic Test
```bash
curl https://your-app.railway.app/api/whoami
```

**Expected Response:**
```json
{
  "ipaddress": "203.0.113.1",
  "language": "en-US,en;q=0.5",
  "software": "curl/7.68.0"
}
```

### Browser Test
Visit: `https://your-app.railway.app/api/whoami`

**Expected Response:**
```json
{
  "ipaddress": "203.0.113.1", 
  "language": "en-US,en;q=0.9,fr;q=0.8",
  "software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
}
```

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/request-header-parser-microservice-fcc.git
   cd request-header-parser-microservice-fcc
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Development mode:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

6. **Test the API:**
   ```
   http://localhost:3000/api/whoami
   ```

## 🔧 Technical Implementation

### IP Address Detection
The service handles various proxy scenarios:
- `x-forwarded-for` header (load balancers, proxies)
- `x-real-ip` header (nginx proxy)
- `x-client-ip` header (alternative proxy header)
- Connection remote address (direct connection)

### Language Parsing
Extracts the complete `Accept-Language` header which may include:
- Primary language: `en-US`
- Quality values: `en-US,en;q=0.9,fr;q=0.8`
- Multiple languages in preference order

### User Agent Detection
Returns the complete `User-Agent` header containing:
- Browser name and version
- Operating system information
- Rendering engine details

## 🚀 Deployment

This project can be deployed on:
- **Railway** (recommended)
- **Vercel**
- **Render**
- **Heroku**
- **Netlify Functions**

### Railway Deployment
1. Connect GitHub repository
2. Railway auto-detects Node.js
3. Deploys automatically
4. Generates public URL

## 📦 Dependencies

- **Express.js**: Web framework for API endpoints
- **CORS**: Cross-origin resource sharing
- **Nodemon**: Development server (dev dependency)

## 🔍 Headers Handled

| Header | Purpose | Example |
|--------|---------|---------|
| `x-forwarded-for` | Real IP behind proxy | `203.0.113.1, 198.51.100.1` |
| `x-real-ip` | Real IP (nginx) | `203.0.113.1` |
| `accept-language` | Language preference | `en-US,en;q=0.9,fr;q=0.8` |
| `user-agent` | Browser/client info | `Mozilla/5.0 (Windows...)` |

## ✅ FreeCodeCamp Requirements

- [x] Request to `/api/whoami` returns JSON object
- [x] JSON has `ipaddress` key with client IP
- [x] JSON has `language` key with preferred language  
- [x] JSON has `software` key with user agent string
- [x] Handles different client types (browser, curl, etc.)
- [x] Works behind proxies and load balancers

## 🧪 Testing

### Manual Testing
```bash
# Test with curl
curl -H "Accept-Language: es-ES,es;q=0.9" \
     -H "User-Agent: Custom-Agent/1.0" \
     https://your-app.railway.app/api/whoami

# Test with different IP headers
curl -H "X-Forwarded-For: 192.168.1.100" \
     https://your-app.railway.app/api/whoami
```

### Browser Testing
1. Open developer tools
2. Visit `/api/whoami`
3. Check Network tab for request headers
4. Verify response matches sent headers

## 📈 Additional Features

- **Health Check**: `GET /api/health`
- **Error Handling**: Graceful error responses
- **Header Validation**: Handles missing headers
- **CORS Support**: Cross-origin requests allowed

## 📝 Author

Created for FreeCodeCamp Back End Development and APIs Certification

## 📄 License

MIT License
