const pool = require('../../models/database');
const fs = require('fs');

module.exports = async (req, res) =>{
    try {


        //ถ้าจะให้ query ง่ายและ return เป็น array ชั้นเดียวให้ใช้ pool.execute แทน pool.query ค่อยมาแก้
        const data = await pool.query(
            `SELECT ag.genre_id,anime_image, episode_number, e.title Etitle, a.title Atitle, description, g.genre_name
            from anime a
            JOIN episode e
            USING (anime_id)
            JOIN anime_genre ag
            USING(anime_id)
            JOIN genre g
            ON ag.genre_id = g.genre_id
            WHERE a.title = 'Spy classroom ss1'`)


        const imageData = data[0][0].anime_image
        const imageBase64 = Buffer.from(imageData).toString('base64');
        const descriptionData = data[0][0].description
        const titleAnimeData = data[0][0].Atitle
        const titleEpisodeData = data[0][0].Etitle
        const episode_number = data[0][0].episode_number

        //เดี๋ยวทำเป็น list
        const genreData = data[0][0].genre_name

        const responseData = {
            image:imageBase64,
            description:descriptionData,
            genre: genreData,
            AnimeTitle: titleAnimeData,
            EpisodeTitle: titleEpisodeData,
            EpisodeNumber: episode_number
        }

        //test แปลงไฟล์กลับเป็น mp4
        // const base64Data = responseData.anime_file;
        // const binaryData = Buffer.from(animeBase64, 'base64');

        // Write the decoded binary data to a file
        // fs.writeFileSync('decoded_movie.mp4', binaryData);

        // console.log(data)
        // console.log(imageData)

        console.log("Misha คั่นหน้า basic_info")
        // console.log("File size:", file.size, "bytes");
        // console.log(file_url);
        res.send(responseData)
    }
    catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}