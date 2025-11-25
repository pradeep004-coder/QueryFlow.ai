import userModel from "../Models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'user already exists', success: false });
        }
        const user_model = new userModel({ name, email, password });
        user_model.password = await bcrypt.hash(password, 10);
        await user_model.save();

        const jwtToken = jwt.sign(
            { _id: user_model._id, email },
            process.env.JWT_Secret,
            { expiresIn: "24h" }
        );
        
        res.status(201).json({
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
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'email not registered', success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({ message: 'incorrect password', success: false });
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