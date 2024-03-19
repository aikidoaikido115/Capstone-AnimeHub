const pool = require('../../models/database');
const { Readable } = require('stream');

module.exports = async (req, res) =>{
    try {
        const data = await pool.query(
            `SELECT anime_file
            from anime
            JOIN episode
            USING (anime_id)
            WHERE episode_id = 4`)

        //ย้ายไป เลือกคลิปที่ sql เพื่อ performance code ที่เร็วกว่า
        const animeFile = data[0][0].anime_file

        const stream = new Readable();
        stream.push(animeFile);
        stream.push(null); // End the stream

        // Set appropriate headers for video streaming
        res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': Buffer.byteLength(animeFile)
        });

        // Pipe the stream to the response
        stream.pipe(res);
    }
    catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}