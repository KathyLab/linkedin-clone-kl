import React from 'react';
import Image from 'next/image';
import { Avatar } from '@mui/material';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useSession, signOut } from 'next-auth/react';

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="space-y-2 min-w-max max-w-lg">
      {/* Top */}
      <div
        className="bg-white dark:bg-[#1d2226] rounded-lg overflow-hidden relative flex flex-col items-center
      text-center border border-gray-300 dark:border-none"
      >
        <div className="relative w-full h-14">
          {/* When priority is true, the image will be considered high priority and preload.
             Lazy loading is automatically disabled for images using priority. */}
          <Image
            alt="logo"
            src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg"
            fill
            priority
          />
        </div>
        <Avatar
          onClick={signOut}
          src={session?.user?.image}
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgaHKOyUlYkZ-hyZU0Lin9dlgUjVhNiYQABg&usqp=CAU"
          className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
        />
        <div className="mt-5 py-4 space-y-0.5">
          <h4 className="hover:underline decoration-purple-700 underline-offset-1 cursor-pointer">
            Sia
          </h4>
          <p className="text-black/60 dark:text-white/75 text-sm">
            {/* somthing@gmail.com */}
            {session?.user?.email}
          </p>
        </div>

        <div className="hidden md:inline text-left dark:text-white/75 text-sm">
          <div className="font-medium sidebarButton space-y-0.5">
            <div className="flex justify-between space-x-2">
              <h4>Who viewed your profile</h4>
              <span className="text-blue-500">321</span>
            </div>
            <div className="flex justify-between space-x-2">
              <h4>Views of your post</h4>
              <span className="text-blue-500">1,892</span>
            </div>
          </div>
          <div className="sidebarButton">
            <h4 className="leading-4 text-xs">
              Access exclusive tools & insights
            </h4>
            <h4 className="dark:text-white font-medium">
              <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />{' '}
              Try Premium for free
            </h4>
          </div>
          <div className="sidebarButton flex items-center space-x-1.5">
            <BookmarkOutlinedIcon className="!-ml-1" />
            <h4 className="dark:text-white font-medium">My items</h4>
          </div>
        </div>
      </div>
      {/* Bottom */}
      {/* we can use class for dark mode, so we don't have to write it again */}
      <div
        className="hidden md:flex bg-white dark:bg-[#1d2226] text-black/70 dark:text-white/75 rounded-lg
      overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none"
      >
        <p className="sidebarlink">Groups</p>
        <div className="flex items-center justify-between">
          <p className="sidebarlink">Events</p>
          <AddRoundedIcon className="!h-5"></AddRoundedIcon>
        </div>
        <p className="sidebarlink">Followed Hashtags</p>
        <div className="sidebarButton text-center">
          <h4 className="dark:text-white font-medium text-sm">Discover More</h4>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
