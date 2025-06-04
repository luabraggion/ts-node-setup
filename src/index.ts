import express, { Request, Response, NextFunction } from "express"
import path from "path"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression"
import cookieParser from "cookie-parser"
import { fileURLToPath } from "url"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(morgan("tiny"))
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: false, limit: "50mb" }))
app.use("/api", express.static(path.join(__dirname, "public")))
app.use(cookieParser())

// Manipulado erro 404
app.use(function (req, res, next) {
   res.status(404).json({ message: `Esta rota '${req.url}' não existe` })
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
   res.status(500).send(error.message)
})

// evento é emitido quando uma exceção JavaScript não capturada retorna ao loop de eventos.
process.on("uncaughtException", (error: Error) => {
   console.error("Uncaught Exception: ", error.stack || error.message)
})

// evento é emitido sempre que a Promise é rejeitado e nenhum manipulador de erro é anexado à promessa dentro de um turno do loop de eventos.
process.on("unhandledRejection", (error: Error) => {
   console.error("Unhandled Rejection: ", error.stack || error.message)
})

// evento é emitido quando recebe um sinal
process.on("SIGINT", () => {
   console.error("Serviço foi interrompido devido a um processo forçado.")
})

app.listen(process.env.PORT || 3000, () =>
   console.log(
      `Servidor rodando em http://localhost:${process.env.PORT || 3000}`,
   ),
)
