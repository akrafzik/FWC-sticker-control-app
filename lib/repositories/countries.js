const collectionName = "countries";
import { ObjectId } from "mongodb";

export async function list(db, filters = {}) {
  return db
    .collection(collectionName)
    .find(filters)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getById(db, id) {
  return db
    .collection(collectionName)
    .findOne({_id: new ObjectId(id)})
}
