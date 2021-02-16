const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

// @desc     Get All Bootcamps
// @route    GET /api/v1/bootcamps/
// @access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.find();
  res
    .status(200)
    .json({ success: true, count: bootcamp.length, data: bootcamp });
});

// @desc     Get One Bootcamps
// @route    GET /api/v1/bootcamps/
// @access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp id: ${req.params.id} - Not In DB `, 404)
    );
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc     Create a Bootcamp
// @route    POST /api/v1/bootcamps/
// @access   Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc     Update a Bootcamp
// @route    Put /api/v1/bootcamps/:id
// @access   Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp)
    return res
      .status(400)
      .json({ success: false, message: 'failed to update bootcamp' });
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc     Delete a Bootcamp
// @route    Delete /api/v1/bootcamps/:id
// @access   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp)
    return res
      .status(400)
      .json({ success: false, message: 'Failed to Delete' });
  res.status(200).json({ success: true, data: bootcamp });
});
