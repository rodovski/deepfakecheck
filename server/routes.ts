import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import FormData from "form-data";
import axios from "axios";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed'));
      return;
    }
    cb(null, true);
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.post('/api/analyze', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size exceeds 10MB limit' });
        }
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  }, async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const apiUser = process.env.SIGHTENGINE_API_USER;
      const apiSecret = process.env.SIGHTENGINE_API_SECRET;

      if (!apiUser || !apiSecret) {
        return res.status(500).json({ error: 'API credentials not configured' });
      }

      const formData = new FormData();
      formData.append('media', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });
      formData.append('models', 'genai');
      formData.append('api_user', apiUser);
      formData.append('api_secret', apiSecret);

      const response = await axios.post(
        'https://api.sightengine.com/1.0/check.json',
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 30000,
        }
      );

      const data = response.data;

      let verdict: 'authentic' | 'deepfake' | 'uncertain' = 'uncertain';
      let confidence = 50;
      const details: { label: string; value: string }[] = [];

      if (data.type?.ai_generated) {
        const aiScore = data.type.ai_generated;
        confidence = Math.round((1 - aiScore) * 100);
        
        if (aiScore > 0.7) {
          verdict = 'deepfake';
        } else if (aiScore < 0.3) {
          verdict = 'authentic';
        }

        details.push({
          label: 'AI Generation Score',
          value: aiScore.toFixed(2),
        });
      }

      if (data.media?.id) {
        details.push({
          label: 'Media ID',
          value: data.media.id,
        });
      }

      if (data.status === 'success') {
        details.push({
          label: 'Analysis Status',
          value: 'Completed',
        });
      }

      const result = {
        confidence,
        verdict,
        details,
        timestamp: new Date().toISOString(),
        filename: req.file.originalname,
        rawResponse: data,
      };

      res.json(result);
    } catch (error: any) {
      console.error('Sightengine API error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        return res.status(401).json({ error: 'Invalid API credentials' });
      }
      
      res.status(500).json({ 
        error: 'Failed to analyze image',
        details: error.message 
      });
    }
  });

  app.use((err: any, req: any, res: any, next: any) => {
    console.error('Unhandled error:', err);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal server error',
        details: err.message || 'An unexpected error occurred',
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
