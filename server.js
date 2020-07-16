const databaseMongo = require("./mongoose");
const app = require("./app");
const PORT = process.env.PORT || 4000;

async function server() {
  app.listen(PORT, () => {
    console.log("Server ON: ", PORT);
  });

  try {
    let response = await databaseMongo.connect();
    const db = response.connection;
    db.on("error", console.error.bind(console, "Erro de conexão ao DB!!!"));
    db.once("open", () => {
      console.log("database ON");
    });
  } catch (error) {
    console.log(error);
  }
}

server();
