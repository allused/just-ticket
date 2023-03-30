import Joi from 'joi';

const idSchema = Joi.number().required();

const commentSchemaPost = Joi.object({
    userId: idSchema,
    taskId: idSchema,
    description: Joi.string().min(1).max(300).required(),
});

const commentSchemaPatch = Joi.object({
    userId: idSchema,
    commentId: idSchema,
    description: Joi.string().min(1).max(300).required()
});

const commentSchemaGet  = Joi.object({
    userId: idSchema,
    commentId: idSchema
});

const commentSchemaDelete  = Joi.object({
    userId: idSchema,
    commentId: idSchema,
    taskId: idSchema
});

const taskSchemaPost = Joi.object({
    userId: idSchema,
    taskTypeId: idSchema,
    taskPriorityId: idSchema,
    taskStateId: idSchema,
    name: Joi.string().min(1).max(20).required(),
    description: Joi.string().min(1).max(500).required(),
    assigneUsername: Joi.string().alphanum().allow('_','-','.').min(1).max(20)
});

const taskSchemaPatch = Joi.object({
    userId: idSchema,
    taskId: idSchema,
});

const taskSchemaGet = Joi.object({
    userId: idSchema,
    taskId: idSchema
});

const taskSchemaGetAll = Joi.object({
    userId: idSchema
});

const teamSchemaPost = Joi.object({
    userId: idSchema,
    teamName: Joi.string().min(1).max(30).required()
});

const teamSchemaGet = Joi.object({
    userId: idSchema,
    teamName: Joi.string().min(1).max(30).required(),
});

const teamSchemaPatch = Joi.object({
    userId: idSchema,
    teamId: idSchema,
    teamName: Joi.string().min(1).max(30),
    newMembers: Joi.array(),
    newUser: Joi.number()
 
});

const userSchemaPost = Joi.object({
    userId: idSchema,
    permissionId: idSchema,
    userName: Joi.string().alphanum().allow('_','-','.').min(5).max(20).required(),
    password: Joi.string().required(),
    displayName: Joi.string().alphanum().allow('_','-','.',' ').min(5).max(50).required(),

});

const userLoginSchema = Joi.object({
    username: Joi.string().alphanum().allow('_','-','.').min(1).max(20).required(),
    password: Joi.string().alphanum().required()
})

const userSchemaGet = Joi.object({
    userId: idSchema,
    teamId: idSchema
});

const userSchemaPatch = Joi.object({
    userId: idSchema, 
    teamId: idSchema,
    permissionId: idSchema,
    userName: Joi.string().alphanum().allow('_','-','.').min(1).max(20),
    password: Joi.string().uuid(),
    displayName: Joi.string().alphanum().allow('_','-','.',' ').min(1).max(50),

});

export { commentSchemaPost, commentSchemaPatch, commentSchemaGet, commentSchemaDelete, taskSchemaPost, taskSchemaPatch, taskSchemaGet, taskSchemaGetAll, teamSchemaGet, teamSchemaPatch,
         teamSchemaPost, userSchemaPost, userSchemaPatch, userSchemaGet, userLoginSchema, idSchema}