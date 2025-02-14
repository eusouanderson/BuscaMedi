import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import NodeCache from "node-cache"; 
import Product from "./models/Product.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const cache = new NodeCache({ stdTTL: 3600 }); 


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro na conexão com o MongoDB:"));
db.once("open", () => console.log("Conectado ao MongoDB Atlas!"));


const checkCache = (req, res, next) => {
  const { name } = req.params;
  const cachedData = cache.get(name);

  if (cachedData) {
    console.log("🔹 Cache encontrado!");
    return res.json(cachedData);
  }

  next();
};


app.get("/", (req, res) => {
  res.send("BuscaFarma API");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});


app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    
    const cachedProduct = cache.get(id);
    if (cachedProduct) {
      console.log("🔹 Produto encontrado no cache!");
      return res.json(cachedProduct);
    }
    
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Produto não encontrado" });

    cache.set(id, product);

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o produto" });
  }
});

app.get("/products/search/:name", checkCache, async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: "O parâmetro 'name' é obrigatório" });
    }

    const products = await Product.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado" });
    }

    cache.set(name, products);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos pelo nome" });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

export default app;