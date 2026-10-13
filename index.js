const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const api = process.env.API;
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-fs-backend");

i18next
  .use(Backend) // قراءة ملفات JSON[cite: 8]
  .use(i18nextMiddleware.LanguageDetector) // اكتشاف لغة المستخدم أوتوماتيك[cite: 8]
  .init({
    lng: "en", // اللغة الافتراضية لو المكتشف ملقاش لغة[cite: 8]
    backend: {
      loadPath: "./locales/{{lng}}.json", // مسار ملفات الترجمة[cite: 8]
    },
  });

app.use(express.json());
app.use(i18nextMiddleware.handle(i18next));

app.get(`${api}/health`, (req, res) => {
  res.send(req.t("orderNotFound"));
});

mongoose
  .connect(process.env.connection_string)
  .then(() => console.log("Connected to MongoDB <+ ~ +>"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
