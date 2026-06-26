export const healthCheck = (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Interview Copilot API Running"
    });
};