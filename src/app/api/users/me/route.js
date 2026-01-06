import {connectDB} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connectDB()

export async function GET(request){
    const userId=await getDataFromToken(request)
    const user=await User.findOne({_id:userId})
    .select("-password -refreshToken")

    return NextResponse.json({
        message:"User Found",
        data:user
    })
}