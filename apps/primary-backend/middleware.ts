import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;//Bearer token
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
//this exclamation here means i am telling  typexcript i know what i am doing
  const decoded=jwt.verify(token,process.env.JWT_PUBLIC_KEY! , { algorithms: ["RS256"] });
  if(!decoded){
    res.status(401).json({message:"Unauthorized"})
    return ;
  }

  const userId = (decoded as any).payload.sub;
  if( !userId){
    res.status(401).json({message:"Unauthorized"});
    return ;
  }
  req.userId = userId;
  next();
    
};
