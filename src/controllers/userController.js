import { get } from "mongoose";
import bcrypy from "bcrypt";
import User from "../models/User"
export const getJoin = (req, res) => res.render("getJoin");
export const postJoin = async (req, res) => {
    const { name, username, email, password, password2, location } = req.body;
    if(password !== password2) {
        return res.render("getJoin", {
            pageTitle: "Join",
            errMessage: "패스워드가 일치하지 않습니다."
        });

    }
    const exist = await User.exists({ $or: [{username}, {email}] });
    if(exist) {
        return res.render("getJoin", {
            pageTitle: "Join",
            errMessage: "이름이 중복됩니다."
        });
    }
    await User.create({
        name,
        username,
        email,
        password,
        location
    });
    return res.redirect("/");
} 
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const getLogin = (req, res) => res.render("Login");
export const postLogin = async (req, res) => {
    const {username, password } = req.body;
    const user = await User.findOne({username});
    if(!user) {
        return res.status(400).render("Login", {
            pageTitle: "Login",
            errMessage: "존재하지 않는 유저네임 입니다."
        });
    }
    const ok = await bcrypy.compare(password, user.password);
    if(!ok){
        return res.status(400).render("Login", {
            pageTitle: "Login",
            errMessage: "비밀번호가 일치하지 않습니다."
        })
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
