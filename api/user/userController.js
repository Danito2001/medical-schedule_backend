const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require('../../middleware/auth');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }

    try {
        const user = await prisma.doctor.findUnique({
            where: { email },
            include: {
                appointment: {
                    include: {
                        patient: true
                    }
                },
            }
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const doctorAvailability = user?.doctorAvailability || []; 

        const { password: userPassword, ...userWithoutPassword } = user || {};

        const userData = { ...userWithoutPassword, doctorAvailability: doctorAvailability };

        const token = generateToken(userWithoutPassword);

        res.status(200).json({ message: "Login successful", user: userData, token });

    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
