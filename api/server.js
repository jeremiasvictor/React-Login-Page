import express from "express";
import cors from "cors";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const app = express();

// avisar o express que vou usar json
app.use(express.json());
app.use(cors());

// rota do post
app.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  // devolve status 201 e o usuario criado
  // status 201: deu certo e fez o que foi pedido
  res.status(201);
});

// rota do get
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  // devolve status 200 e os usuarios
  res.status(200).json(users);
});

// rota do put
app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  // devolve status 201 e o usuario criado
  // status 201: deu certo e fez o que foi pedido
  res.status(201);
});

app.delete("/users/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Usuário deletado." });
  } catch (error) {
    res.status(404).json({ error: "Usuário não encontrado." });
  }
});

// onde vou rodar a api
app.listen(3000);
