const app = require("./src/app");
const db = require("./src/config/db");

const PORT = process.env.PORT || 3000;

db.connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });