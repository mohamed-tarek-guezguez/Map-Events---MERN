const User = require('../models/User')
const Listing = require('../models/Listing')
const asyncHandler = require('express-async-handler')


exports.getAll = asyncHandler(async (req, res) => {
    try {
        const listings = await Listing.find()
        res.send(listings);
    } catch (error) {
        res.send(error);
    }
})

exports.createListing = asyncHandler(async (req, res) => {
    try {
        const listing = await new Listing(req.body).save()

        const user = await User.findById({_id: listing.userId})
        user.listingList.push(listing);
        await user.save();

        res.send(listing);
    } catch (error) {
        res.send(error);
    }
})

exports.updateListing = asyncHandler(async (req, res) => {
    try {
        const listing = await Listing.findOneAndUpdate(
            {_id: req.params.id},
            req.body
        )
        res.send("Updated Successfully")
    } catch (error) {
        res.send(error)
    }
})

exports.deleteListing = asyncHandler(async (req, res) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id)
        res.send("Deleted Successfully")
    } catch (error) {
        res.send(error);
    }
})