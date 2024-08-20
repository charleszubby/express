import mydotenv from "dotenv";
mydotenv.config();
import express from "express";

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("./Public"));

const port = process.env.PORT;

const workingHours = (req, res, next) => {
  const today = new Date();
  const day = today.getDay();
  const hour = today.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.send(
      "The application is only available during working hours (Monday to Friday, from 9 to 17)."
    );
  }
};

app.use(workingHours);

app.get("/home", (rep, res) => {
  res.render("home-page", { title: "Home" });
});
app.get("/services", (req, res) => {
  res.render("service", { title: "Our Services" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
