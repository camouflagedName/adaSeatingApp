import clientPromise from "./db/mongoDB.js"
import EventModel from "./models/EventModel.js";

const client = await clientPromise;
const model = new EventModel(client);

const updateDatabase = async () => {
    const eventID = "65b461763729a2f35b7c0ab3";
    const currentDate = new Date();
    console.log(`${currentDate}: updating event ${eventID} in database`)
    currentDate.setHours(0, 0, 0, 0);
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const updates = {
        name: `${month}-${day} Test Event`,
        date: currentDate,
    }

    try {
        const isUpdated = await model.updateEvent(eventID, updates)

        if (isUpdated) console.log(`Event ${eventID} updated successfully.`);
        else console.log(`Event  ${eventID} could not be modified.`);

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }

}

export default updateDatabase;