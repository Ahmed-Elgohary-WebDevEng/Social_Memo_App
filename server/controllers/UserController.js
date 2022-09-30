import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/auth-tokens.js";

export const signIn = async (req, res) => {
   const { email, password } = req.body

   try {
      // 1- Check if the user is existed
      const existingUser = await User.findOne({ email: email })

      if (!existingUser) {
         return res.status(404).json({ message: "User doesn't exist." })
      }

      // 2- Check is password correct
      const isCorrectPassword = await bcrypt.compare(password, existingUser.password)

      if (!isCorrectPassword) {
         return res.status(400).json({ message: "Invalid Credentials" })
      }

      const token = generateToken(existingUser.email, existingUser._id)

      return res.status(200).json({ result: existingUser, token: token })
   } catch (error) {
      res.status(500).json({ message: "Something went wrong" })
   }
}

export const signUp = async (req, res) => {
   const { email, firstName, lastName, password, confirmPassword } = req.body

   try {
      const existingUser = await User.findOne({ email: email })

      if (existingUser) {
         return res.status(400).json({ message: "User already exist. Please Sign In" })
      }

      if (password !== confirmPassword) {
         return res.status(400).json({ message: "Password doesn't match" })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await User.create({
         email: email,
         name: `${ firstName } ${ lastName }`,
         password: hashedPassword,
      })

      const token = generateToken(newUser.email, newUser._id)

      res.status(200).json({ result: newUser, token: token })
   } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Something went wrong" })
   }
}