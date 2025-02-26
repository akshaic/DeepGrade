import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";
const prisma=new PrismaClient();
export async function POST(req){
    try{
        const {name,password}= await req.json()
        console.log(name)
        const newQ=await prisma.questionpaper.create({
            data:{
                name:name,
                password:password
            }
        })
        return NextResponse.json(newQ.qpid);
    }
    catch(e){
        return NextResponse.json("error"+e);
    }
   
}