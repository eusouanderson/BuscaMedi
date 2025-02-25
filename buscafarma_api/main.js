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

const getFromCacheOrFetch = async (key, fetchFunc) => {
  const cachedData = cache.get(key);
  if (cachedData) {
    console.log("🔹 Dados encontrados no cache!");
    return cachedData;
  }

  const data = await fetchFunc();
  cache.set(key, data);
  return data;
};

app.get("/", (req, res) => {
  res.send("BuscaFarma API");
});


app.get("/products/:qtd", async (req, res) => {
  try {
    const qtd = parseInt(req.params.qtd, 10);

    if (isNaN(qtd) || qtd <= 0) {
      return res.status(400).json({ error: "Quantidade inválida" });
    }

    const products = await getFromCacheOrFetch(qtd, async () => {
      return await Product.find().sort({ createdAt: -1 }).limit(qtd);
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});


// Endpoint para buscar produto por ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getFromCacheOrFetch(id, async () => {
      const foundProduct = await Product.findById(id);
      if (!foundProduct) {
        throw new Error("Produto não encontrado");
      }
      return foundProduct;
    });

    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message || "Erro ao buscar o produto" });
  }
});

// Endpoint para buscar produtos por nome
app.get("/products/search/:name", async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: "O parâmetro 'name' é obrigatório" });
    }

    const products = await getFromCacheOrFetch(name, async () => {
      return await Product.find({
        name: { $regex: new RegExp(name, "i") },
      });
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado" });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos pelo nome" });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

export default app;
