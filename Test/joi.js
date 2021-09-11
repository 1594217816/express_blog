const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().min(5).max(10).required().error(new Error('username没有通过验证'))
});


async function fn() {
    try {
        await schema.validateAsync({});
    } catch (error) {
        console.log(error.message);
        return;
    }
    console.log('验证通过');

}

fn();