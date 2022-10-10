export const protect = (req: any, res: any, next: any) => {
    const { user } = req.session
    if (!user) {
        return res.status(401).json({
            status: 'fail',
            message: 'unauthorized',
        })
    }

    req.user = user
    next()
}
