import Joi from '@hapi/joi';
export const EmployeeValidator = Joi.object({
    work_phone_number: Joi.string()
        .regex(/^07[823]\d{7}$/).required(),
    work_email: Joi.string()
        .max(30)
        .required(),
    t_shirt_size: Joi.string()
        .max(20).valid('EXTRA_SMALL', 'SMALL', 'MEDIUM', 'OMEDIUM_LARGE', 'LARGE', 'EXTRA_LARGE'),
    position: Joi.string()
        .max(30)
        .required(),
    start_date: Joi.date().max(100),
    end_date: Joi.date().max(100),
    passport: Joi.string().max(30),
    national_id: Joi.string().max(30),
    documents: Joi.array().items(Joi.object({
        documentId: Joi.string().max(30),
        url: Joi.string().max(30),
        type: Joi.string().max(30),
        verified: Joi.boolean(),
    })),


    verified: Joi.boolean(),

    department:  Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
        'string.pattern.base': `Invalid  department Id`
    }),
    status: Joi.string(),
    address: Joi.array().items(Joi.object({
        type: Joi.string().max(30),
        coordinates: Joi.array().items(Joi.number()),
        locationName: Joi.string().max(30),
    })),

});
export const UpdateEmployeeValidator = Joi.object({
    work_phone_number: Joi.string()
        .regex(/^07[823]\d{7}$/),
    work_email: Joi.string().max(30),
    t_shirt_size: Joi.string().max(20).valid('EXTRA_SMALL', 'SMALL', 'MEDIUM', 'OMEDIUM_LARGE', 'LARGE', 'EXTRA_LARGE'),
    position: Joi.string().max(30),
    start_date: Joi.date().max(100),
    end_date: Joi.date().max(100),
    passport: Joi.string().max(30),
    national_id: Joi.string().max(30),
    documents: Joi.array().items(Joi.object({
        documentId: Joi.string().max(30),
        url: Joi.string().max(30),
        type: Joi.string().max(30),
        verified: Joi.boolean(),
    })),


    verified: Joi.boolean(),

    department: Joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
        'string.pattern.base': `Invalid  department Id`
    }),
    status: Joi.string(),
    address: Joi.array().items(Joi.object({
        type: Joi.string().max(30),
        coordinates: Joi.array().items(Joi.number()),
        locationName: Joi.string().max(30),
    })),
});
