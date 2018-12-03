import { Document, SchemaOptions } from 'mongoose'
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export interface BaseModel extends Document {
    createdAt?: Date
    updatedAt?: Date
}

export class BaseDto {
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    createdAt?: Date
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    updatedAt?: Date
    @ApiModelPropertyOptional()
    id?: string
}

export const schemaOptions: SchemaOptions = {
    toJSON: {
        virtuals: true,
        getters: true
    }
}