// Import the required modules
import express from "express";

// Import your helper functions for your first resource here
import {
  getArtists,
  getArtistsById,
  createArtists,
  updateArtistsById,
  deleteArtistsById,
} from "./resource_one.js";

// Import your helper functions for your second resource here
// import {
//   getResourceTwo,
//   getResourceTwoById,
//   createResourceTwo,
//   updateResourceTwoById,
//   deleteResourceTwoById,
// } from "./resource_two.js";

// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Resource One Route Handlers

// Endpoint to retrieve all <resource_one>
app.get("/artists/", async function (req, res) {
  // console.log("I'm alive");
  const artists = await getArtists();
  res.status(200).send({ status: "Success", data: artists });
});

// Endpoint to retrieve a <resource_one> by id
app.get("/artists/:id", async function (req, res) {
  const id = req.params.id;
  const artists = await getArtistsById(id);
  res.status(200).send({ status: "Success", data: artists });

  if (!artists) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Artist not found" } });
  }
  res.status(200).json({ status: "success", data: artists });
});

// Endpoint to create a new <resource_one>
app.post("/artists/", async function (req, res) {
  const data = req.body;
  const newArtist = await createArtists(data);
  res.status(301).json({ status: "success", data });
});

// Endpoint to update a specific <resource_one> by id
app.patch("/artists/:id", async function (req, res) {
  const data = req.body.id;
  const artists = await getArtists();
  const updateArtist = await updateArtistsById(data);
  res.status(301).json({ status: "success", data: updateArtist });
});

// Endpoint to delete a specific <resource_one> by id
app.delete("/resourceone/:id", async function (req, res) {});

// Resource Two Route Handlers

// Endpoint to retrieve all <resource_twos>
app.get("/resourcetwo/", async function (req, res) {
  const authors = await getAuthors();
  res.status(200).json({ status: "success", data: authors });
});

// Endpoint to retrieve a <resource_twos> by id
app.get("/resourcetwo/:id", async function (req, res) {});

// Endpoint to create a new <resource_twos>
app.post("/resourcetwo/", async function (req, res) {});

// Endpoint to update a specific <resource_twos> by id
app.patch("/resourcetwo/:id", async function (req, res) {});

// Endpoint to delete a specific <resource_twos> by id
app.delete("/resourcetwo/:id", async function (req, res) {});

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
