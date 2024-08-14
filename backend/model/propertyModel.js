import mongoose from 'mongoose';

    const propertySchema = new mong+oose.Schema({
        propertyType:{
            type:String,
            enum: ['Apartment' , 'House' , 'Villa', 'Indepentent Floor'],
            required:true
        },
        buildingName:{
            type:String,
            required:true
        },
        locality:{
            type:String,
            required:true
        },
        BHK:{
            type:String,
            required:true
        },
        area:{
            type:String,
            required:true
        },
        furnishType:{
            type:String ,
            enum:['Fully Furnished' , 'Semi Furnished' , 'Unfurnished'],
            required:true
        },
        flatFurnishing:Array,
        amentities:Array,
        price:{
            type:Number,
            required:true
        },
        constructionStatus:{
            type:String,
            enum:['Ready To Move' , 'Under Construction']
        }
        
    });
const PropertyDb = mongoose.model('Property', propertySchema);

export default PropertyDb
