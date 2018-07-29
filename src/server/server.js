import React from "react";
import compress from "compression";
import ReactDOMServer from "react-dom/server";
import exphbs from "express-handlebars";
import express from "express";
import { StaticRouter } from "react-router-dom";
import superagent from "superagent";
import bodyParser from "body-parser";
import App from "../shared/controllers/AppController";
require("dotenv").config();

var app = express();
exphbs.create({});
app.set("port", (process.env.PORT || 5001));

app.use(compress());
app.enable("view cache");
app.set("views", "./src/client/views");
app.engine("hbs", exphbs({
  defaultLayout: "main.hbs",
  layoutsDir: "src/client/views/layouts/"
}));
app.set("view engine", "hbs");
app.use(express.static("public"));

app.set('trust proxy', 1); // trust first proxy

app.use(bodyParser.json({ limit: '50mb' }));

app.post('/api/retrieve/article/:articleId', function (request, response) {
  _doPost(`retrieve/article/${request.params.articleId}`, request, response);
});

app.post('/api/search/articles', function (request, response) {
  _doPost('search/articles', request, response);
});

app.post('/api/retrieve/publication/:publicationId', function (request, response) {
  _doPost(`retrieve/publication/${request.params.publicationId}`, request, response);
});

app.post('/api/search/publications', function (request, response) {
  _doPost('search/publications', request, response);
});

app.all('/api/*', function (req, res) {
  res.sendStatus(404)
});

app.get("*", function (req, res) {
  const context = {};
  const content = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  );
  const templateProps = {
    content: content,
    jsUrl: process.env.NODE_ENV === "prod" ? "" : "//localhost:5000"
  };
  res.render("index", templateProps);
});

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"), process.env.NODE_ENV);
});

function _doPost(name, request, response, key) {
  superagent
    .post(process.env['API_BASE_URL'] + '/api/' + name)
    .set('X-CORS-TOKEN', process.env['API_KEY'])
    .set('Content-Type', 'application/json')
    .send(request.body)
    .end(function (err, res) {
      response.send(err || res[key || 'body'])
    });
}
