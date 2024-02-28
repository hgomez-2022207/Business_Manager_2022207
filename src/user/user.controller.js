import User from '../user/user.model';

export const UserPost = async (req, res) => {
    const { name, email, password } = req.body;
    role = "ADMIN_ROLE";
    const user = new User({ name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user,
    });
}