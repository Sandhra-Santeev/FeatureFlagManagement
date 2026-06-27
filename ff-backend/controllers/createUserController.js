const users = require('../models/userModel')
const bcrypt = require('bcrypt')
exports.addUser = async (req, res) => {
    const { username, email, password } = req.body
    const organizationId = req.user.organizationId
    try {
       const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(406).json({ message: "User already exists" })
        }
         const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new users({  
            username,
            email,
            password:hashedPassword,
            role:"user",
            organizationId,
        })
        await newUser.save()
        return res.status(200).json(newUser)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }



}