const ytDlp = require("yt-dlp-exec");
const path = require("path");
const fs = require("fs");

const downloadController = async (req, res) => {
    try {

        // 1) نستقبل الرابط من الفرونت
        const { url } = req.body;

        // 2) نتأكد أن الرابط موجود
        if (!url) {
            return res.status(400).json({
                message: "URL is required"
            });
        }

        // 3) نجلب معلومات الفيديو بدون تنزيله
        const info = await ytDlp(url, {
            dumpSingleJson: true
        });

        // 4) نأخذ عنوان الفيديو
        const title = info.title;

        // 5) ننشئ اسم الملف
        const fileName = `${title}.mp4`;

        // 6) نحدد المكان الذي سيُحفظ فيه
        const output = path.join(
            __dirname,
            "../downloads",
            fileName
        );

        // 7) ننزل الفيديو
        await ytDlp(url, {
            output,
            format: "bv*+ba/b",
            mergeOutputFormat: "mp4"
        });

        // 8) نرسل الملف للمستخدم
        res.download(output, () => {

            // 9) بعد انتهاء الإرسال نحذف الملف من السيرفر
            fs.unlink(output, (err) => {
                if (err) console.log(err);
            });

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Download failed"
        });

    }
};

module.exports = downloadController;