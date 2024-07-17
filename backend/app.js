/*const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");



mongoose.set("strictQuery", true);
dotenv.config({ path: "./.env" });
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// middleware

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000" // frontend URI (ReactJS)
}

app.use(cors(corsOptions));


// connect MongoDB


    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })


// route
app.get("/", (req, res) => {
    console.log("hey there");
    res.status(201).json({message: "Connected to Backend!"});
   
});

app.use("/", require("./routes/router.js"));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();*/

/*


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Razorpay=require("razorpay");
var cors = require("cors");
app.use(bodyParser({limit: '50mb'}));
app.use(cors());
mongoose.set("strictQuery", true);
dotenv.config({ path: "./.env" });
// app.set("veiw engine", "html");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("BackEnd");
});
app.use(morgan("tiny"));
// Connection with MongoDB


//Parse Request to the Body
// app.use(bodyparser.urlencoded({ extended: true }));

// To Load The routers
app.use("/", require("./routes/router"));

app.listen(PORT, () => {
  console.log(` Backend is running at http://localhost:${PORT}`);
});


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();
*/

/*  chat integration
const express = require("express");
const app = express();
const http = require('http').createServer(app); // Import http module
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const cors = require("cors");

app.use(bodyParser({ limit: '50mb' }));
app.use(cors());
mongoose.set("strictQuery", true);
dotenv.config({ path: "./.env" });
// app.set("veiw engine", "html");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("BackEnd");
});
app.use(morgan("tiny"));

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    console.log('Message received:', data.message);
    io.emit('message', data.message); // Broadcast the message to all connected clients, including the sender
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Connection with MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

// To Load The routers
app.use("/", require("./routes/router"));

// Start the server
http.listen(PORT, () => {
  console.log(`Backend is running at http://localhost:${PORT}`);
});
*/

const redis = require('redis');
const express = require("express");
const app = express();
const http = require('http').createServer(app); 
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const { fetchQuestions } = require("./controllers/questions.js");
const { fetchAnimals } = require("./controllers/getanimals.js");
app.use(bodyParser({ limit: '50mb' }));
app.use(cors());
mongoose.set("strictQuery", true);
dotenv.config({ path: "./.env" });
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("BackEnd");
});
app.use(morgan("tiny"));

// Create a new Redis client with authentication


const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

// Redis error handling
redisClient.on("error", (error) => {
  console.error("Redis Error:", error);
});

(async () => {
  try {
    // Connect to Redis
    await redisClient.connect();
    console.log("Connected to Redis");

    // Socket.IO setup
    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('message', (data) => {
        console.log('Message received:', data.message);
        io.emit('message', data.message); // Broadcast the message to all connected clients, including the sender
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });

    // Connection with MongoDB
    const connectDB = async () => {
      try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {});
        console.log(`MongoDB connected ${conn.connection.host}`);
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    };
    connectDB();

    // To Load The routers
    app.use("/", require("./routes/router"));

    app.get("/datafromredis", async (req, res) => {
      try {
        // Check if data is cached in Redis
        const data = await redisClient.get("cachedData");

        if (data !== null) {
          console.log("Data found in Redis cache");
          return res.json(JSON.parse(data));
        } else {
          console.log("Data not found in Redis cache");
          // If data is not cached, fetch it from MongoDB using the controller function and cache it in Redis
          const result = await fetchQuestions(); // Call the controller function to fetch data from MongoDB
          await redisClient.setEx("cachedData", 3600, JSON.stringify(result)); // Cache data for 1 hour
          return res.json(result);
        }
      } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });



    app.get("/getanimaldatafromredis", async (req, res) => {
      try {
        // Check if data is cached in Redis
        const data = await redisClient.get("animaldata");
      
        if (data !== null) {
          console.log("Data found in Redis cache");
          return res.json(JSON.parse(data));
        } else {
          console.log("Data not found in Redis cache");
          // If data is not cached, fetch it from MongoDB using the controller function and cache it in Redis
          const result = await fetchAnimals(); // Call the controller function to fetch data from MongoDB
          await redisClient.setEx("animaldata", 3600, JSON.stringify(result)); // Cache data for 1 hour
          return res.json(result);
        }
      } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });


    

    // Start the server
    http.listen(PORT, () => {
      console.log(`Backend is running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();
