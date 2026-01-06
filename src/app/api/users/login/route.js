import {connectDB} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

connectDB()

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {email,password}=reqBody;
        console.log("email",email)

        const user=await User.findOne({email})

        if(!user){
            return NextResponse.json({
                error:"user does not exist"
            },{status:400})
        }
        
        const validatePassword= await bcrypt.compare(password,user.password)
        
        if(!validatePassword){
            return NextResponse.json({
                error:"Check Your creditenals"
            },{status:400})
        }

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"})


        const response = NextResponse.json({
            message:"Logged Successfully",
            success:true,
            tokenData
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;

    } 
    catch (error) {
        return NextResponse.json(
            {error:error?.message},
            {status:500}
        )    
    }
}