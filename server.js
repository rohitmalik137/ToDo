import app from "./app";
import config from "./config/index";

const { PORT } = config;

app.listen(5000, () => console.log(`Server started on PORT 5000`));
