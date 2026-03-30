"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";



export const onBoardUser=async()=>{
    try {
        const user=await currentUser();
        if(!user){
            return {success:false,error:"No authenticated user found"}
        }

        const {id,firstName,lastName,imageUrl,emailAddresses}=user

        const newUser=await db.user.upsert({
            where:{
                clerkId:id
            },
            update:{
               firstName:firstName || null,
               lastName:lastName || null,
               imageUrl:imageUrl || null,
               email:emailAddresses[0]?.emailAddress || "",
            },
            create:{
                clerkId:id,
                firstName:firstName || null,
               lastName:lastName || null,
               imageUrl:imageUrl || null,
               email:emailAddresses[0]?.emailAddress || "",
            }
        })

        return {
            success:true,
            user:newUser,
            message:"User onBoarded successfully"
        }

    } catch (error) {
        console.error("error onboarding",error)
        return {
            success:false,
            error:"failed to onboard user"
        }
    }
}

export const currentUserRole=async ()=>{
    try {
        const user=await currentUser()

        if (!user) return undefined


        const {id}=user;
        const userRole=await db.user.findUnique({
            where:{
                clerkId:id
            },
            select:{
                role:true
            }
        })
        return userRole?.role ?? undefined
    } catch (error) {
        console.error("error fetching role", error)
       return undefined
    }
}