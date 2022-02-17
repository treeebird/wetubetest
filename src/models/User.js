import monggoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new monggoose.Schema({
    email : { type : String, required: true, unique: true},
    username: {type : String, required: true, unique: true},
    password: {type : String, required: true},
    name: {type : String, required: true},
    location: {type: String}
})

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 5);
});

const User = monggoose.model("User", userSchema);
export default User;