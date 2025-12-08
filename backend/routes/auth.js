const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Family = require('../models/familyschema');
const generateToken = require('../utils/generateToken');
const {
  validateRegister,
  validateSignIn,
  validateFamilyTree,
  validateViewFamilyTree,
  validateGetFamilyList,
} = require('../middleware/validators');

// Register user
router.post('/register', validateRegister, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        error: 'User already registered. Please sign in.',
      });
    }

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registration successful',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Sign in user
router.post('/signin', validateSignIn, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Sign in successful',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Save family tree
router.post('/saveFamilyTree', validateFamilyTree, async (req, res, next) => {
  try {
    const { familyName, email, password, globalNodes, globalEdges } = req.body;

    // Check if family name already exists
    const existingFamily = await Family.findOne({ familyName });
    if (existingFamily) {
      return res.status(409).json({
        success: false,
        error: 'Family name already exists. Please choose a different name.',
      });
    }

    const family = new Family({
      familyName,
      email,
      password,
      globalNodes,
      globalEdges,
    });

    await family.save();

    res.status(201).json({
      success: true,
      message: 'Family tree saved successfully',
      family: {
        id: family._id,
        familyName: family.familyName,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Modify family tree
router.post('/modifyTree', validateFamilyTree, async (req, res, next) => {
  try {
    const { familyName, email, password, globalNodes, globalEdges } = req.body;

    const existingFamily = await Family.findOne({
      familyName,
      email,
      password,
    });

    if (!existingFamily) {
      return res.status(404).json({
        success: false,
        error: 'Family tree not found or credentials do not match',
      });
    }

    // Update the family tree
    existingFamily.globalNodes = globalNodes;
    existingFamily.globalEdges = globalEdges;
    await existingFamily.save();

    res.status(200).json({
      success: true,
      message: 'Family tree updated successfully',
      family: {
        id: existingFamily._id,
        familyName: existingFamily.familyName,
      },
    });
  } catch (error) {
    next(error);
  }
});

// View family tree
router.post('/viewFamilyTree', validateViewFamilyTree, async (req, res, next) => {
  try {
    const { familyName } = req.body;

    const family = await Family.findOne({ familyName });

    if (!family) {
      return res.status(404).json({
        success: false,
        error: 'Family tree not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        familyName: family.familyName,
        email: family.email,
        globalNodes: family.globalNodes,
        globalEdges: family.globalEdges,
        createdAt: family.createdAt,
        updatedAt: family.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get family list
router.post('/getfamilylist', validateGetFamilyList, async (req, res, next) => {
  try {
    const { email } = req.body;

    const userFamilies = await Family.find({ email });
    const allFamilies = await Family.find().select('familyName email createdAt');

    res.status(200).json({
      success: true,
      data: {
        user: userFamilies,
        allFamily: allFamilies,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

