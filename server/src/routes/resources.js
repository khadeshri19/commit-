import express from 'express';
import { db } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

/**
 * GET /api/resources
 * Retrieve all curated and user-added YouTube resources
 */
router.get('/', (req, res) => {
  const { track, phaseTag, status } = req.query;
  let resources = db.getUserResources(req.user.id);

  if (track && track !== 'ALL') {
    resources = resources.filter(r => r.track === track);
  }
  if (phaseTag && phaseTag !== 'ALL') {
    resources = resources.filter(r => r.phaseTag.includes(phaseTag));
  }
  if (status && status !== 'ALL') {
    resources = resources.filter(r => r.status === status);
  }

  const stats = {
    total: resources.length,
    watched: resources.filter(r => r.status === 'watched').length,
    inProgress: resources.filter(r => r.status === 'in_progress').length,
    notStarted: resources.filter(r => r.status === 'not_started').length
  };

  res.json({ resources, stats });
});

/**
 * PUT /api/resources/:id/status
 * Update status of a video/playlist (watched, in_progress, not_started)
 */
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['watched', 'in_progress', 'not_started'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value. Must be watched, in_progress, or not_started.' });
  }

  const updated = db.updateResourceStatus(req.user.id, id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Resource not found.' });
  }

  res.json({ resource: updated });
});

/**
 * POST /api/resources
 * Add a custom YouTube video/playlist link
 */
router.post('/', (req, res) => {
  const { title, channel, embedUrl, track, phaseTag, description, tags } = req.body;

  if (!title || !embedUrl) {
    return res.status(400).json({ error: 'Title and YouTube embed URL are required.' });
  }

  // Convert standard youtube watch or share link to embed URL if needed
  let cleanEmbedUrl = embedUrl.trim();
  if (cleanEmbedUrl.includes('watch?v=')) {
    const videoId = cleanEmbedUrl.split('watch?v=')[1]?.split('&')[0];
    cleanEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (cleanEmbedUrl.includes('youtu.be/')) {
    const videoId = cleanEmbedUrl.split('youtu.be/')[1]?.split('?')[0];
    cleanEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (cleanEmbedUrl.includes('playlist?list=')) {
    const listId = cleanEmbedUrl.split('playlist?list=')[1]?.split('&')[0];
    cleanEmbedUrl = `https://www.youtube.com/embed/videoseries?list=${listId}`;
  }

  const created = db.addCustomResource(req.user.id, {
    title,
    channel,
    embedUrl: cleanEmbedUrl,
    track,
    phaseTag,
    description,
    tags
  });

  res.status(201).json({ resource: created });
});

export default router;
