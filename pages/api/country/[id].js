import { getMongoDb } from "./../../../lib/mongodb";
import * as albumRepository from "./../../../lib/repositories/albums";

export default async function userHandler(req, res) {
  const db = await getMongoDb();
  const { method, body, headers, params, query } = req;
  switch (method) {
    case "GET":
      const countryDetail = await albumRepository.getCountry(
        db,
        context.params.id,
        headers.user
      );
      res.status(200).json(countryDetail);
      break;
    case 'PUT':
      const updatedSticker = await albumRepository.updateSticker(
        db,
        body.user,
        query.id,
        body.sticker,
        body.selected
      );
      res.status(200).json({ message: "Country Updated" })
      break
    // case "POST":
    //   await albumRepository.generateAlbum(db, body.user);
    //   // Update or create data in your database
    //   res.status(200).json({message: "Album generated successfully"});
    //   break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
