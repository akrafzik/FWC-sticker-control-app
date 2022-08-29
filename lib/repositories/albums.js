import { ObjectId } from "mongodb";
import * as countriesRepository from "./countries";
const collectionName = "albums";

export async function getById(db, id, user) {
  return db
    .collection(collectionName)
    .findOne({ _id: new ObjectId(id), user: new ObjectId(user) });
}

export async function updateById(db, id, data) {
  return db.collection(collectionName).updateOne(
    {
      _id: ObjectId(id),
    },
    { $set: data }
  );
}

export async function listMain(db, user) {
  const albumData = await db
    .collection(collectionName)
    .aggregate([
      {
        $match: {
          user: ObjectId(user),
        },
      },
      {
        $sort: { completed: 1, createdAt: -1 },
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
  const info = {
    total: 0,
    acquired: 0,
    remaining: 0,
  };
  if (albumData.length) {
    const table = albumData.reduce((acc, countryData) => {
      acc[countryData.country.title] = countryData.stickers;
      const stickers = Object.values(countryData.stickers);
      info.total += stickers.length;
      info.acquired += stickers.filter((d) => d).length;
      info.remaining += stickers.filter((d) => !d).length;
      return acc;
    }, {});
    return {
      table,
      info,
    };
  }
  return { info, table: {} };
}

export async function listCountries(db, user) {
  const countries = await db
    .collection(collectionName)
    .aggregate([
      {
        $match: {
          user: ObjectId(user),
        },
      },
      {
        $sort: { completed: 1, createdAt: -1 },
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
  return countries.map((countryData) => {
    const remaining = Object.values(countryData.stickers).filter(
      (d) => !d
    ).length;
    return {
      _id: String(countryData._id),
      title: countryData.country.title,
      identifier: countryData.country.identifier,
      completed: countryData.completed,
      remaining: remaining,
    };
  });
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
      info: {
        total: stickers.length,
        acquired: stickers.filter((s) => s.completed).length,
        remaining: stickers.filter((s) => !s.completed).length,
      },
      completed: countryData[0].completed,
    };
  }
  return {};
}

export async function generateAlbum(db, user) {
  const countries = await countriesRepository.list(db);
  const formattedAlbum = countries.map((country) => ({
    completed: false,
    createdAt: new Date(),
    country: country._id,
    stickers: country.stickers.reduce((acc, sticker) => {
      acc[sticker] = false;
      return acc;
    }, {}),
    user: ObjectId(user),
  }));
  return db.collection(collectionName).insertMany(formattedAlbum);
}

export async function updateSticker(db, user, country, sticker, selected) {
  const currentAlbum = await getById(db, country, user);
  currentAlbum.stickers[sticker] = selected;
  currentAlbum.completed = Object.values(currentAlbum.stickers).every((v) => v);
  await updateById(db, country, currentAlbum);
  return currentAlbum;
}
