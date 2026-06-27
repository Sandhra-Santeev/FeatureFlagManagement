const features = require('../models/featureModel')
exports.addFeature = async (req, res) => {
    const { name, key, description } = req.body
    const userId = req.user.userId
    const organizationId = req.user.organizationId
    try {
        const existingFeature = await features.findOne({
            key, organizationId
        })
        if (existingFeature) {
            return res.status(406).json({
                message: "Feature already exists"
            })
        }
        const feature = new features({
            name,
            key,
            description,
            organizationId,
            createdBy: userId
        })
        await feature.save()
        return res.status(200).json(feature)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }



}

exports.getFeatures = async (req, res) => {
    const organizationId = req.user.organizationId
    try {
        const organizationFeatures = await features.find({ organizationId })
        res.status(200).json(organizationFeatures)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }

}

exports.toggleFeature = async (req, res) => {
    const { id } = req.params
    const organizationId = req.user.organizationId
    try {
        const feature = await features.findById(id)
        if (!feature) {
            return res.status(404).json({
                message: "Feature not found"
            })
        }
        if (feature.organizationId.toString() === organizationId) {
            feature.isEnabled = !feature.isEnabled
            await feature.save()
            return res.status(200).json(feature)
        }

        return res.status(403).json({
            message: "Access Denied"
        })




    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

exports.deleteFeature = async (req, res) => {
    const { id } = req.params
    const organizationId = req.user.organizationId
    try {
        const feature = await features.findById(id)
        if (!feature) {
            return res.status(404).json({
                message: "Feature not found"
            })
        }
        if (feature.organizationId.toString() !== organizationId) {
            return res.status(403).json({
                message: "Access Denied"
            })
        }
        await feature.deleteOne()
        return res.status(200).json(feature)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

exports.updateFeature = async (req, res) => {
    const { id } = req.params
    const organizationId = req.user.organizationId
    const { name, description } = req.body
    try {
        const feature = await features.findById(id)
        if (!feature) {
            return res.status(404).json({
                message: "Feature not found"
            })
        }
        if (feature.organizationId.toString() === organizationId) {
            if (name) {
                feature.name = name
            }

            if (description) {
                feature.description = description
            }
            await feature.save()
            return res.status(200).json({
                message: "Feature update successfully"
            })
        }
        return res.status(403).json({
            message: "Access Denied"
        })



    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

exports.evaluateFeature = async(req,res)=>{
    const {key} = req.params
    const organizationId = req.user.organizationId
    try{
        const feature = await features.findOne({key,organizationId})
        if(!feature){
            return res.status(404).json({
                message:"Feature not found"
            })
        }
        return res.status(200).json({
            key:feature.name,
            enabled:feature.isEnabled
        })

    }catch(error){
      return res.status(500).json({
        message:error.message
      })
    }
}

exports.getFeatureById = async(req,res)=>{

    const {id} = req.params;

    try{

        const feature = await features.findById(id);

        if(!feature){

            return res.status(404).json({
                message:"Feature not found"
            });

        }

        res.status(200).json(feature);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

}