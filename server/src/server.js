import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import commitRoutes from './routes/commits.js';
import dsaRoutes from './routes/dsa.js';
import roadmapRoutes from './routes/roadmap.js';
import resourceRoutes from './routes/resources.js';
import statsRoutes from './routes/stats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite dev server (5173) and production origins
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// API Request Logger for terminal vibe
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    console.log(`[commit-api] ${req.method.padEnd(6)} ${req.originalUrl} -> ${statusColor}${res.statusCode}\x1b[0m (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    version: '1.0.0',
    service: 'commit:// dev-upgrade-tracker API',
    runtime: 'Node.js',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/commits', commitRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/stats', statsRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[commit-api-error]', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 commit:// API Server listening on http://localhost:${PORT}`);
  console.log(`📦 Architecture: Express + JWT + Striver A2Z + 90-Day Roadmap`);
  console.log(`======================================================\n`);
});
