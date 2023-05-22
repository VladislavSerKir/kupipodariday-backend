import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class CreateWishlistDto {
    @IsString()
    name: string;

    @IsUrl()
    image: string;

    // @IsArray()
    // @IsNumber()
    // itemsId: Array<number>

    @ApiProperty({ type: [Number] })
    itemsId: Array<number>;
}
