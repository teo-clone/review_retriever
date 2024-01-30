import { prisma } from "@/db";
import { twoDaysAgoNow } from "@/util/timeUtils";
import { App, Review } from "@prisma/client";

/**
 * Creates Review db objects for reviews of passed in app. Using app.lastUpdated, we make 
 * sure to only add reviews which were added after app.lastUpdated.
 * 
 * @param app App db object we want to update reviews for
 */
export async function updateReviewsInDb(app: App): Promise<void> {
    const req = `https://itunes.apple.com/us/rss/customerreviews/id=${app.id}/sortBy=mostRecent/page=1/json`;

    const res = await fetch(req);

    if (!res.ok) {
        throw new Error('Failed to fetch reviews');
    }

    const data = await res.json();

    // putting json reviews into proper Review db object format
    const parsedReviews: Review[] = data.feed.entry.map((entry: any) => ({
        id: entry.id.label,
        author: entry.author.name.label,
        title: entry.title.label,
        content: entry.content.label,
        rating: parseInt(entry['im:rating'].label),
        createdAt: new Date(entry.updated.label),
        appId: app.id
    }));

    // determine which reviews we have to add to db, based on app.lastUpdated
    let reviewsToAddToDb: Review[] = app.lastUpdated == null
        ? parsedReviews
        : parsedReviews.filter((review) => review.createdAt > app.lastUpdated);

    // add missing reviews to db
    for (const review of reviewsToAddToDb) {
        await prisma.review.create({
            data: review
        })
    }

    // if any new reviews were added, update the lastUpdated time on the app
    if (reviewsToAddToDb.length > 0) {
        await prisma.app.update({
            where: {
                id: app.id
            },
            data: {
                lastUpdated: new Date()
            }
        })
    }
}

/**
 * Fetches reviews from past 48 hours for passed in app, orders them by newest first.
 * 
 * @param app App db object we want to fetch reviews for
 */
export async function fetchRecentReviews(app: App): Promise<Review[]> {
    const reviews = await prisma.review.findMany({
        where: {
            AND: {
                appId: app.id,
                createdAt: {
                    gte: new Date(twoDaysAgoNow()), // Only pull reviews up to 48 hours ago
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return reviews;
}