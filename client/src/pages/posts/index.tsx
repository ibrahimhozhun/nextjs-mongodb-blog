import { GetStaticProps, InferGetStaticPropsType } from 'next';
import axios from "axios";
import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import SEO from '../../components/SEO';

export const getStaticProps: GetStaticProps<{ posts: Post[] | null }> = async () => {
  try {
    // Get posts from the server at buildtime (not runtime)
    const { data } = await axios.get<{ posts: Post[] }>("/posts");

    return {
      props: {
        posts: data.posts,
      },
      // This means nextjs will generate one page at most 1 seconds.
      // For detailed explanation watch this video: https://youtu.be/EJVGzyWSCBE?t=2699 (It's a bit long but just watch the parts that about 'getStaticProps')
      revalidate: 1
    }
  } catch (error) {
    return {
      props: {
        posts: null,
        revalidate: 1
      }
    }
  }
}

const Posts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO title="Posts" description="" url="/posts" />
      <div className="grid gap-y-4">
        {posts ? (posts.length ? (posts.map(post => (
          <Link key={post._id} href={`/posts/${post.slug}`}>
            <div className="cursor-pointer rounded-md text-gray-900 dark:text-gray-100 bg-gray-100 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-900 transition duration-500 shadow-sm w-full p-4">
              <h3 className="text-2xl">{post.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Published on {moment(post.updatedAt).format("MMMM Do YYYY")}</p>
            </div>
          </Link>
        ))) : (
          <h1 className="text-3xl">We will start publishing posts soon</h1>
        )) : (
          <h1 className="text-3xl">There is an error occurred</h1>
        )
        }
      </div>
    </>
  )
}

export default Posts;
