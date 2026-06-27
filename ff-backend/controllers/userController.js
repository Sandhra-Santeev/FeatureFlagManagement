const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const organizations = require('../models/organizationModel')
exports.register = async (req, res) => {
    console.log(`Inside Register Controller`)
    const { username, email, password, organizationId } = req.body
    console.log(`${username} ${email} ${password}`)
    try {
        const organization = await organizations.findById(organizationId);

        if (!organization) {
            return res.status(404).json({
                message: "Organization not found"
            });
        }

        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json({ message: "User already exists" })
        } else {
            const existingAdmin = await users.findOne({
            organizationId,
            role: "admin"
        });

        if (existingAdmin) {
            return res.status(409).json({
                message: "An admin already exists for this organization."
            });
        }
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new users({
                username,
                email,
                password: hashedPassword,
                role: "admin",
                organizationId: organizationId
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(401).json({ message: error.message })
    }
    res.end()
}


exports.login = async (req, res) => {
    const { email, password } = req.body
    console.log(`${email} ${password}`)
    try {
        if (email == process.env.SUPER_ADMIN_EMAIL && password == process.env.SUPER_ADMIN_PASSWORD) {
            const token = jwt.sign({ role: "super_admin" }, process.env.SECRET_KEY)
            return res.status(200).json({ token })
        }
        const existingUser = await users.findOne({ email })


        if (!existingUser) {
            return res.status(401).json({
                message: "Incorrect email or password"
            })
        }
        const isMatch = await bcrypt.compare(
            password, existingUser.password
        )
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect email or password"
            })
        }

        const token = jwt.sign({ userId: existingUser._id, role: existingUser.role, organizationId: existingUser.organizationId }, process.env.SECRET_KEY)
        res.status(200).json({ existingUser, token })



    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
