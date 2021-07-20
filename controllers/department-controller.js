"use strict";

const Departament = require("../models/department-model");

function createDepartament(req, res) {
    var departament = new Departament();
    var params = req.body;

    if (params.name) {
        departament.name = params.name;
        departament.save((err, departamentSaved) => {
            if (err) {
                return res
                    .status(500)
                    .send({ message: "Error al guardar el departamento" });
            } else if (departamentSaved) {
                return res.send({
                    message: "Departamento creado con exito",
                    departamentSaved,
                });
            } else {
                return res
                    .status(500)
                    .send({ message: "No se pudo guardar el departamento" });
            }
        });
    } else {
        return res.status(400).send({ message: "Ingrese los datos minimos" });
    }
}

function updateDepartament(req, res) {
    let departamentId = req.params.id;
    let update = req.body;

    if (update.name) {
        Departament.findOne({ _id: departamentId }, (err, departamentFinded) => {
            if (err) {
                return res
                    .status(500)
                    .send({ message: "Error al buscar el departamento" });
            } else if (departamentFinded) {
                Departament.findByIdAndUpdate(
                    departamentId,
                    update, { new: true },
                    (err, departamentUpdated) => {
                        if (err) {
                            return res.status(500).send({ message: "Error al intentar" });
                        } else if (departamentUpdated) {
                            return res.send({
                                message: "Departamento actualizado exitosamente",
                                departamentUpdated,
                            });
                        } else {
                            return res.status(500).send({ message: "No se actualizo" });
                        }
                    }
                );
            } else {
                return res.status(203).send({ message: "No se encontro" });
            }
        });
    } else {
        return res.status(400).send({ message: "Ingrese los datos minimos" });
    }
}

function deleteDepartament(req, res) {
    let departamentId = req.params.id;

    Departament.findOne({ _id: departamentId }, (err, departamentFinded) => {
        if (err) {
            return res.status(500).send({ message: "Error al buscar una alerta" });
        } else if (departamentFinded) {
            Departament.findByIdAndRemove(
                departamentId,
                (err, departamentRemoved) => {
                    if (err) {
                        return res
                            .status(500)
                            .send({ message: "Error al intentar eliminar el departamento" });
                    } else if (departamentRemoved) {
                        return res.send({
                            message: "Departamento eliminado correctamente",
                            departamentRemoved,
                        });
                    } else {
                        return res.status(403).send({ message: "No se elimino" });
                    }
                }
            );
        } else {
            return res.status(403).send({ message: "Departamento Inexistente" });
        }
    });
}

function getAllDepartaments(req, res) {
    Departament.find({}).exec((err, departaments) => {
        if (err) {
            return res
                .status(500)
                .send({ message: "Error ol obtener departamentos" });
        } else if (departaments) {
            return res.send({ message: "Departamentos", departaments });
        } else {
            return res.status(403).send({ message: "No hay departamentos" });
        }
    });
}

function getDepartamentByID(req, res) {
    let departamentId = req.params.id;

    Departament.findById({ _id: departamentId }).exec((err, departament) => {
        if (err) {
            return res.status(500).send({ message: "Error al buscar alerta" });
        } else if (departament) {
            return res.send({ message: "Departamento encontrada", departament });
        } else {
            return res.status(403).send({ message: "Departamento inexistente" });
        }
    });
}

module.exports = {
    createDepartament,
    updateDepartament,
    deleteDepartament,
    getAllDepartaments,
    getDepartamentByID,
};