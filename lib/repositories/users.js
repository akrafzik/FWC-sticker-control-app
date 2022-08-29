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
