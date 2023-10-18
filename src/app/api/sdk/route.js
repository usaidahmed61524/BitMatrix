import { NextResponse } from "next/server";
import MangoDomainValidator from "mango-domain-validate";

export const GET = async (req, res) => {
    try {
        const validate = new MangoDomainValidator();
        const username = req.nextUrl.searchParams.get('username');
        const id = req.nextUrl.searchParams.get('id');

        const result = await validate.validateUser(username, id);
        const data = result?.data
        if (data) {
            return NextResponse.json({
                data,
            }, {
                status: 200
            });
        } else {
            return NextResponse.json({
                message: "Credentials Not Valid"
            }, {
                status: 200
            });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.json({
            message: "Internal Server Error"
        }, {
            status: 500
        });
    }
}
