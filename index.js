require("dotenv/config")
require("./db")
const cors = require("cors");
const express = require('express')
const { videoRouter } = require("./routes/video")
require("./controllers/video");

const app = express()
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use("/videos", videoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})