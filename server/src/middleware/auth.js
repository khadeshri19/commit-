import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'commit-tracker-super-secret-jwt-key-90-days-upgrade';

/**
 * Authentication Middleware:
 * 1. Extracts Authorization header `Bearer <token>`
 * 2. Verifies the cryptographic signature using JWT_SECRET
 * 3. Looks up the user in database to ensure account is active
 * 4. Injects user payload into `req.user`
 * 
 * TODO [LEARNING]: In Spring Boot Security, this is equivalent to:
 * OncePerRequestFilter -> JwtAuthenticationFilter -> SecurityContextHolder.getContext().setAuthentication(authToken)
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ 
      error: 'Unauthorized: Missing git authentication token. Please sign in.' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ 
        error: 'Forbidden: Invalid or expired session token. Please re-authenticate.' 
      });
    }

    const user = db.findUserById(decodedUser.id);
    if (!user) {
      return res.status(401).json({ 
        error: 'Unauthorized: User account no longer exists.' 
      });
    }

    // Attach user information to request context
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      targetRole: user.targetRole,
      sprintStartDate: user.sprintStartDate
    };
    next();
  });
}
