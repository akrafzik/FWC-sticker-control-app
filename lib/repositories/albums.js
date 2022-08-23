import { ObjectId } from "mongodb";
const collectionName = "albums";
export async function listMain(db, filters = {}) {
  return db
    .collection(collectionName)
    .find(filters)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function listCountries(db, filters = {}) {
  return db
    .collection(collectionName)
    .find(filters)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getCountry(db, id, user) {
  const countryData = await db
    .collection(collectionName)
    .aggregate([
      {
        $match: {
          user: ObjectId(user),
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      {
        $unwind: {
          path: "$country",
        },
      },
    ])
    .toArray();
  if (countryData.length) {
    const stickers = [];
    for (const key in countryData[0].stickers) {
      stickers.push({
        title: key.replace(/[A-Za-z]/g, ""),
        identifier: countryData[0].country.identifier,
        completed: countryData[0].stickers[key],
      });
    }
    return {
      country: countryData[0].country.title,
      stickers,
      totals: {
        total: stickers.length,
        acquired: stickers.filter(s => s.completed).length,
        remaining: stickers.filter(s => !s.completed).length
      },
      completed: stickers.length == stickers.filter(s => s.completed).length
    };
  }
  return {};
}
