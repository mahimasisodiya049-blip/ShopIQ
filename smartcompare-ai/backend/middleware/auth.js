import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT authentication token in incoming requests.
 * Allows optional access if no token is provided, or enforces protection if needed.
 */
export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            req.user = decoded;
            return next();
        } catch (error) {
            console.error('Auth Middleware Error:', error.message);
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed verification.',
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token provided.',
        });
    }
};

/**
 * Optional authentication middleware that attaches user info if a valid token is present,
 * but allows unauthenticated requests to proceed.
 */
export const optionalAuth = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            req.user = decoded;
        } catch (error) {
            console.warn('Optional Auth Token Error:', error.message);
        }
    }
    next();
};