import { getMongoDb } from "./../../../lib/mongodb";
import * as albumRepository from "./../../../lib/repositories/albums";

export default async function userHandler(req, res) {
  const db = await getMongoDb();
  const { method, body } = req;

  switch (method) {
    // case 'GET':
    //   // Get data from your database
    //   res.status(200).json({ id, name: `User ${id}` })
    //   break
    // case 'PUT':
    //   // Update or create data in your database
    //   res.status(200).json({ id, name: name || `User ${id}` })
    //   break
    case "POST":
      await albumRepository.generateAlbum(db, body.user);
      // Update or create data in your database
      res.status(200).json({message: "Album generated successfully"});
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
