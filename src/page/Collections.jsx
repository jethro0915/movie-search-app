import React from "react";
import { useAuth } from "@/hooks/useAuth";
import CollectionCard from "@/components/cards/CollectionCard";
import { Ban, FolderX } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Collections = () => {
  const { currentUser, userCollections } = useAuth();

  console.log(userCollections);

  return (
    <section className="flex flex-col pt-20 mx-auto h-full w-full max-w-[850px]">
      <Helmet>
        <title>Collections</title>
      </Helmet>
      <h1 className="text-3xl font-semibold dark:text-white my-5 px-5 border-l-4 border-red-600 dark:border-red-800">
        Your Collections
      </h1>
      {currentUser ? (
        userCollections.length > 0 ? (
          userCollections.map((item) => (
            <CollectionCard
              userId={item.uid}
              movieData={item.movieData}
              key={item.id}
              docId={item.id}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <FolderX className="w-[150px] h-[150px] stroke-slate-200 dark:stroke-slate-700" />
            <p className="text-slate-200 text-2xl font-semibold dark:text-slate-700">
              No collections
            </p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <Ban className="w-[150px] h-[150px] stroke-slate-200 dark:stroke-slate-700" />
          <p className="text-slate-200 text-2xl font-semibold dark:text-slate-700">
            Required sign in to see this content
          </p>
        </div>
      )}
    </section>
  );
};

export default Collections;
