var usuarioModel = require("../models/usuarioModel");

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarGranjas(req, res) {
    usuarioModel.listarGranjas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;


    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome_granja = req.body.nome_granja;
    var cnpj = req.body.cnpj;
    var cep = req.body.cep;
    var estados = req.body.estados;
    var bairro = req.body.bairro;
    var numero_propiedade = req.body.numero_propiedade;
    var rua = req.body.rua
    var telefone = req.body.telefone;

    cep = cep.replace('-', '')//removendo primeiro traço

    cnpj = cnpj.replace('.', '')//removendo primeiro ponto
    cnpj = cnpj.replace('.', '')//removendo segundo ponto
    cnpj = cnpj.replace('/', '')//removendo barra
    cnpj = cnpj.replace('-', '')//removendo traço

    console.log(`**informações recebidas na função de cadastrar** \nnome da granja: ${nome_granja}
    \nCNPJ: ${nome_granja}
    \nCEP: ${cep}
    \nEstado: ${estados}
    \nBairro: ${bairro}
    \nNumero da propriedade: ${numero_propiedade}
    \nRua: ${rua}
    \nTelefone: ${telefone}`
    );

    if (nome_granja == undefined) {
        res.status(400).send("Seu nome da granja está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    }
    else if (estados == undefined) {
        res.status(400).send("Seu estado está undefined!");
    }
    else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    }
    else if (numero_propiedade == undefined) {
        res.status(400).send("Seu numero da propiedade está undefined!");
    }
    else if (rua == undefined) {
        res.status(400).send("Sua rua está undefined!");
    }
    else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    }
    else {
        usuarioModel.cadastrar(nome_granja, cnpj, cep, estados, bairro, numero_propiedade, rua, telefone)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: 1",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarCliente(req, res) {
    var nome_usuario = req.body.nome_usuario;
    var senha = req.body.senha;
    var email = req.body.email;
    var storage = req.body.storage;

    if (nome_usuario == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (storage == undefined) {
        res.status(400).send("Seu storage está undefined!");
    } else {
        usuarioModel.cadastrarCliente(nome_usuario, email, senha, storage)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function verTemp(req, res) {
    usuarioModel.verTemp()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
        );
}

function verTempArea_A(req, res) {
    usuarioModel.verTempArea_A()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
        );
}

function verTempArea_B(req, res) {
    usuarioModel.verTempArea_B()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
        );
}

function verTempArea_C(req, res) {
    usuarioModel.verTempArea_C()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
        );
}

function contarPorArea(req, res) {
    var idGranja = req.body.idGranja;

    usuarioModel.contarPorArea(idGranja )
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
        );
}

function graficoM(req, res) {
    var idGranja = req.body.idGranja;

    if (idGranja == undefined) {
        res.status(400).send("Seu numero da propiedade está undefined!");
    } else {
        usuarioModel.graficoM(idGranja)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length > 0) {
                        res.status(200).json(resultado);
                    } else {
                        res.status(204).send("Nenhum resultado encontrado!")
                    }
                }).catch(function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
                );
    }
}

function graficoA(req, res) {
    var idGranja = req.body.idGranja;

    if (idGranja == undefined) {
        res.status(400).send("Seu numero da propiedade está undefined!");
    } else {
        usuarioModel.graficoA(idGranja)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length > 0) {
                        res.status(200).json(resultado);
                    } else {
                        res.status(204).send("Nenhum resultado encontrado!")
                    }
                }).catch(function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
                );
    }
}

function verNomeGranja(req, res) {
    var idGranja = req.body.idGranja;

    if (idGranja == undefined) {
        res.status(400).send("Seu numero da propiedade está undefined!");
    } else {
        usuarioModel.verNomeGranja(idGranja)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length > 0) {
                        res.status(200).json(resultado);
                    } else {
                        res.status(204).send("Nenhum resultado encontrado!")
                    }
                }).catch(function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
                );
    }
}

function graficoA2(req, res) {
    var idGranja = req.body.idGranja;
    var ano = req.body.ano;

    if (idGranja == undefined) {
        res.status(400).send("Seu numero da propiedade está undefined!");
    } else {
        usuarioModel.graficoA2(idGranja, ano)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length > 0) {
                        res.status(200).json(resultado);
                    } else {
                        res.status(204).send("Nenhum resultado encontrado!")
                    }
                }).catch(function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
                );
    }
}

function graficoM2(req, res) {
    var idGranja = req.body.idGranja;
    var mes = req.body.mes;

    if (idGranja == undefined) {
        res.status(400).send("idGranja está undefined!");
    } else if (mes == undefined) {
        res.status(400).send("Mes está undefined!");
    } else {
        usuarioModel.graficoM2(idGranja, mes)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length > 0) {
                        res.status(200).json(resultado);
                    } else {
                        res.status(204).send("Nenhum resultado encontrado!")
                    }
                }).catch(function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
                );
    }
}

function listar_anos(req, res) {
    var idGranja = req.body.idGranja;

    if (idGranja == undefined) {
        res.status(400).send("Seu numero da propiedade está undefined!");
    } else {
        usuarioModel.listar_anos(idGranja)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length > 0) {
                        res.status(200).json(resultado);
                    } else {
                        res.status(204).send("Nenhum resultado encontrado!")
                    }
                }).catch(function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
                );
    }
}



module.exports = {
    entrar,
    cadastrar,
    cadastrarCliente,
    listar,
    verTemp,
    listarGranjas,
    graficoM,
    graficoM2,
    graficoA,
    graficoA2,
    listar_anos,
    verTempArea_A,
    verTempArea_B,
    verTempArea_C,
    verNomeGranja,
    contarPorArea,
}