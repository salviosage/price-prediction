import Joi from '@hapi/joi';
export const ClientValidator = Joi.object({
    contact_persons: Joi.array().items(Joi.object({
        phone_number: Joi.string().required()
            .regex(/^07[823]\d{7}$/),
        email: Joi.string().max(30).required(),
        name: Joi.string().max(30).required(),
        description: Joi.string().max(30),
    })).required(),

    documents: Joi.array().items(Joi.object({
        documentId: Joi.string().max(30),
        url: Joi.string().max(30),
        type: Joi.string().max(30),
        verified: Joi.boolean(),
    })),
    verified: Joi.boolean(),


});
export const UpdateClientValidator = Joi.object({
    contact_persons: Joi.array().items(Joi.object({
        phone_number: Joi.string().required()
            .regex(/^07[823]\d{7}$/),
        email: Joi.string().max(30).required(),
        name: Joi.string().max(30).required(),
        description: Joi.string().max(30),
    })),

    documents: Joi.array().items(Joi.object({
        documentId: Joi.string().max(30),
        url: Joi.string().max(30),
        type: Joi.string().max(30),
        verified: Joi.boolean(),
    })),
    verified: Joi.boolean(),

});