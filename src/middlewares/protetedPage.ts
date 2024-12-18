import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

const protectedPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const school = await prisma.school.findFirst({
    where: { schoolId: req.user.schoolId },
  });

  const schoolName = school ? school.name : null;

  const user = {
    role: req.user.role,
    firstname: req.user.firstname,
    isVerified: req.user.isVerified,
    schoolName,
  };

  res.status(200).json({
    status: "Success",
    data: { user },
  });
};

export default protectedPage;
