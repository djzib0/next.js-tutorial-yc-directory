import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
// import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/lib/live";
import { SanityLive } from "@/sanity/lib/live";

export default async function Home({searchParams}: {
  searchParams: Promise<{query?: string}>
}) {

  // ended at 3:04:50

  const query = (await searchParams).query
  const params = {search: query || null}
  // const posts = await client.fetch(STARTUPS_QUERY)
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params})

  // type StartupCardType = {
  //   _createdAt: Date;
  //   _id: number;
  //   views: number;
  //   author: {id: number, name: string};
  //   description: string;
  //   image: string;
  //   category: string;
  //   title: string;
  // }

  // const posts: StartupCardType[] = [
  //   {
  //     _createdAt: new Date(),
  //     _id: 1,
  //     views: 55,
  //     author: {
  //       id: 1,
  //       name: "Adrian",
  //     },
  //     description: "This is a description",
  //     image: "https://images.unsplash.com/photo-1631201884672-b00d9327ee9c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "Robots",
  //     title: "We Robots"

  //   }
  // ]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, 
          <br/>
          Connect With, Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vot on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : `All startups`}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? posts.map((post: StartupTypeCard) => {
            return (
              <StartupCard key={post._id} post={post} />
            )
          }): (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
