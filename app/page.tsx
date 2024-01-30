import { findOrCreateApp } from "@/api/appApi";
import { fetchRecentReviews, updateReviewsInDb } from "@/api/reviewApi";
import { ReviewItem } from "@/components/ReviewItem";
import { Review } from "@prisma/client";

export default async function Home() {

  const appId = "447188370";

  const app = await findOrCreateApp(appId);

  await updateReviewsInDb(app);

  const reviewData = await fetchRecentReviews(app);

  return (
    <>
      <header>
        <h1 className="text-2xl font-bold">
          Review Retriever
        </h1>
      </header>

      <p>Displaying reviews for app with id: <a href={`https://apps.apple.com/us/app//id${appId}`} target={"_blank"} className="text-blue-400 underline">{appId}</a></p >

      <p><b>{reviewData.length}</b> reviews in the past 48 hours</p>

      <ul className="flex flex-col gap-[10px]">
        {reviewData.map((review: Review) =>
          <ReviewItem key={review.id} {...review} />)}
      </ul>
    </>
  );
}
