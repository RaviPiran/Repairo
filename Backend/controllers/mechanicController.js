import asynchandler from 'express-async-handler';
import Mechanic from '../models/mechanicModel.js';
import cloudinary from '../utils/Cloudinary.js';

// @desc Create a new mechanic
// route POST /api/mechanic/create shop
// @access Public

const createMechanic = asynchandler(async (req, res) => {
    const {ShopName,Location,ShopAddress,ShopNear,ShopType,PhoneNumber,Email,ShopTime} = req.body;
  
    const publicId = req.file.originalname || `shop_${Date.now()}`;
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `repairo`,
      public_id: publicId,
    });

    const mechanic = await Mechanic.create({
        ShopName,Location,ShopAddress,ShopNear,ShopType,PhoneNumber,Email,
        ShopPhoto:{
          public_id: result.public_id,
          url: result.secure_url,
        } 
        ,ShopTime
 });
  
    if (mechanic) {
      res.status(201).json(mechanic);
    } else {
      res.status(400);
      throw new Error('Invalid  data');
    }
  });


  
  
  // // @desc Get all shops
  // // route GET /api/mechanic/getmechanic
  // // @access Private
  
  const getMechanic = asynchandler(async (req, res) => {
    const mechanic = await Mechanic.find({});
    res.json(mechanic);
  });



  // @desc Get all mechanics with ispost true
// @route GET /api/mechanic/getmechanic
// @access Public (or Private, based on your requirement)
const gettrueMechanic = asynchandler(async (req, res) => {
  const mechanics = await Mechanic.find({ ispost: true });
  res.json(mechanics);
});
  
  // @desc Get a single shop by ID
  // route GET /api/mechanic/ id
  // @access Private
  
  const getMechanicById = asynchandler(async (req, res) => {
    const mechanic = await Mechanic.findById(req.params.id);
  
    if (mechanic) {
      res.json(mechanic);
    } else {
      res.status(404);
      throw new Error('mechanic not found');
    }
  });

  // @desc Update a mechanic by ID
// route Patch /api/design/:id
// @access Private 

const updateMechanicById = async (req, res) => {
  const { ShopName, Location,ShopAddress,ShopNear, ShopType, PhoneNumber, Email, ShopTime, ispost } = req.body;

  try {
    const mechanic = await Mechanic.findById(req.params.id);

    if (mechanic) {
      mechanic.ShopName = ShopName || mechanic.ShopName;
      mechanic.Location = Location || mechanic.Location;
      mechanic.ShopAddress = ShopAddress || mechanic.ShopAddress;
      mechanic.ShopNear = ShopNear || mechanic.ShopNear;
      mechanic.ShopType = ShopType || mechanic.ShopType;
      mechanic.PhoneNumber = PhoneNumber || mechanic.PhoneNumber;
      mechanic.Email = Email || mechanic.Email;
      mechanic.ShopTime = ShopTime || mechanic.ShopTime;
      mechanic.ispost = ispost !== undefined ? ispost : mechanic.ispost; // Update ispost if provided

      const updatedMechanic = await mechanic.save();
      res.json(updatedMechanic);
    } else {
      res.status(404).json({ message: 'Shop not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
  
  
  
  
  // @desc Delete mechanic by ID
  // route DELETE /api/mechanic/:id
  // @access Private 
  
  const deleteMechanicById = asynchandler(async (req, res) => {
   const {id} =req.params;
   
    try  {
      const mechanicdelete= await Mechanic.findOneAndDelete(id)
      res.json({ message: 'mechanic removed',mechanicdelete });
    } catch {
      res.status(404);
      throw new Error('mechanic not found');
    }
  
  
  });
  
  
  
  
  
  
  
  export { createMechanic ,getMechanic,getMechanicById,updateMechanicById,deleteMechanicById,gettrueMechanic,};