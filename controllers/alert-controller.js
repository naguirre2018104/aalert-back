"use strict";

const Alert = require("../models/alert-model");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

function createAlert(req, res) {
    var alert = new Alert();
    var departamentId = req.params.idD;
    var params = req.body;
    let userId = req.user.sub;

    if (
        (params.name,
            params.lastname,
            params.lastdate,
            params.place,
            userId,
            departamentId)
    ) {
        alert.date = moment().format();
        alert.status = params.status;
        alert.name = params.name;
        alert.lastname = params.lastname;
        alert.age = params.age;
        alert.place = params.place;
        alert.lastdate = params.lastdate;
        alert.sex = params.sex;
        alert.user = userId;
        alert.departament = departamentId;
        alert.description = params.description;
        alert.save((err, alertSaved) => {
            if (err) {
                return res.status(500).send({ message: "Error al guardar alerta" });
            } else if (alertSaved) {
                // Alert.findOneAndUpdate({ _id: alertSaved._id }, { $push: { user: req.user.sub } }, { new: true },
                //     (err, alertUpdateUser) => {
                //         if (err) {
                //             return res
                //                 .status(500)
                //                 .send({ message: "Error al actualizar la alerta" });
                //         } else if (alertUpdateUser) {
                //             Alert.findOneAndUpdate({ _id: alertSaved._id }, { $push: { departament: departamentId } }, { new: true },
                //                 (err, alertUpdateDepartament) => {
                //                     if (err) {
                //                         return res
                //                             .status(500)
                //                             .send({ message: "Error al actualizar la alerta" });
                //                     } else if (alertUpdateDepartament) {
                //                         return res.send({
                //                             message: "Alerta creada con exito",
                //                             alertSaved,
                //                         });
                //                     } else {
                //                         return res
                //                             .status(500)
                //                             .send({ message: "No se pudo guardar la alerta" });
                //                     }
                //                 }
                //             );
                //         } else {
                //             return res
                //                 .status(500)
                //                 .send({ message: "No se pudo guardar la alerta" });
                //         }
                //     }
                // );
                return res.json({
                    ok: true,
                    message: "Alerta creada exitosamente",
                    alertSaved,
                });
            } else {
                return res
                    .status(500)
                    .send({ message: "No se pudo guardar la alerta" });
            }
        });
    } else {
        return res.status(400).send({ message: "Ingrese los datos minimos" });
    }
}

function uploadImage(req, res) {
    var alertId = req.params.id;
    var update = req.body;
    var fileName;

    if (req.files) {
        var filePath = req.files.image.path;
        var fileSplit = filePath.split("\\");
        var fileName = fileSplit[2];

        var extension = fileName.split(".");
        var fileExt = extension[1];
        if (
            fileExt == "png" ||
            fileExt == "jpg" ||
            fileExt == "jpeg" ||
            fileExt == "gif"
        ) {
            Alert.findByIdAndUpdate(
                alertId, { image: fileName }, { new: true },
                (err, alertUpdated) => {
                    if (err) {
                        res.status(500).send({ message: "Error general" });
                    } else if (alertUpdated) {
                        res.send({ alert: alertUpdated, alertImage: alertUpdated.image });
                    } else {
                        res.status(400).send({ message: "No se ha podido actualizar" });
                    }
                }
            );
        } else {
            fs.unlink(filePath, (err) => {
                if (err) {
                    res.status(500).send({
                        message: "Extensión no válida y error al eliminar archivo",
                    });
                } else {
                    res.send({ message: "Extensión no válida" });
                }
            });
        }
    } else {
        res.status(400).send({ message: "No has enviado imagen a subir" });
    }
}

function getImage(req, res) {
    var fileName = req.params.fileName;
    var pathFile = "./uploads/alerts/" + fileName;

    fs.exists(pathFile, (exists) => {
        if (exists) {
            return res.sendFile(path.resolve(pathFile));
        } else {
            res.status(404).send({ message: "Imagen inexistente" });
        }
    });
}

function updateAlert(req, res) {
    let alertId = req.params.id;
    let update = req.body;

    if (
        (update.date, update.name, update.lastname, update.lastdate, update.place)
    ) {
        Alert.findOne({ _id: alertId }, (err, alertFinded) => {
            if (err) {
                return res.status(500).send({ message: "Error al buscar la alerta" });
            } else if (alertFinded) {
                Alert.findByIdAndUpdate(
                    alertId,
                    update, { new: true },
                    (err, alertUpdated) => {
                        if (err) {
                            return res
                                .status(500)
                                .send({ message: "Error al intentar actualizar" });
                        } else if (alertUpdated) {
                            return res.send({
                                message: "Alerta actualizada correctamente",
                                alertUpdated,
                            });
                        } else {
                            return res.status(500).send({ message: "No se actualizo" });
                        }
                    }
                );
            } else {
                Alert.findByIdAndUpdate(
                    alertId,
                    update, { new: true },
                    (err, alertUpdated) => {
                        if (err) {
                            return res
                                .status(500)
                                .send({ message: "Error al intentar actualizar" });
                        } else if (alertUpdated) {
                            return res.send({
                                message: "Alerta actualizada correctamente",
                                alertUpdated,
                            });
                        } else {
                            return res.status(500).send({ message: "No se actualizo" });
                        }
                    }
                );
            }
        });
    } else {
        return res.status(400).send({ message: "Ingrese los parametros minimos" });
    }
}

function deleteAlert(req, res) {
    let alertId = req.params.id;

    Alert.findOne({ _id: alertId }, (err, alertFinded) => {
        if (err) {
            return res.status(500).send({ message: "Error al buscar una alerta" });
        } else if (alertFinded) {
            Alert.findByIdAndRemove(alertId, (err, alertRemoved) => {
                if (err) {
                    return res
                        .status(500)
                        .send({ message: "Error al intentar eliminar la alerta" });
                } else if (alertRemoved) {
                    return res.send({
                        message: "Alerta eliminada correctamente",
                        alertRemoved,
                    });
                } else {
                    return res.status(403).send({ message: "No se elimino" });
                }
            });
        } else {
            return res.status(403).send({ message: "Alerta inexistente" });
        }
    });
}

function getAllAlerts(req, res) {
    Alert.find({status: true}).exec((err, alerts) => {
        if (err) {
            return res.status(500).send({ message: "Error al obtener alertas" });
        } else if (alerts) {
            return res.send({ message: "Alertas", alerts });
        } else {
            return res.status(403).send({ message: "No hay alertas" });
        }
    });
}

function getAlertByID(req, res) {
    let alertId = req.params.id;

    Alert.findById({ _id: alertId }).exec((err, alert) => {
        if (err) {
            return res.status(500).send({ message: "Error al buscar alerta" });
        } else if (alert) {
            return res.send({ message: "Alerta encontrada", alert });
        } else {
            return res.send({ message: "Alerta inexistente" });
        }
    });
}

function getUserAlerts(req,res){
    let userId = req.user.sub;
    console.log(userId);
    Alert.find({user: userId}).exec((err,alerts)=>{
        if(err){
            return res.status(500).send({message: "Error al obtener alertas de usuario"});
        }else if(alerts){
            return res.send({message: "Alertas: ", alerts});
        }else{
            return res.status(404).send({message: "Este usuario no ha creado ninguna alerta"});
        }
    })
}

module.exports = {
    createAlert,
    updateAlert,
    deleteAlert,
    getAllAlerts,
    getAlertByID,
    uploadImage,
    getImage,
    getUserAlerts
};