"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const protect = (req, res, next) => {
    const { user } = req.session;
    if (!user) {
        return res.status(401).json({
            status: 'fail',
            message: 'unauthorized',
        });
    }
    req.user = user;
    next();
};
exports.protect = protect;
