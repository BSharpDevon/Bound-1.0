import express from "express";
import pool from "./connection.js";
const router = express.Router();

/**
 * GET /search-members
 * Search members by full_name or email (partial match)
 * Query params: ?query=<nameOrEmail>
 */
router.get("/search-members", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Please provide a search query." });
  }

  const sql = `
    SELECT member_id, full_name, email
    FROM members
    WHERE full_name LIKE ? OR email LIKE ?
    LIMIT 10;
  `;
  const search = `%${query}%`;

  try {
    const [results] = await pool.promise().query(sql, [search, search]);
    res.json(results);
  } catch (err) {
    console.error(":x: search-members SQL error:", err);
    res.status(500).json({ error: "Server error during search." });
  }
});

/**
 * POST /add-friend
 * Add a mutual friendship in friends table
 * Body JSON: { inviterId: <int>, inviteeId: <int> }
 */
router.post("/addFriend", async (req, res) => {
  const { inviterId, inviteeId } = req.body;

  if (!inviterId || !inviteeId) {
    return res.status(400).json({
      success: false,
      message: "Both inviterId and inviteeId are required.",
    });
  }

  if (inviterId === inviteeId) {
    return res
      .status(400)
      .json({ error: "You can't add yourself as a friend." });
  }

  try {
    // Check if friendship already exists
    const checkSql = `
      SELECT * FROM friends
      WHERE (inviter_id = ? AND invitee_id = ?)
         OR (inviter_id = ? AND invitee_id = ?);
    `;
    const [rows] = await pool.promise().query(checkSql, [
      inviterId,
      inviteeId,
      inviteeId,
      inviterId,
    ]);

    if (rows.length) {
      return res.status(409).json({ error: "You are already friends." });
    }

    // Insert both directions for mutual friendship
    const insertSql = `
      INSERT INTO friends (inviter_id, invitee_id)
      VALUES (?, ?), (?, ?);
    `;
    await pool.promise().query(insertSql, [
      inviterId,
      inviteeId,
      inviteeId,
      inviterId,
    ]);

    res.status(201).json({ message: "Friend added successfully." });
  } catch (err) {
    console.error(":x: add-friend SQL error:", err);
    res.status(500).json({ error: "Server error while adding friend." });
  }
});

export default router;
