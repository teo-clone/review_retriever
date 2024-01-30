import { formatReviewDate } from "@/util/timeUtils";
import { Review } from "@prisma/client";

/**
 * Renders a Review prisma db object
 */
export function ReviewItem(review: Review) {
    return <li className="flex flex-col gap-[5px] border border-black p-2 rounded-">
        <div>{review.rating} / 5</div>
        <div className="font-bold">{review.title}</div>
        <div className="">{review.content}</div>
        <div className="flex gap-[5px]">
            <div className="text-gray-400 text-sm">{review.author},</div>
            <div className="text-gray-400 text-sm">{formatReviewDate(review.createdAt)}</div>
        </div>
    </li>
}