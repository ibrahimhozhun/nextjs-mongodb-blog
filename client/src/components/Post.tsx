import Interweave from "interweave";
import moment from "moment";
import SEO from "./SEO";

const Post: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <>
      <SEO title={post.title} description="" url={`/${post.slug}`} />
      <h1 className="text-5xl">{post.title}</h1>
      <div className="post-body">
        <Interweave content={post.body} />
        <div className=""></div>
        <p className="date-sm">
          Published on {moment(post.updatedAt).format("MMMM Do YYYY")}
        </p>
      </div>
    </>
  );
};

export default Post;
