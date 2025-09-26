import userModel from "../Models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;  // destructure submitted data from body

        let user = await userModel.findOne({ email }); // get the detail of the user if exist
        if (user) {
            // if user already exists return warning
            console.log("User already exists!!!");
            return res.status(409).json({ message: 'user already exists, login instesd', success: false });
        }
        //else: user doest exists already
        const user_model = new userModel({ name, email, password }); //create a new row for the new user
        user_model.password = await bcrypt.hash(password, 10); //encript the password to ensure security
        await user_model.save(); //save the new row

        console.log("processing for jwt token...");
        const jwtToken = jwt.sign(
            { _id: user_model._id, email },
            process.env.JWT_Secret,
            { expiresIn: "24h" }
        );
        console.log("sending res to user");
        res.status(200).json({
            message: 'Signup successful!',
            success: true,
            jwtToken,
            name,
            email
        });
    } catch (err) {
        return res.status(500).json({ message: 'internal server error', success: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;  // destructure submitted data from body

        const user = await userModel.findOne({ email }); // get the detail of the user if exist
        if (!user) {
            // if user dont exists return warning
            return res.status(403).json({ message: 'login failed! email isnt registerd, signup instead', success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: 'login failed! incorrect password', success: false });
        }
        const jwtToken = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_Secret,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: 'Login successful!',
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        return res.status(500).json({ message: 'internal server error', success: false });
    }
}
export { signup, login }