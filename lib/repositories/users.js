const collectionName = "users";
import { ObjectId } from "mongodb";

export async function list(db, filters = {}) {
  return db
    .collection(collectionName)
    .find(filters)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getById(db, id) {
  return db.collection(collectionName).findOne({ _id: new ObjectId(id) });
}

export async function findUser(db, username, password) {
  return db.collection(collectionName).findOne({ username, password });
}

export async function listRanking(db) {
  const rankingData = await db
    .collection(collectionName)
    .aggregate([
      {
        $project: {
          _id: 1.0,
          name: 1.0,
        },
      },
      {
        $lookup: {
          from: "albums",
          localField: "_id",
          foreignField: "user",
          as: "album",
        },
      },
    ])
    .toArray();
    console.log('rankingData :>> ', rankingData);
  return rankingData
    .map((user) => {
      const count = user.album.reduce((acc, country) => {
        return (acc += Object.values(country.stickers).filter((d) => d).length);
      }, 0);
      return {
        name: user.name,
        _id: String(user._id),
        count,
      };
    })
    .sort((a, b) => a - b);
}
