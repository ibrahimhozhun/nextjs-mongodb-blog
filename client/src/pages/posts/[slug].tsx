import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from "next/router";
import axios from 'axios';
import Post from '../../components/Post';
import PostSkeleton from '../../components/PostSkeleton';
import Link from 'next/link';

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  try {
    // Get posts from the server at buildtime (not runtime)
    const { data } = await axios.get<{ posts: Post[] }>("/posts");

    return {
      fallback: true,
      paths: data.posts.map(post => ({
        params: { slug: post.slug }
      }))
    }
  } catch (error) {
    console.log(error);

    return {
      fallback: true,
      paths: []
    }
  }
}

export const getStaticProps: GetStaticProps<{ post: Post | null }> = async ({ params }) => {
  try {
    // Get posts from the server at buildtime (not runtime)
    const { data } = await axios.get<{ post: Post }>(`/posts/get/${params?.slug}`);

    return {
      props: {
        post: data.post,
      },
      // This means nextjs will generate one page at most 1 seconds.
      // For detailed explanation watch this video: https://youtu.be/EJVGzyWSCBE?t=2699 (It's a bit long but just watch the parts that about 'getStaticProps')
      revalidate: 1
    }
  } catch (error) {
    console.log(error);

    return {
      props: {
        post: null,
        revalidate: 1
      }
    }
  }

}

const PostPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  // return router.isFallback ? (
  //   <PostSkeleton />
  // ) : (
  //   <div>
  //     {post ? (
  //       <Post post={post} />
  //     ) : (
  //       <div className="flex flex-col lg:flex-row items-center text-center">
  //         <h1 className="text-2xl m-4">Post can not find.</h1>
  //         <Link href="/"><a className="text-lg p-1 lg:p-2 bg-yellow-400 rounded">Go to Home Page</a></Link>
  //       </div>
  //     )
  //     }
  //   </div>
  // );
  return <PostSkeleton />;
}

export default PostPage;
