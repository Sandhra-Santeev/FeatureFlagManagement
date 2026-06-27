const organizations = require("../models/organizationModel")
exports.addOrganizations = async (req, res) => {
    console.log(`Inside add organization`);

    const { name } = req.body
    const existingOrganization = await organizations.findOne({ name })
    try {
        if (existingOrganization) {
            res.status(401).json({ message: "Organization already exists" })
        }
        else {
            const organization = new organizations({ name })
            await organization.save()
            res.status(200).json(organization)
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }

}
exports.getOrganizations = async (req, res) => {

    try {

        const organizationList = await organizations.find();

        res.status(200).json(organizationList);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}