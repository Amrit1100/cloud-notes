import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
    const token = req.query.token;

    try {
        const client = await clientPromise;
        const db = client.db("CloudData");
        const users = db.collection("users");

        // Find the user with the given token
        const user = await users.findOne({ token });

        if (user) {
            // Update the user's verification status and unset the token field
            await users.updateOne(
                { token },
                { $unset: { token: "" }, $set: { isverified: true } }
            );

            // Send an HTML page for successful verification
            res.status(200).send(`
                <html>
                    <head>
                        <title>Account Verified</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            .message { font-size: 24px; color: green; }
                            .redirect { font-size: 18px; color: #333; margin-top: 20px; }
                            a { color: #4CAF50; text-decoration: none; }
                        </style>
                    </head>
                    <body>
                        <div class="message">Your account has been successfully verified!</div>
                        <div class="redirect">Redirecting you to the <a href="/login">login page</a>...</div>
                        <script>
                            setTimeout(() => {
                                window.location.href = "/login";
                            }, 3000); // Redirects after 3 seconds
                        </script>
                    </body>
                </html>
            `);
        } else {
            res.status(400).send(`
                <html>
                    <head><title>Invalid Link</title></head>
                    <body>
                        <h2>Invalid Verification Link</h2>
                        <p>Sorry, this link is invalid or has already been used.</p>
                    </body>
                </html>
            `);
        }
    } catch (error) {
        console.error("Error connecting to the database:", error);
        res.status(500).send("Internal Server Error");
    }
}
