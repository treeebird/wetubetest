import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import session from "express-session"


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended : true}));
app.use(session({
    secret: "helllo!",
    resave: true,
    saveUninitialized: true

}))
app.use((req, res, next) => {
    req.sessionStore.all((err, sessions) => {
        console.log(sessions);
        next();
        
    })
})
app.get("/add-one",(req, res, next) => {
    return res.send(`${req.session.id}`);
})
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;