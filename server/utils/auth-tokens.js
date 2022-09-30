import jwt from "jsonwebtoken"

export const generateToken = (email, id) => {
   const token = jwt.sign({email, id}, process.env.TOKEN_SECRET, {
      expiresIn: '1h'
   })

   return token
}