import mongoose from "mongoose";

const mechanicSchema =  mongoose.Schema({
    ShopName: {
        required: true,
        type: String
    },
    Location: {
        required: true,
        type: String
    },

    ShopAddress: {
        required:true,
        type:String
    },

    ShopNear: {
        required:true,
        type:String
    },

    

    ShopType: {
        required: true,
        type: String,
        
    },

    PhoneNumber: {
        required: true,
        type: String
    },

    Email: {
        required: false,
        type: String,

    },

    ShopPhoto: {
       
     public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    },

    ShopTime: {
        required: true,
        type: String
    },
    
    ispost:{
        type:Boolean,
        default:false  
    },
    
    

},
{
    timestamps: true,
   
})


const Mechanic = mongoose.model('mechanic', mechanicSchema);
export default Mechanic;
