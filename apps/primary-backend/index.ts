import { prismaClient} from "db/client";
import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/project", authMiddleware, async (req, res) => {
  const { prompt} = req.body;
  const userId=req.userId!;
  //add logic to gey the useful prompt from the user
  const description=prompt.split("\n")[0];
  const project = await prismaClient.project.create({
    data: { description, userId},
  });
  console.log(project);
  res.json({projectId:project.id});
});


app.get("/projects",authMiddleware ,async (req, res) => {
  console.log("hululululu");
  //user_2ttmmAcTRi3U6lWyeSWkUd1xhVe
 const userId=req.userId;
 console.log(userId);
  const project = await prismaClient.project.findMany({
    where: {  userId },
  });
  console.log(project, "project");
  res.json({project});
}); 

app.listen(9090, () => {
  console.log("Server is running on port 9090");
});

