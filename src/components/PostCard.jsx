import { Link } from "react-router-dom"
import appwriteService from "../appwrite/config"

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-[#eaeff4] rounded-xl p-4">
            <div className="w-full justify-center mb-4">
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className="w-full object-cover mx-auto mb-4 h-[200px] rounded-xl"
                />
            </div>
            <h2
            className="text-xl font-bold"
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard;