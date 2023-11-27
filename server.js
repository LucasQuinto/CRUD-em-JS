// Importando bibliotecas

const mysql = require("mysql2");

// Criando conexao com banco de dados local
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "concessionaria",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado no banco de dados");
});

const express = require("express");
const cors = require("cors");

// Criacao do servidor express
const app = express();
const port = 3000;

// Configuracao do express
app.use(express.json());

// Configuracao do cors
app.use(cors());

// Carros
// Listar carros
app.get("/carros", (req, res) => {
  const SQLQuery = "SELECT * FROM carros";

  // Query para pegar os dados
  connection.query(SQLQuery, (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.get("/carros/:id_carro", (req, res) => {
  const carID = parseInt(req.params.id_produto);

  const SQLQuery = "SELECT * FROM carros WHERE id_carro = ?";

  connection.query(SQLQuery, [carID], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Carro não encontrado" });
    } else {
      const carros = results[0];
      res.json(carros);
    }
  });
});

// Adicionar carro
app.post("/carros", (req, res) => {
  const { id_carro, nome, marca, cor, preco } = req.body;

  if (!id_carro || !nome || !marca || !cor || !preco) {
    res.status(400).json({ error: "All the fields are required" });
    return;
  }

  // Inserir carro
  const inserirQuery = "INSERT INTO carros (id_carro, nome, marca, cor, preco) VALUES (?, ?, ?, ?, ?)";
  const values = [id_carro, nome, marca, cor, preco];

  connection.query(inserirQuery, values, (err, insertResults) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.status(201).json({ message: "Data inserted successfully", id: id_carro });
  });
});

// Atualizar carro
app.put("/carros/:id_carro", (req, res) => {
  const carID = parseInt(req.params.id_carro);
  const atualizarCarro = req.body;

  // Verificar se o id já existe
  const IDExiste = "SELECT * FROM carros WHERE id_carro = ?";
  connection.query(IDExiste, [carID], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Carro não encontrado" });
    } else {
      // Query para atualizar
      const AttQuery = "UPDATE carros SET ? WHERE id_carro = ?";
      connection.query(AttQuery, [atualizarCarro, carID], (err, updateResults) => {
          if (err) {
            console.error("Error executing update query:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
          }

          res.json({ ...atualizarCarro, id_carro: carID });
        }
      );
    }
  });
});

// Remover carro
app.delete("/carros/:id_carro", (req, res) => {
  const carID = parseInt(req.params.id_carro);

  // Verifica se o carro existe para deletar
  const IDExiste = "SELECT * FROM carros WHERE id_carro = ?";
  connection.query(IDExiste, [carID], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Carro não encontrado" });
    } else {
      // Query para deletar
      const deletarQuery = "DELETE FROM carros WHERE id_carro = ?";
      connection.query(deletarQuery, [carID], (err, deleteResults) => {
        if (err) {
          console.error("Error executing delete query:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        res.json({ message: "Carro excluído com sucesso" });
      });
    }
  });
});

/*
===========================================================================

===========================================================================
*/

// Funcionarios

