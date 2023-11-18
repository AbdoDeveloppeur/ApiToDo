import jwt from "jsonwebtoken";

// Middleware to verify the JWT token
export function RequireAuth(req, res, next) {
  // ** Use req.headers instead of req.header
  const { authorization } = req.headers;
  // ** Check----authorization--is-- Existe---in--- Header Request
  if (!authorization) {
    return res.status(401).json({ message: "You must be logged in" });
  }
  // ** Add a space after "Bearer" and replace Bearer bu empty
  const token = authorization.replace("Bearer ", "");
  // ** Verify Token and secretkey
  jwt.verify(token, process.env.JWT, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token." });
    }

    // ** destruct Id from payload_Token
    const { userId } = payload;

    // ** Inject user in Request and in next Route
    req.userId = userId; // You can access the user information in the route handlers
    next();
  });
}
