import { prisma } from "@/db";
import { App } from "@prisma/client";

/**
 * Searches for App with appId within db. If not found, creates such an app.
 * 
 * Either way, returns the App.
 * 
 * @param appId app store id of app in question
 * @returns App db object
 */
export async function findOrCreateApp(appId: string) {
    let app: App = await prisma.app.findUnique({
        where: {
            id: appId
        }
    });

    if (!app) {
        app = await prisma.app.create({
            data: {
                id: appId
            }
        });
    }

    return app;
}