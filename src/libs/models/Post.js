import mongoose, {Schema, models} from "mongoose"

const PostSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    readTime:{
        type: String,
        required: true,
    },
    comments:{
        type: String,
    },
    likes:{
        type: String,
        default: false,
    }
}, {timestamps: true})

const PostModel = models.PostModel || mongoose.model("PostModel" , PostSchema);
export default PostModel;