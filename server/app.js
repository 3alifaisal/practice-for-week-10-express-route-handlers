// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');
const express = require('express');
const app = express();

// Your code here
app.use(express.json());
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

app.get("/artists" ,(req,res) => {
  res.status(200).json(getAllArtists())
} )

app.post("/artists",(req,res) => {
let newArtist = addArtist(req.body);
res.status(201).json(newArtist);
})

app.get("/artists/latest",(req,res) => {
  let latestArtist = getLatestArtist();
  res.status(200).json(latestArtist);
})

app.get("/artists/latest/albums",(req,res) => {
  let artistsLatestAlbums = getAlbumsForLatestArtist();
  res.status(200).json(artistsLatestAlbums);
})
app.get("/artists/:artistId", (req,res) => {
  let artistId = req.params.artistId;
  let artist = getArtistByArtistId(artistId)
  res.status(200).json(artist);
})


function editArtist(req,res) {
  let artistId = req.params.artistId;
  let data = req.body;
  const editedArtist = editArtistByArtistId(artistId,data);
  res.status(200).json(editedArtist)
}
app.patch("/artists/:artistId", editArtist)
app.put("/artists/:artistId", editArtist)

app.delete("/artists/:artistId", (req,res) => {
  let artistId = req.params.artistId;
  deleteArtistByArtistId(artistId);
  let deleteSuccessMessage = {
    "message": "Successfully deleted"
  }
  res.status(200).json(deleteSuccessMessage);
})

app.get("/artists/:artistId/albums", (req,res) => {
  let artistId = req.params.artistId;
  const albumsByArtistId = getAlbumsByArtistId(artistId);
  res.status(200).json(albumsByArtistId)
})
app.get("/albums/:albumId",(req,res)=> {
  let albumId = req.params.artistId;
  const albumByAlbumId = getAlbumByAlbumId(albumId);
  res.status(200).json(albumByAlbumId);
})
app.post("/artists/:artistId/albums", (req,res)=> {
  let artistId = req.params.artistId;
  let data = req.body;
  const newAlbum = addAlbumByArtistId(artistId,data);
  res.status(201).json(newAlbum)
})

const  editAlbum = (req,res) => {
  let albumId =req.params.albumId;
  data = req.body;
  const editedAlbum = editAlbumByAlbumId(albumId,data);
  res.status(200).json(editedAlbum)

}
app.put("/albums/:albumId",editAlbum)
app.patch("/albums/:albumId", editAlbum)


app.delete("/albums/:albumId", (req,res) => {
  let albumId = req.params.albumId;
  deleteAlbumByAlbumId(albumId);
  let deleteSuccessMessage = {
    "message": "Successfully deleted"
  }
  res.status(200).json(deleteSuccessMessage)
})

app.get("/albums",(req,res)=> {
  let startsWith = req.query.startsWith
  const filteredAlbums = getFilteredAlbums(startsWith);
  res.status(200).json(filteredAlbums)
})

app.get("/songs/:songId",(req,res)=> {
  let songId = req.params.songId;
  let song = getSongBySongId(songId);
  res.status(200).json(song)
})

app.post("/albums/:albumId/songs",(req,res)=> {
  let albumId = req.params.albumId;
  let data = req.body;
  const newSong = addSongByAlbumId(albumId,data);
  res.status(201).json(newSong)
})
app.get("/artists/:artistId/songs",(req,res)=> {
  let artistId = req.params.artistId;
  const songs = getSongsByArtistId(artistId);
  res.status(200).json(songs);
})
app.get("/albums/:albumId/songs",(req,res)=> {
  let albumId = req.params.albumId;
  const songs = getSongsByAlbumId(albumId);
  res.status(200).json(songs);
})

const editSong= (req,res) =>{
  let songId = req.params.songId;
  let data = req.body;
  const editedSong = editSongBySongId(songId,data);
  res.status(200).json(editedSong)

}
app.put("/songs/:songId",editSong)
app.patch("/songs/:songId", editSong)

app.delete("/songs/:songId",(req,res)=> {
  let songId = req.params.songId;
  deleteSongBySongId(songId);
  let deleteSuccessMessage = {
    "message": "Successfully deleted"
  }
  res.status(200).json(deleteSuccessMessage)
})
// DO NOT MODIFYv\=-;'l-

if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}