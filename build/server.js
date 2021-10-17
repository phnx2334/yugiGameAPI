"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var database_service_1 = require("./services/database.service");
var cards_router_1 = require("./routes/cards.router");
var app = (0, express_1.default)();
var port = 8080; // default port to listen
(0, database_service_1.connectToDatabase)()
    .then(function () {
    app.use("/cards", cards_router_1.cardsRouter);
    app.listen(port, function () {
        console.log("Server started at http://localhost:" + port);
    });
})
    .catch(function (error) {
    console.error("Database connection failed", error);
    process.exit();
});