// Listar Funcionarios
app.get("/funcs", (req, res) => {
  const SQLQuery = "SELECT * FROM funcionarios";

  // Query para pegar os dados
  connection.query(SQLQuery, (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.get("/funcs/:id_func", (req, res) => {
  const funcId = parseInt(req.params.id_func);

  const SQLQuery = "SELECT * FROM funcionarios WHERE id_func = ?";

  connection.query(SQLQuery, [funcId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Funcionario não encontrado" });
    } else {
      const funcionarios = results[0];
      res.json(funcionarios);
    }
  });
});

// Adicionar funcionario
app.post("/funcs", (req, res) => {
  const { id_func, nome, cpf } = req.body;

  if (!id_func || !nome || !cpf) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  // Inserir funcionario
  const inserirQuery = "INSERT INTO funcionarios (id_func, nome, cpf) VALUES (?, ?, ?)";
  const values = [id_func, nome, cpf];

  connection.query(inserirQuery, values, (err, insertResults) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.status(201).json({ message: "Data inserted successfully", id: id_func });
  });
});

// Atualizar funcionario
app.put("/funcs/:id_func", (req, res) => {
  const funcId = parseInt(req.params.id_func);
  const AttFunc = req.body;

  // Verifica se o id já existe
  const IDExiste = "SELECT * FROM funcionarios WHERE id_func = ?";
  connection.query(IDExiste, [funcId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Funcionario não encontrado" });
    } else {
      // Query para atualizar
      const AttQuery = "UPDATE funcionarios SET ? WHERE id_func = ?";
      connection.query(AttQuery, [AttFunc, funcId], (err, updateResults) => {
          if (err) {
            console.error("Error executing update query:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
          }

          res.json({ ...AttFunc, id_func: funcId });
        }
      );
    }
  });
});

// Remover funcionario
app.delete("/funcs/:id_func", (req, res) => {
  const funcId = parseInt(req.params.id_func);

  // Verifica se o funcionarios existe para deletar
  const IDExiste = "SELECT * FROM funcionarios WHERE id_func = ?";
  connection.query(IDExiste, [funcId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Funcionario não encontrado" });
    } else {
      // Query pra deletar 
      const deletarQuery = "DELETE FROM funcionarios WHERE id_func = ?";
      connection.query(deletarQuery, [funcId], (err, deleteResults) => {
        if (err) {
          console.error("Error executing delete query:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        res.json({ message: "Funcionario excluído com sucesso" });
      });
    }
  });
});

/*
===========================================================================

===========================================================================
*/


// Distribuidoras
// Listar distribuidoras
app.get("/distribuidoras", (req, res) => {
  const SQLQuery = "SELECT * FROM distribuidoras";

  // Query para pegar os dados
  connection.query(SQLQuery, (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.get("/distribuidoras/:id_distb", (req, res) => {
  const distbId = parseInt(req.params.id_distb);

  const SQLQuery = "SELECT * FROM distribuidoras WHERE id_distb = ?";

  connection.query(SQLQuery, [distbId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Distribuidora não encontrado" });
    } else {
      const distribuidoras = results[0];
      res.json(fornecedores);
    }
  });
});

// Adicionar distribuidora
app.post("/distribuidoras", (req, res) => {
  const { id_distb, nome, endereco, cnpj } = req.body;

  if (!id_distb || !nome || !endereco || !cnpj) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  // Inserir distribuidora
  const inserirQuery = "INSERT INTO distribuidoras (id_distb, nome, endereco, cnpj) VALUES (?, ?, ?, ?)";
  const values = [id_distb, nome, endereco, cnpj];

  connection.query(inserirQuery, values, (err, insertResults) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.status(201).json({ message: "Data inserted successfully", id: id_distb });
  });
});

// Atualizar distribuidora
app.put("/distribuidoras/:id_distb", (req, res) => {
  const distbId = parseInt(req.params.id_distb);
  const AttDistb = req.body;

  // Verifica se o id já existe
  const IDExiste = "SELECT * FROM distribuidoras WHERE id_distb = ?";
  connection.query(IDExiste, [distbId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Distribuidora não encontrada" });
    } else {
      // Query para atualizar
      const AttQuery = "UPDATE distribuidoras SET ? WHERE id_distb = ?";
      connection.query(AttQuery, [AttDistb, distbId], (err, updateResults) => {
          if (err) {
            console.error("Error executing update query:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
          }

          res.json({ ...AttDistb, id_distb: distbId });
        }
      );
    }
  });
});

// Remover distribuidora
app.delete("/distribuidoras/:id_distb", (req, res) => {
  const distbId = parseInt(req.params.id_distb);

  // Verifica se a distribuidora existe para deletar
  const IDExiste = "SELECT * FROM distribuidoras WHERE id_distb = ?";
  connection.query(IDExiste, [distbId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Distribuidora não encontrada" });
    } else {
      // Query para deletar 
      const deletarQuery = "DELETE FROM distribuidoras WHERE id_distb = ?";
      connection.query(deletarQuery, [distbId], (err, deleteResults) => {
        if (err) {
          console.error("Error executing delete query:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        res.json({ message: "Distribuidora excluída com sucesso" });
      });
    }
  });
});

/*
===========================================================================

===========================================================================
*/

// Clientes
// Listar clientes
app.get("/clientes", (req, res) => {
  const SQLQuery = "SELECT * FROM clientes";

  // Query para pegar os dados
  connection.query(SQLQuery, (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.get("/clientes/:id_cliente", (req, res) => {
  const clienteId = parseInt(req.params.id_cliente);

  const SQLQuery = "SELECT * FROM clientes WHERE id_cliente = ?";

  connection.query(SQLQuery, [clienteId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Cliente não encontrado" });
    } else {
      const clientes = results[0];
      res.json(clientes);
    }
  });
});

// Adicionar cliente
app.post("/clientes", (req, res) => {
  const { id_cliente, nome, email, endereco } = req.body;

  if (!id_cliente || !nome || !email || !endereco) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  // Inserir cliente
  const inserirQuery = "INSERT INTO clientes (id_cliente, nome, email, endereco) VALUES (?, ?, ?, ?)";
  const values = [id_cliente, nome, email, endereco];

  connection.query(inserirQuery, values, (err, insertResults) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.status(201).json({ message: "Data inserted successfully", id: id_cliente });
  });
});

// Atualizar cliente
app.put("/clientes/:id_cliente", (req, res) => {
  const clienteId = parseInt(req.params.id_cliente);
  const Attcliente = req.body; cpf

  // Verifica se o id já existe
  const IDExiste = "SELECT * FROM clientes WHERE id_cliente = ?";
  connection.query(IDExiste, [clienteId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Cliente não encontrado" });
    } else {
      // Query para atualizar
      const AttQuery = "UPDATE clientes SET ? WHERE id_cliente = ?";
      connection.query(AttQuery, [Attcliente, clienteId], (err, updateResults) => {
          if (err) {
            console.error("Error executing update query:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
          }

          res.json({ ...Attcliente, id_cliente: clienteId });
        }
      );
    }
  });
});

// Remover cliente
app.delete("/clientes/:id_cliente", (req, res) => {
  const clienteId = parseInt(req.params.id_cliente);

  // Verifica se o cliente existe para deletar
  const IDExiste = "SELECT * FROM clientes WHERE id_cliente = ?";
  connection.query(IDExiste, [clienteId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Cliente não encontrado" });
    } else {
      // Query para deletar
      const deletarQuery = "DELETE FROM clientes WHERE id_cliente = ?";
      connection.query(deletarQuery, [clienteId], (err, deleteResults) => {
        if (err) {
          console.error("Error executing delete query:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        res.json({ message: "Cliente excluído com sucesso" });
      });
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});