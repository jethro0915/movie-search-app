import React from "react";
import { useAuth } from "@/hooks/useAuth";
import CollectionCard from "@/components/cards/CollectionCard";

const Collections = () => {
  const { currentUser, userCollections } = useAuth();

  console.log(userCollections);

  return (
    <section className="flex flex-col pt-20 mx-auto h-full">
      <h1 className="text-3xl font-semibold dark:text-white my-5 px-5 border-l-4 border-red-600 dark:border-red-800">
        Your Collections
      </h1>
      {currentUser ? (
        userCollections &&
        userCollections.map((item) => (
          <CollectionCard
            userId={item.uid}
            movieData={item.movieData}
            key={item.id}
            docId={item.id}
          />
        ))
      ) : (
        <div>Collections</div>
      )}
    </section>
  );
};

export default Collections;
