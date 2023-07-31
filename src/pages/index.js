import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Feed from '@/components/Feed';
import Widgets from '@/components/Widgets';
import { AnimatePresence } from 'framer-motion';
import Modal from '../components/Modal';
import { modalState, modalTypeState } from '../../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { connectToDatabase } from '../../util/mongodb';
import { useEffect, useState } from 'react';

export default function Home({ posts }) {
  // client side authenticated
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push('/home');
    },
  });
  console.log(session);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Get New York Times api
    const fetchNews = async () => {
      const news = await fetch(
        `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NEWS_API_KEY}`
      ).then((res) => res.json());

      console.log(news, 'new');
      setArticles(news?.results ?? []);
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-[#f3f2ef] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      {/* signOut: automatically adds the csrf token to the request */}
      {/* <button onClick={signOut}>Sign out</button> */}
      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Sidebar */}
          <Sidebar />
          {/* Feed */}
          <Feed posts={posts} />
        </div>

        {/* Widgets */}
        <Widgets articles={articles} />
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // check if the user is authenticated on the server
  const session = await getSession(context); // `getSession` for the server side, `useSession` for the client side
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      },
    };
  }

  // Get Posts on SSR
  const { db } = await connectToDatabase();
  const posts = await db
    .collection('post')
    .find()
    .sort({ timestamp: -1 })
    .toArray();

  /**
   * @workaround need to solve `fetch failed` problem
   */
  // Get New York Times api
  // const news = await fetch(
  //   `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NEWS_API_KEY}`
  // ).then((res) => res.json());

  return {
    props: {
      session,
      // articles: news.results,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
    },
  };
}
