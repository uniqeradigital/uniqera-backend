import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
    {
    Name: String,
    email: String,
    phone: String,
    company: String,
    servitype:String,
    },
{timestamps: true}
);
export default mongoose.model("lead" , LeadSchema);